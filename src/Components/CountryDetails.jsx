import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import CountryList from "./CountryList";
import NavBar from "./NavBar";

const CountryDetails = () => {

    window.scrollTo(0,0);

    let {countryName}=useParams();

    let[country,setCountry]=useState(null);

    let[lang,setLang]=useState(null);
    let[currency,setCurrency]=useState(null);
    let[capital,setCapital]=useState(null);

    let [loading, setLoading] = useState(true);

    let [region,setRegion]=useState("");

    useEffect(()=>{
        setTimeout(()=>{
            const url = "https://restcountries.com/v3.1/name/"+countryName;
            const options = {
                    method: 'GET',
                };
                fetch(url,options)
                .then((res)=>{return res.json()})
                .then((data)=>{
                    console.log(data);                  
                    setCountry(data.filter((c)=>{return c.name.common==countryName}));
                }) 
                setLoading(false);
        },3000)   
    },[countryName])

    useEffect(()=>{
        if(country)
        {
            if(country[0].languages!=undefined)
            {
                setLang(Object.values(country[0].languages))
            }
            
            if(country[0].currencies!=undefined)
            {
                setCurrency(Object.values(country[0].currencies))
            }
            if(country[0].capital!=undefined){
                setCapital(country[0].capital)
            }
            setRegion(country[0].continents[0]);
        }
    },[country])


    return ( 
        <div>
            <NavBar/>
            {loading && <div className="loader"><RiseLoader color="black" /></div> }
            {
                country &&
                <div className="country-main-div">
                    <div className="flag-name-div">
                        <img className="country-flag" src={country[0].flags.png}  alt="Image Unavailable" />
                        <h6 className="countryName">{country[0].name.common}</h6>
                        <img className="country-COA" src={country[0].coatOfArms.svg} alt="Image Unavailable" />
                    </div>
                    <div className="country-details">
                        <div>
                            <span>{country[0].name.official}</span>
                        </div>
                        <div>
                            <span>Capital :</span> {
                                                    capital ?
                                                    <span> {capital.join(',')}</span> :
                                                    <span>None</span>
                                                    }
                        </div>
                        <div>
                            <span>Continent :</span> 
                            <span> {country[0].continents[0]}</span>
                        </div>
                        <div>
                            <span>Languages :</span> {
                                                       lang ?
                                                        <span>{lang.join(',')}</span> :
                                                        <span>None</span>
                                                    }
                        </div>
                        <div><span>Currency :</span>{
                                                     currency ?
                                                        <span> {currency[0].name} [ {currency[0].symbol} ] </span> :
                                                        <span> None</span> 
                                                    }
                        </div>
                        <div>
                            <span>Population :</span> 
                            <span> {country[0].population}</span>
                        </div>
                        <div>
                            <span>Timezone :</span> 
                            <span> {country[0].timezones[0]}</span>
                        </div>
                        <div>
                            <span>Wikipedia : </span>
                            <a href={"https://en.wikipedia.org/wiki/"+countryName}>Know More about {countryName}</a>
                        </div>
                    </div>
                    <div className="back-button-div">
                        <Link to={`/allcountries`}><button className="back-button">Back</button></Link>
                    </div>
                </div> 
            } 
            <CountryList region={region} contries={null} message={`Countries Present in `+region+` continent`} time={4000}/>    
        </div>
     );
}
 
export default CountryDetails;