import AllCountries from "./Components/AllCountries";
import CountryDetails from "./Components/CountryDetails";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Protect from "./Components/Protect";
import SearchCountry from "./Components/SearchCountry";
import SignUp from "./Components/SignUp";
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/" element={<Home/>} />
        <Route path="/allcountries" element={<AllCountries/>} />
        <Route path="/countrydetails/:countryName" element={<Protect Child={CountryDetails}/> }/>
        <Route path="/searchcountries/:searchKey" element={<SearchCountry/>} />
        <Route path="/searchcountries/" element={<AllCountries/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
