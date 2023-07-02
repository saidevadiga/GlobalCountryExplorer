import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
    
    return ( 
        <div>
            <NavBar/>
            <div className="home-div">
                <img className="world-image" src="https://wallpapers.com/images/hd/map-background-0idc9qmhuwn1ik1s.jpg" alt="Image Unavailable" />
                <Link to={`/allcountries`}>
                     <button className="explore-button">Explore All Countries</button>                
                </Link>
            </div>
        </div>
    );
}
 
export default Home;