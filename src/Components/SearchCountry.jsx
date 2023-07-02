import { useParams } from "react-router-dom";
import CountryList from "./CountryList"
import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import NavBar from "./NavBar";

const SearchCountry = () => {
    
    let {searchKey} = useParams();
    let [countries,setCountries]=useState(null);
    let [pending, setPending]=useState(true);

    useEffect(()=>{

        setCountries(null);
        setPending(true);

        setTimeout  (()=>{
            const url = "https://restcountries.com/v3.1/all";
            const options = {
                method: 'GET',
            };
            fetch(url,options)
            .then((res)=>{return res.json()})
            
            .then((data)=>{
                let d=data.filter((c)=>{
                    return (c.name.common.toLowerCase().includes(searchKey.toLowerCase()) ||
                            c.name.official.toLowerCase().includes(searchKey.toLowerCase())||
                            c.continents[0].toLowerCase().includes(searchKey.toLowerCase()))
                })
                setCountries(d)
            })          
            setPending(false)
        }
    ,3000)},[searchKey])

    return ( 
        <div>
            <NavBar/>
            {pending && <div className="loader"><RiseLoader color="black" /></div>}
            {countries && <CountryList region={null} contries={countries} message={"Searched Results"} time={0}/> }
        </div>
     );
}
 
export default SearchCountry;