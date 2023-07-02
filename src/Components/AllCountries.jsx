import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

const AllCountries = () => {

    let[countries,setCountries]=useState(null);

    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            const url = "https://restcountries.com/v3.1/all";
            const options = {
                    method: 'GET',
                };
                fetch(url,options)
                .then((res)=>{return res.json()})
                .then((data)=>{ 
                    console.log(data);
                    data =   data.sort((a,b)=>{
                                            const nameA=a.name.common.toLowerCase();
                                            const nameB=b.name.common.toLowerCase();

                                            if (nameA < nameB) {
                                                return -1;
                                            }
                                            if (nameA > nameB) {
                                                return 1;
                                            }
                                            
                                            return 0;
                                            
                                            })
                    setCountries(data);
            })
            setLoading(false);
        },3000)
    },[])

    return ( 
        <div>
            <NavBar/>
            {loading && <div className="loader"><RiseLoader color="black" /></div> }
            {
                countries &&
                <div className="all-countries">
                    {countries.map((country,i)=>{
                    return (
                        <Link to={`/countrydetails/${country.name.common}`}  key={i} style={{textDecoration:"none", color:"black"}}>
                            <div  className="country-div">
                                <img className="flag" src={country.flags.png} alt="Image Unavailable" />
                                <p className="country-name">{country.name.common}</p>
                            </div>                
                        </Link>
                    )
                })}
                </div>
            }
        </div>
    );
}
 
export default AllCountries;