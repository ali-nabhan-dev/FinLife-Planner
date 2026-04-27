import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignIn from './SignUp';
import Introduction from './Introduction' ;

import Features from "./Features";
import About from "./About";
import AboutUs from "./AboutUs";
import Pricing from "./Pricing";

import BudgetForm from "./BudgetForm";
import UserMainPage from "./UserMainPage";
import { BudgetProvider } from "./BudgetContext";
import MonthlyOrganizer from "./MonthlyOrganizer";
import DailyOrganizer from "./DailyOrganizer";
import FuturePlans from "./FuturePlans";

import ForgotPassword from "./ForgotPassword";

import FoodRecommendationsPage from "./FoodRecommendationsPage";
import HealthCentersPage from "./HealthCentersPage";
import GymsPage from './GymsPage';
import ShoppingCentersPage from './ShoppingCentersPage';
import BarberSalonPage from './BarberSalonPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BudgetProvider>
    <Router>
    <Routes>
    <Route path="/" element={<Introduction/>}/>
        <Route path="/login" element={<Login />} />
       
        <Route path="/SignUp" element={<SignIn/>}/>
        <Route path="/Features" element={<Features/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
       
        <Route path="/Pricing" element={<Pricing/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        
        <Route path="/BudgetForm" element={<BudgetForm/>}/>
        <Route path="/UserMainPage" element={<UserMainPage/>}/>
        <Route path="/monthly-organizer" element={<MonthlyOrganizer />} />
        
        <Route path="/DailyOrganizer" element={<DailyOrganizer />} />
        <Route path="/FuturePlans" element={<FuturePlans />} />
        <Route path="/food-recommendations" element={<FoodRecommendationsPage />} />
        <Route path="/health-recommendations" element={<HealthCentersPage />} />
        <Route path="/sports-recommendations" element={<GymsPage />} />
        <Route path="/shopping-recommendations" element={<ShoppingCentersPage />} />
        <Route path="/selfcare-recommendations" element={<BarberSalonPage />} />

</Routes>
        </Router>
        </BudgetProvider>
  )

}

export default App
