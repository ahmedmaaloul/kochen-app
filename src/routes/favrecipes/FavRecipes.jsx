import React, { useEffect, useState,useContext } from "react";
import RecipeCard from "../../components/recipecard/RecipeCard";
import { Pagination } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

export default function FavRecipes() {
  const { user } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/recipes/fav?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);
  return (
    <div className="container flex-grow-1 recipe-list d-flex flex-column justify-content-between">
      <div className="container mb-1">
        <h1 className="text-center">Vos Recettes Préférées</h1>
      </div>
      {recipes.length > 0 ? (
        <div className="row row-cols-3">
          {recipes.map((recipe) => (
            <div className="col mb-2">
              <RecipeCard data={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="container mb-1 d-flex justify-content-center">
          <h5>{currentPage == 1 ? "Liste vide," : ""} Partagez votre Dbara </h5>
        </div>
      )}

      <div className="container mb-1 d-flex justify-content-center">
        <Pagination
          count={10}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          variant="outlined"
          color="secondary"
          shape="rounded"
        />
      </div>
    </div>
  );
}
