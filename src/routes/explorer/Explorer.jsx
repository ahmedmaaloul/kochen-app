import React, { useEffect, useState } from "react";
import "./Explorer.scss";
import RecipeCard from "../../components/recipecard/RecipeCard";
import { Pagination } from "@mui/material";
import axios from "axios";

export default function Explorer() {
    const [recipes, setRecipes] = useState([]);
    const [searchTitle,setSearchTitle]=useState("")
    const [currentPage,setCurrentPage] = useState(1)
    console.log(window.location.pathname.split("/")[1])
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/recipes/${searchTitle}?page=${currentPage}`).then((res)=>{
            setRecipes(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[currentPage,searchTitle])
    const handleChange =(e)=>{
      setSearchTitle(e.target.value)
    }
  return (
    <div className="container flex-grow-1 recipe-list d-flex flex-column justify-content-between">
      <div className="container mb-1 px-5 d-flex flex-column">
      <h1 className="text-center">Discover Dbaras</h1>
      <div className="d-flex justify-content-center px-5">
      <input type="text" placeholder="Cherche une recette "className="form-control" onChange={handleChange} />
      </div>
        
        </div>
        {recipes.length > 0 ? <div className="row row-cols-3">
        {recipes.map(recipe=><div className="col mb-2">
          <RecipeCard key={recipe._id} data={recipe} />
        </div>)}</div> : <div className="container mb-1 d-flex justify-content-center">
            <h5>{currentPage == 1 ? "Liste vide," : ""} Partagez votre Dbara {currentPage == 1 ? "en premier," : ""}</h5>
        </div>}
      <div className="container mb-1 d-flex justify-content-center">
      <Pagination count={10} page={currentPage} onChange={(_,page)=>setCurrentPage(page)} variant="outlined" color="secondary" shape="rounded" />
        </div>
    </div>
  );
}
