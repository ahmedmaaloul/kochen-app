import React from 'react'
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Gateau from "../../assets/recettes/gateau-au-chocolat_pg.jpg";
import { Link } from "react-router-dom";
export default function RecipeCard({data}) {

  return (
    <div> <Link to={`/recipe/${data._id}`} className="card-link">
    <Card sx={{ minHeight: "20rem", width: "24rem" }}>
      <CardCover>
        <img src={`http://localhost:5000/${data.image.replaceAll("\\","/")}`} loading="lazy" alt="" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
        {data.title}
        </Typography>
        <Typography variant="body2" textColor="neutral.300">
          {data.body}
        </Typography>
      </CardContent>
    </Card>
  </Link></div>
  )
}
