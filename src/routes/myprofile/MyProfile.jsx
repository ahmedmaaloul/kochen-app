import React,{useContext,useEffect,useState} from 'react'
import AppContext from "../../context/AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profileImage from "../../assets/welcome/profile-page.jpg"
import "./MyProfile.scss"
export default function MyProfile() {
    const {user,updateUser} = useContext(AppContext)
    const [userProfile,setUserProfile] = useState(null)
    const [loading,setLoading] = useState(true)
    const [firstName,setFirstName] = useState("")
    const [rOfirstName,setROFirstName] = useState(true)
    const [validFirstName,setValidFirstName] = useState(true) 
    const [lastName,setLastName] = useState("")
    const [rOlastName,setROLastName] = useState(true)
    const [validLastName,setValidLastName] = useState(true) 
    const [birthday,setBirthday] = useState("")
    const [rOBirthday,setROBirthday] = useState(true)
    const [validBirthday,setValidBirthday] = useState(true) 
    const [email,setEmail] = useState("")
    const [rOEmail,setROEmail] = useState(true)
    const [validEmail,setValidEmail] = useState(true)
    const [password,setPassword] = useState("")
    const [rOPassword,setROPassword] = useState(true)
    const [validPassword,setValidPassword] = useState(true) 
    useEffect(()=>{
        console.log(user)
        axios.get("http://localhost:5000/api/v1/users/profile", {
            headers: { Authorization: `Bearer ${user.token}` },
          }).then(res=>{
            const data = res.data;
            console.log(data)
            setFirstName(data.firstName)
            setLastName(data.lastName)
            console.log(data.birthdate)
            const dateObject = new Date(data.birthdate);
            console.log(dateObject)
            const formattedDate = dateObject.toISOString().substr(0, 10);
            setBirthday(formattedDate)
            setUserProfile({...data,birthdate:formattedDate})
            setEmail(user.email);
            setROFirstName(true);
            setValidFirstName(true)
            setROLastName(true);
            setValidLastName(true)
            setROBirthday(true);
            setValidBirthday(true)
            setROEmail(true);
            setValidEmail(true)
            setROPassword(true);
            setValidPassword(true)
            setLoading(false);
          })
    },[loading])
    const handleUndoFirstName = () =>{
        setROFirstName(true);
        setValidFirstName(true)
        setFirstName(userProfile.firstName)
    }
    const handleUndoLastName = () =>{
        setROLastName(true);
        setValidLastName(true)
        setLastName(userProfile.lastName)
    }
    const handleUndoBirthday = () =>{
        setROBirthday(true);
        setValidBirthday(true)
        setBirthday(userProfile.birthdate)
    }
    const handleUndoEmail = () =>{
        setROEmail(true);
        setValidEmail(true)
        setEmail(userProfile.email)
    }
    const handleUndoPassword = () =>{
        setROPassword(true);
        setValidPassword(true)
        setPassword("")
    }
    const handleEditFirstName = () =>{
        setROFirstName(false);
    }
    const handleEditLastName = () =>{
        setROLastName(false);
    }
    const handleEditBirthday = () =>{
        setROBirthday(false)
    }
    const handleEditEmail = () =>{
        setROEmail(false)
    }
    const handleEditPassword = () =>{
        setROPassword(false);
    }
    const handleSaveFirstName = () =>{
        if(firstName === ""){
            setValidFirstName(false)
        }
        else{
            axios.put("http://localhost:5000/api/v1/users/profile",{firstName},{
                headers: { Authorization: `Bearer ${user.token}` },
              }).then(res=>{
                setLoading(true)
              }).catch(err=>console.log(err))
        }
    }
    const handleSaveLastName = () =>{
        if(lastName === ""){
            setValidLastName(false)
        }
        else{
            axios.put("http://localhost:5000/api/v1/users/profile",{lastName},{
                headers: { Authorization: `Bearer ${user.token}` },
              }).then(res=>{
                setLoading(true)
              }).catch(err=>console.log(err))
        }
    }
    const handleSaveBrithday = () =>{
        let valide = true
        const dateParts = birthday.split("-");
        const d = new Date(dateParts[0], dateParts[1], dateParts[2]);
        const now = new Date();
        const dateBefore13Years = new Date(
            now.getFullYear() - 13,
            now.getMonth(),
            now.getDate()
        );
        if (d > dateBefore13Years || birthday === "") {
            setValidBirthday(false)
            if (valide) valide = false;
            } else setValidBirthday(true)
        if(valide){
            axios.put("http://localhost:5000/api/v1/users/profile",{birthdate:birthday},{
                headers: { Authorization: `Bearer ${user.token}` },
              }).then(res=>{
                setLoading(true)
              }).catch(err=>console.log(err))
        }
    }
    const handleSaveEmail = () =>{
        let valide=true;
        const regexEmail = new RegExp(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          );
          const emailIsMatch = regexEmail.test(email);
          if (emailIsMatch) setValidEmail(true);
          else {
            setValidEmail(false);
            if (valide) valide = false;
          }
        if(valide){
            if(email == userProfile.email)
                return;
            axios.put("http://localhost:5000/api/v1/users/profile",{email},{
                headers: { Authorization: `Bearer ${user.token}` },
              }).then(res=>{
                setLoading(true)
                user.email = email
                updateUser(user)
              }).catch(err=>{
                alert(err.response.data.message)
              })
        }
    }
    const handleSavePassword = () =>{
        let valide=true
        const regexPassword = new RegExp(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
          );
          const passwordIsMatch = regexPassword.test(password);
          if (passwordIsMatch) setValidPassword(true);
          else {
            setValidPassword(false);
            if (valide) valide = false;
          }
        if(valide){
            axios.put("http://localhost:5000/api/v1/users/profile",{password},{
                headers: { Authorization: `Bearer ${user.token}` },
              }).then(res=>{
                    setLoading(true)
              }).catch(err=>console.log(err))
        }
    }
    const handleChange =(e)=>{
        if(e.target.name === "firstName"){
            setFirstName(e.target.value)
        }
        else if(e.target.name === "lastName"){
            setLastName(e.target.value)
        }else if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "birthday"){
            setBirthday(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    }
  if(loading){
    return <div>Loading ...</div>
  }
  return (
    <div className="container">
        <div className="row pt-2">
            <form className="col-6 row" onSubmit={(e)=>e.preventDefault()}>
                <div className="col-12 mb-3">
                <h2>Votre Profile</h2>
                </div>
                <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <div className='d-flex gap-1'>
                    <input type="text" name="firstName" id="firstName" onChange={handleChange} className={validFirstName ? "form-control" : "form-control is-invalid"} value={firstName} readOnly={rOfirstName} />
                    {rOfirstName ? <button className="btn btn-warning" onClick={handleEditFirstName}>Changer</button> :""}
                    {rOfirstName ? "" : <button className="btn btn-danger" onClick={handleUndoFirstName}>Annuler</button>}
                    {rOfirstName ? "" : <button className="btn btn-success" onClick={handleSaveFirstName}>Enregistrer</button>}
                    </div>
                    {validFirstName ? "" : <div className="invalid-feedback d-flex justify-content-center align-items-center ps-2">Prénom invalide</div>}
                </div>
                <div className="col-12 mb-3  d-flex flex-column">
                    <label htmlFor="lastName" className="form-label">Nom</label>
                    <div className='d-flex gap-1'>
                    <input type="text" name="lastName" id="lastName" onChange={handleChange} className={validLastName ? "form-control" : "form-control is-invalid"} value={lastName} readOnly={rOlastName} />
                    {rOlastName ? <button className="btn btn-warning" onClick={handleEditLastName}>Changer</button> :""}
                    {rOlastName ? "" : <button className="btn btn-danger" onClick={handleUndoLastName}>Annuler</button>}
                    {rOlastName ? "" : <button className="btn btn-success" onClick={handleSaveLastName}>Enregistrer</button>}
                    </div>
                    {validLastName ? "" : <div className="invalid-feedback d-flex justify-content-center align-items-center ps-2">Nom invalide</div>}
                </div>
                <div className="col-12 mb-3  d-flex flex-column">
                    <label htmlFor="birthday" className="form-label">Date de Naissance</label>
                    <div className='d-flex gap-1'>
                    <input type="date" name="birthday" id="birthday" onChange={handleChange} className={validBirthday ? "form-control" : "form-control is-invalid"} value={birthday} readOnly={rOBirthday} />
                    {rOBirthday ? <button className="btn btn-warning" onClick={handleEditBirthday}>Changer</button> :""}
                    {rOBirthday ? "" : <button className="btn btn-danger" onClick={handleUndoBirthday}>Annuler</button>}
                    {rOBirthday ? "" : <button className="btn btn-success" onClick={handleSaveBrithday}>Enregistrer</button>}
                    </div>
                    {validBirthday ? "" : <div className="invalid-feedback d-flex justify-content-center align-items-center ps-2">Date de Naissance invalide</div>}
                </div>
                <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className='d-flex gap-1'>
                    <input type="text" name="email" id="email" onChange={handleChange} className={validEmail ? "form-control" : "form-control is-invalid"} value={email} readOnly={rOEmail} />
                    {rOEmail ? <button className="btn btn-warning" onClick={handleEditEmail}>Changer</button> :""}
                    {rOEmail ? "" : <button className="btn btn-danger" onClick={handleUndoEmail}>Annuler</button>}
                    {rOEmail ? "" : <button className="btn btn-success" onClick={handleSaveEmail}>Enregistrer</button>}
                    </div>
                    {validEmail ? "" : <div className="invalid-feedback d-flex justify-content-center align-items-center ps-2">Email invalide</div>}
                </div>
                <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <div className='d-flex gap-1'>
                    <input type="password" hidden={rOPassword} name="password" id="password" onChange={handleChange} className={validPassword ? "form-control" : "form-control is-invalid"} value={password} />
                    {rOPassword ? <button className="btn btn-warning" onClick={handleEditPassword}>Changer</button> :""}
                    {rOPassword ? "" : <button className="btn btn-danger" onClick={handleUndoPassword}>Annuler</button>}
                    {rOPassword ? "" : <button className="btn btn-success" onClick={handleSavePassword}>Enregistrer</button>}
                    </div>
                    {validPassword ? "" : <div className="invalid-feedback d-flex justify-content-center align-items-center ps-2">Mot de passe invalide</div>}
                </div>
            </form>
            <div className="col-6 d-flex justify-content-center align-items-center">
                <img className ="image-profile" src={profileImage} alt="COOKING" />
            </div>
        </div>
    </div>
  )
}
