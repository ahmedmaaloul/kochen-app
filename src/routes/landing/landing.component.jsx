import TopRecettes from "../../components/toprecettes/toprecettes";
import Welcome from "../../components/welcome/welcome.component";
import "./landing.component.scss"
const Landing = () =>{
    return(
        <>
        <div className="py-5 landing-container">
        <Welcome/>
        </div>
        </>
    );
}
export default Landing;