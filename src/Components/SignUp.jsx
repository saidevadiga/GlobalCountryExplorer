import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    let navigate=useNavigate();  

    let username=useRef();
    let email=useRef();
    let password=useRef();
    let repassword=useRef();


    let signup=(e)=>{

        e.preventDefault();

        if(password.current.value!=repassword.current.value)
        {
            alert("Password entered was not matching please check ")
            return
        }
       

        let newuser={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
        }

        localStorage.setItem("userdetails", "[]");
        let users=JSON.parse(localStorage.getItem("userdetails"));
        users.push(newuser);
        users=JSON.stringify(users);
        
        localStorage.setItem("userdetails", users);
        

        alert("Account Created Succesfully")
        navigate("/login");
    }

    return ( 
        <div id="outerdivsignup">
            <div className="signUpLogin">
                <form onSubmit={signup} id="signupform">
                    <h1 id="signuplogo">Global Country Explorer</h1>
                    <input id="input" type="text" placeholder="Enter your name" ref={username} required/>
                    <input id="input" type="email" placeholder="Enter email ID" ref={email} required/>
                    <input id="input" type="text" placeholder="Enter password" ref={password} required/>
                    <input id="input" type="text" placeholder="Re-enter password" ref={repassword}  required/>
                    <input type="submit" value="SignUp" id="submit" />
                    <br />
                    <br />
                    <span id="hasornot">Already have an account..? <a href="/login" id="anchors">Login</a></span>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp;