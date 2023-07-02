import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let navigate=useNavigate(); 
    let email=useRef(); 
    let password=useRef();

    let login=(e)=>{
        e.preventDefault();
        
        let users=JSON.parse(localStorage.getItem("userdetails"));
        console.log(users);
            users.forEach((v,i) => {
                if(users[i].email!=email.current.value)
            {
                alert("UserNot Found")
            }
            else if(users[i].password!=password.current.value)
            {
                alert("wrong password")
            }
            else{
                JSON.stringify(localStorage.removeItem("login"))
                localStorage.setItem("login",true);
                alert("Login Succesfull")
                navigate("/")
            }
            });
    }

    return (
        <div id="outerdivsignup">
            <div className="signUpLogin">
                <form onSubmit={login} id="signupform">
                    <h1 id="signuplogo">Global Country Explorer</h1>
                    <input id="input" type="email" placeholder="Enter email ID" ref={email}/>
                    <input id="input" type="text" placeholder="Enter password" ref={password}/>
                    <a href="/" id="anchors">Forgotten password...?</a>
                    <input type="submit" value="Login" id="submit" />
                    <br />
                    <br />
                    <span id="hasornot">Don't have an account..? <a href="/signup" id="anchors">Signup</a></span>
                </form>
            </div>
        </div>
      );
}
 
export default Login;