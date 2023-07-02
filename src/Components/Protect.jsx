import { Navigate } from "react-router-dom";


const Protect = ({Child}) => {

    let login=()=>{
        let loggedin=JSON.parse(localStorage.getItem("login"));
        if(loggedin==false || loggedin==null)
        {
            alert("Please Login to explore more feature...!")
        }
        console.log(loggedin);
        return loggedin;
    }

    return (
        <div>
        {
            login() ?<Child/> : <Navigate to="/login"/>
        }
        </div>
      );
}
 
export default Protect;