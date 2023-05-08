import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

export default function EditRecipe() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [loading,setLoading] = useState(true)
  const [recipeBody, setRecipeBody] = useState("");
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [errorImg, setErrorImg] = useState(null);
  const [recipeInfo,setRecipeInfo]= useState(null)
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unity: "" },
  ]);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [ingrediensErrors, setIngredientsErrors] = useState([
    { name: "", quantity: "", unity: "" },
  ]);
  const [stepsErrors, setStepsErrors] = useState([{ error: "" }]);
  const [steps, setSteps] = useState([{ no: 1, body: "" }]);
  useEffect(()=>{
    axios
      .get(
        `http://localhost:5000/api/v1/recipes/details/${
          window.location.pathname.split("/")[3]
        }`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      ).then(res=>{
        let data=res.data;
        setRecipeInfo(data)
        setRecipeTitle(data.title);
        setRecipeBody(data.body);
        let ingredients=data.ingredients.split("/")
        ingredients=ingredients.map(ingredient=>{
            const ingArray = ingredient.split("-");
            const obj ={
                name:ingArray[0],
                quantity:ingArray[1],
                unity:ingArray[2]
            }
            return obj
        })
        const ingredientsErrors=ingredients.map(ing =>{
            return {name:'',quantity:'',unity:''}})
        setIngredients(ingredients)
        setIngredientsErrors(ingredientsErrors)
        let steps = data.steps.split("/")
        steps = steps.map(step=>{
            const stepArray = step.split("-");
            const obj = {
                no:parseInt(stepArray[0]),
                body:stepArray[1]
            }
            return obj
        })
        const stepsErrors = steps.map(st=>{
            return {error:""}
        })
        setSteps(steps);
        setStepsErrors(stepsErrors)
        console.log(ingredients)
        console.log(ingrediensErrors)
        console.log(steps)
        setImgData(`http://localhost:5000/${data.image}`)
        setLoading(false)
      }).catch(err=>console.log(err))
  },[loading])
  const handleRecipeTitleChange = (event) => {
    setRecipeTitle(event.target.value);
  };
  const handleRecipeBodyChange = (event) => {
    setRecipeBody(event.target.value);
  };
  // handling ingredients
  const handleIngredientNameChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = event.target.value;
    setIngredients(newIngredients);
  };
  const handleIngredientQuantityChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };
  const handleIngredientUnityChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unity = event.target.value;
    setIngredients(newIngredients);
  };
  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove)
    );
    setIngredientsErrors((prevIngredientsErrors) =>
      prevIngredientsErrors.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unity: "" }]);
    setIngredientsErrors([
      ...ingrediensErrors,
      { name: "", quantity: "", unity: "" },
    ]);
  };

  //handling steps
  const handleStepBodyChange = (event, index) => {
    const newSteps = [...steps];
    newSteps[index].body = event.target.value;
    setSteps(newSteps);
  };
  const handleAddStep = () => {
    setSteps([...steps, { no: steps[steps.length - 1].no + 1, body: "" }]);
    setStepsErrors([...stepsErrors, { error: "" }]);
  };
  const handleRemoveStep = (indexToRemove) => {
    setSteps((prevSteps) =>
      prevSteps.filter((_, index) => index !== indexToRemove)
    );
    setStepsErrors((prevStepsErrors) =>
      prevStepsErrors.filter((_, index) => index !== indexToRemove)
    );
  };
  const onChangePicture = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.includes("image/")) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPicture(null);
      setImgData(`http://localhost:5000/${recipeInfo.image}`);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    if (recipeTitle === "") {
      setFeedbackTitle("Vous devez ajouter un titre");
      isValid = false;
    } else {
      setFeedbackTitle("");
    }
    if (recipeBody === "") {
      setFeedbackBody("Vous devez ajouter un titre");
      isValid = false;
    } else {
      setFeedbackBody("");
    }
    const regex = /^(?!0\d)\d*(\.\d+)?$/;
    for (let index = 0; index < ingredients.length; index++) {
      let valide = true;
      if (ingredients[index].name === "") {
        ingrediensErrors[index].name = "Vous devez inserer un nom";
        valide = false;
      } else {
        console.log(ingredients[index]);
        if (ingredients[index].name.includes("/") || ingredients[index].name.includes("-")) {
          ingrediensErrors[index].name = "le nom ne doit pas contenir /";
          valide = false;
        } else ingrediensErrors[index].name = "";
      }
      if (ingredients[index].quantity === "") {
        ingrediensErrors[index].quantity = "Vous devez inserer une quantite";
        valide = false;
      } else {
        if (!regex.test(ingredients[index].quantity)) {
          ingrediensErrors[index].quantity =
            "la quantite doit etre un nombre decimal";
          valide = false;
        } else ingrediensErrors[index].quantity = "";
      }
      if (ingredients[index].unity === "") {
        ingrediensErrors[index].unity = "Vous devez inserer une unite";
        valide = false;
      } else {
        if (ingredients[index].unity.includes("/") || ingredients[index].unity.includes("-")) {
          ingrediensErrors[index].unity = "l'unite ne doit pas contenir";
          valide = false;
        } else ingrediensErrors[index].unity = "";
      }
      setIngredientsErrors(ingrediensErrors.slice());
      if (valide == false) isValid = false;
    }
    for (let index = 0; index < steps.length; index++) {
      let valide = true;
      if (steps[index].body === "") {
        stepsErrors[index].error = "Vous devez inserer la description";
        valide = false;
      } else {
        stepsErrors[index].error = "";
      }
      setStepsErrors(stepsErrors.slice());
      if (valide == false) isValid = false;
    }
    console.log(stepsErrors);
    if (isValid) {
      const recetteContent = {
        title: recipeTitle,
        body: recipeBody,
        ingredients: ingredients
          .map(
            (ingredient) =>
              `${ingredient.name}-${ingredient.quantity}-${ingredient.unity}`
          )
          .join("/"),
        steps: steps.map((step) => `${step.no}-${step.body}`).join("/"),
      };
      const formData = new FormData()
      formData.append('title',recetteContent.title)
      if(picture)
        formData.append('image',picture)
      formData.append('body',recetteContent.body)
      formData.append('ingredients',recetteContent.ingredients)
      formData.append('steps',recetteContent.steps)
      const config={
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        }
      }
      axios
        .put(`http://localhost:5000/api/v1/recipes/update/${recipeInfo._id}`, formData, config)
        .then((res) => {
          console.log(res);
          navigate("/recipes/me");
        })
        .catch((err) => console.log(err));
      console.log(recetteContent);
    }
  };
  if(loading){
    return <div>Loading ...</div>
  }
  return (
    <div className="container">
      <div className="row pt-2 mb-3">
        <h2>Modifier la recette</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-group row mb-3">
        <div className="col-6 row">
          <div className="col-12 mb-3">
            <input
              type="text"
              className={
                feedbackTitle ? "form-control is-invalid" : "form-control"
              }
              placeholder="Titre de la recette"
              value={recipeTitle}
              onChange={handleRecipeTitleChange}
            />
            <div className="invalid-feedback ps-2">{feedbackTitle}</div>
          </div>
          <div className="col-12">
            <textarea
              className={
                feedbackBody ? "form-control is-invalid" : "form-control"
              }
              placeholder="Veuillez donner une description concise de votre recette."
              value={recipeBody}
              onChange={handleRecipeBodyChange}
            />
            <div className="invalid-feedback ps-2">{feedbackBody}</div>
          </div>
          <div className="col-12">
            <label className="form-label">Ingredients</label>
          </div>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="col-12 mb-3 gap-2 d-flex justify-content-between"
            >
              <div className="d-flex flex-column">
                <input
                  type="text"
                  className={
                    ingrediensErrors[index].name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Nom de l'ingredient"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientNameChange(event, index)}
                />
                <div className="invalid-feedback ps-2">
                  {ingrediensErrors[index].name}
                </div>
              </div>
              <div className="d-flex flex-column">
                <input
                  type="text"
                  className={
                    ingrediensErrors[index].quantity
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Quantite"
                  value={ingredient.quantity}
                  onChange={(event) =>
                    handleIngredientQuantityChange(event, index)
                  }
                />
                <div className="invalid-feedback ps-2">
                  {ingrediensErrors[index].quantity}
                </div>
              </div>
              <div className="d-flex flex-column">
                <input
                  type="text"
                  className={
                    ingrediensErrors[index].unity
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Unite"
                  value={ingredient.unity}
                  onChange={(event) =>
                    handleIngredientUnityChange(event, index)
                  }
                />
                <div className="invalid-feedback ps-2">
                  {ingrediensErrors[index].unity}
                </div>
              </div>

              {index > 0 ? (
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="col-12 mb-3 d-flex">
            {" "}
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddIngredient}
            >
              Ajouter un ingredient
            </button>
          </div>
          <div className="col-12">
            <label className="form-label">Etapes</label>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="col-12 row mb-3">
              <div className="col-2 d-flex flex-column">
                <input
                  type="text"
                  className="form-control text-center"
                  value={step.no}
                  readOnly
                />
              </div>
              <div className="col-8 d-flex flex-column">
                <input
                  type="text"
                  className={
                    stepsErrors[index].error
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Description"
                  value={step.body}
                  onChange={(event) => handleStepBodyChange(event, index)}
                />
                <div className="invalid-feedback ps-2">
                  {stepsErrors[index].error}
                </div>
              </div>
              <div className="col-2 d-flex flex-column">
                {index > 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveStep(index)}
                  >
                    Retirer
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          <div className="col-12 mb-3 d-flex">
            {" "}
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddStep}
            >
              Ajouter une etape
            </button>
          </div>
          <div className="col-12 d-flex flex-column">
            <button type="submit" className="btn btn-primary">
              Enregister les modifications
            </button>
          </div>
        </div>
        <div className="col-6 d-flex flex-column">
          <div className="col-12 mb-2">
            <label htmlFor="image">Image de la recette</label>
            <input
              id="image"
              className={errorImg ? "form-control is-invalid" : "form-control"}
              type="file"
              onChange={onChangePicture}
            />
            <div className="invalid-feedback ps-2">{errorImg}</div>
          </div>
            <div className="col-12 image-preview">
              <img src={imgData} className="img-thumbnail" alt="..." />
            </div>
        </div>
      </form>
    </div>
  );
}
