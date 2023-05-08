import {Routes,Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Signup from './routes/signup/signup.component';
import Unknown from './routes/unknownlink/unknown.component';
import { useState } from 'react';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute.component';
import Landing from './routes/landing/landing.component';
import AppProvider from './providers/AppProvider';
import Explorer from './routes/explorer/Explorer';
import Recette from './routes/recette/recette.component';
import MyRecipes from './routes/myrecipes/myrecipes';
import AddRecipe from './routes/addrecipe/AddRecipe';
import EditRecipe from './routes/editrecipe/editrecipe';
import FavRecipes from './routes/favrecipes/FavRecipes';
import MyProfile from './routes/myprofile/MyProfile';
function App() {
  return (
    <div className="App">
      <AppProvider>
     <Routes>
      <Route path='/' element={<Navigation/>}>
          <Route index element={<Landing/>}/>
          <Route path='/explorer' element={<Explorer/>}/>
          <Route path='/me' element={<MyProfile/>}/>
          <Route path='/recipes/me' element={<MyRecipes/>}/>
          <Route path='/recipes/fav' element={<FavRecipes/>}/>
          <Route path='/recipe/*' element={<Recette/>}/>
          <Route path='/recipes/edit/*' element={<EditRecipe/>}/>
          <Route path='/recipes/add' element={<AddRecipe/>}/>
      </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='*' element={<Unknown/>} />
     </Routes>
     </AppProvider>
    </div>
  );
}

export default App;
