import { Component } from "react";
import { Container, Row,Col } from "react-bootstrap";
import RecipeReviewCard from "../recipereviewcard/recipereviewcard.component";
import food from "../../assets/recettes/cassolette-de-fruits-de-mer-au-cookeo.png"
class TopRecettes extends Component {
  state = {
    recipes : [
        {
            id:1,
            author:"Efecan",
            title: "Avokado Ezmeli Taco",
            img:food,
            date: "31 Mars 2023",
            briefDesciption:
              "Bu kremsi ve baharatlı avokado sosu, günlük taco'larınızı hazırlamak için harika seçeneklerden biri. ",
            like:193,
            isLiked:false
        },
        {
            id:2,
            author:"Afecan",
            title: "Spaghatti avec une sauce blanche",
            img:food,
            date: "31 Mars 2023",
            briefDesciption:
              "Spaghatti avec une sauce blanche",
            like:125,
            isLiked:true
        },
        {
            id:3,
            author:"Afecan",
            title: "Spaghatti avec une sauce blanche",
            img:food,
            date: "31 Mars 2023",
            briefDesciption:
              "Spaghatti avec une sauce blanche",
            like:130,
            isLiked:false
        },
    ],
    
};
  handleAddFavorite =(id) =>{
    console.log(id)
    const obj = this.state.recipes.find(recipe => recipe.id === id);
    obj.isLiked = !obj.isLiked
    this.setState({recipes:this.state.recipes})
  }
  render() {
    const recipes = this.state.recipes;
    return (
      <Container>
        <Row className="gy-2" xs={1} md={2} lg={3} >
          {recipes.map((recipe) => (
            <Col key={recipe.id} className="d-flex justify-content-center"><RecipeReviewCard  key={recipe.id} id={recipe.id} author={recipe.author}
            title={recipe.title}
            img={recipe.img}
            date={recipe.date}
            briefDesciption={recipe.briefDesciption}
            likeCount={recipe.like}
            isLiked={recipe.isLiked} handleAdd={this.handleAddFavorite} /></Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default TopRecettes;
