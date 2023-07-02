import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CountryList = ({region,contries,message,time}) => {

    let[countries,setCountries]=useState(null);

    useEffect(()=>{
        setTimeout(()=>{
                const url = "https://restcountries.com/v3.1/all";
                const options = {
                        method: 'GET',
                    };
                fetch(url,options)
                .then((res)=>{return res.json()})
                .then((data)=>{ 
                    if(contries==null)
                    {
                        setCountries(data.filter((c)=>{return c.continents[0]==region}));
                    }
                    if(region==null)
                    {
                        setCountries(contries);
                    }
                })             
        },time)
    },[region])

    return ( 
        <div className="main-countrylist-div">
            {
                countries &&
                <div className="countrylist-div">                  
                    <div className="countrylist-label"><span>{message}</span></div>
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
                </div>
            }
        </div>
    );
}
 
export default CountryList;