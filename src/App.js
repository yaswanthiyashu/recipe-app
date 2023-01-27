
import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import RecipeCard from './Components/RecipeCard';


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

// function to search for the recipes

const seacrhRecipes = async () => {
  setIsLoading(true);
  const url = apiUrl + query;
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  setRecipes(data.meals);
  setIsLoading(false);
};

useEffect(() => {
  seacrhRecipes()
}, []);
 

const handleSubmit = event => {
  event.preventDefault()
  seacrhRecipes();
};

  return (
    <div className="container">
        <h2>Our Recipe App</h2>
        <SearchBar 
        handleSubmit={handleSubmit} 
        onChange={event => setQuery(event.target.value)} 
        value = {query}
        isLoading={isLoading}
        />

        <div className='recipes'>
          {recipes ? recipes.map((recipe) => (
            <RecipeCard key ={recipe.idMeal} recipe={recipe} />
          ))
          : "No Recipes!"}

        </div>
    </div>
  );
}

export default App;
