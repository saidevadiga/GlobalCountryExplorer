import { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

const NavBar = () => {

    let navigate=useNavigate();

    let [key,setKey] = useState("");
    let searchText=useRef();
    let [isSearchActive, setIsSearchActive] = useState(false);

    let loggedin=JSON.parse(localStorage.getItem("login"))  

    let logout=()=>{
        JSON.stringify(localStorage.removeItem("login"))
        alert("Logged out Succesfully")
        navigate("/")
    }

    let[countries,setCountries]=useState(null);

    useEffect(()=>{
        const url = "https://restcountries.com/v3.1/all";
        const options = {
                method: 'GET',
            };
            fetch(url,options)
            .then((res)=>{return res.json()})
            .then((data)=>{
                data=data.map((c)=>{
                    if(c.name.common.toLowerCase().includes(key.toLowerCase()))
                    {
                        return  c.name.common;
                    }
                }).filter((c) => c !== null);
                setCountries(data);
            })
    },[key])
    

    return ( 
        <>
            <nav className="Navbar">
                <div className="logo">
                    <Link to={`/`} style={{textDecoration:"none", color:"white"}}>
                        <h1>Global Country Explorer</h1>
                    </Link>
                </div>
                <div className="search">
                    <input type="search"
                            className="search-input" 
                            ref={searchText} value={key} 
                            onChange={(e)=>{setKey(e.target.value)}} 
                            onFocus={() => {setIsSearchActive(true);}} 
                            onBlur={() => {setIsSearchActive(false)}} 
                            placeholder="Search for Countries" />
                    <button className="search-button"><Link to={`/searchcountries/${key}`} >Search</Link></button>
                </div>
                <div className="options">
                    { loggedin ?
                        <div className="logout-div">
                            <button id='logout-button' onClick={logout}>Logout</button>
                        </div> :
                        <div className='login-signup-div'>
                            <Link to={`/signup`}><button id='signup-button1'>Signup</button></Link>
                            <Link to={`/login`}><button id='login-button2' >Login</button></Link>
                        </div>
                    }
                </div>
            </nav>
            {isSearchActive && key !==''&& countries &&
                <div className="country-dropdown">
                   <div>
                    {
                        countries.map((c,i)=>{
                            return (< >{c!=undefined && <p key={i} onClick={()=>{setKey(c)}}>{c}</p>}</>)
                        })
                    }
                   </div>
                </div>
            }
        </>
    );
}
 
export default NavBar;