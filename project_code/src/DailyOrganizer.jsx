import React, { useContext, useState, useEffect } from "react";
import { BudgetContext } from "./BudgetContext";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, FaListUl, FaChartLine, FaHome, FaCogs, FaInfoCircle,
  FaUtensils, FaTshirt, FaGasPump, FaFilm, FaBook, FaDumbbell,
  FaBriefcaseMedical, FaCoffee, FaCut, FaBus, FaWifi, FaPiggyBank,
  FaParking, FaMobile, FaMoneyBillWave, FaCoins
} from "react-icons/fa";

const DailyOrganizer = () => {
  const { 
    selectedMonth,
    setSelectedMonth,
    remainingAfterAllocation, // Changed from moneyInHand to remainingAfterAllocation
    dailyPlans,
    saveDailyPlan
  } = useContext(BudgetContext);

  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [dailyBudget, setDailyBudget] = useState(0);
  const [remainingDailyBudget, setRemainingDailyBudget] = useState(0);
  const [categoryValues, setCategoryValues] = useState({});
  const [suggestedValues, setSuggestedValues] = useState({});
  const [error, setError] = useState("");
  const [priorityMode, setPriorityMode] = useState("balanced");
  const [projectedMoney, setProjectedMoney] = useState(remainingAfterAllocation); // Updated initial state

  // Categories with weights
  const categories = [
    { id: "food", name: "Food", icon: <FaUtensils />, essentialWeight: 0.25, luxuryWeight: 0.15 },
    { id: "transport", name: "Transport", icon: <FaBus />, essentialWeight: 0.15, luxuryWeight: 0.1 },
    { id: "health", name: "Health", icon: <FaBriefcaseMedical />, essentialWeight: 0.2, luxuryWeight: 0.1 },
    { id: "utilities", name: "Utilities", icon: <FaWifi />, essentialWeight: 0.1, luxuryWeight: 0.05 },
    { id: "gym", name: "Gym/Sports", icon: <FaDumbbell />, essentialWeight: 0.05, luxuryWeight: 0.1 },
    { id: "coffee", name: "Coffee", icon: <FaCoffee />, essentialWeight: 0.03, luxuryWeight: 0.08 },
    { id: "barber", name: "Barber/Salon", icon: <FaCut />, essentialWeight: 0.03, luxuryWeight: 0.07 },
    { id: "entertainment", name: "Entertainment", icon: <FaFilm />, essentialWeight: 0.02, luxuryWeight: 0.1 },
    { id: "shopping", name: "Shopping", icon: <FaTshirt />, essentialWeight: 0.02, luxuryWeight: 0.1 },
    { id: "subscriptions", name: "Subscriptions", icon: <FaMobile />, essentialWeight: 0.01, luxuryWeight: 0.03 },
    { id: "parking", name: "Parking", icon: <FaParking />, essentialWeight: 0.02, luxuryWeight: 0.02 },
    { id: "savings", name: "Savings", icon: <FaPiggyBank />, essentialWeight: 0.05, luxuryWeight: 0.02 },
    { id: "other", name: "Other", icon: <FaBook />, essentialWeight: 0.05, luxuryWeight: 0.05 }
  ];
  const locationLinks = {
    food: "/food-recommendations",
    health: "/health-recommendations",
    gym: "/sports-recommendations",
    barber: "/selfcare-recommendations",
    coffee: "/food-recommendations",
    shopping: "/shopping-recommendations",
    entertainment: "/shopping-recommendations"
  };
  // Initialize month selection
  useEffect(() => {
    if (location.state?.month) {
      setSelectedMonth(location.state.month);
    } else if (!selectedMonth) {
      const today = new Date();
      const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
      setSelectedMonth(defaultMonth);
    }
    
    setProjectedMoney(remainingAfterAllocation);
  }, [location.state, selectedMonth, setSelectedMonth, remainingAfterAllocation]);

  // Generate calendar for selected month
  const generateCalendar = () => {
    if (!selectedMonth) return [];

    const year = new Date(selectedMonth).getFullYear();
    const monthIndex = new Date(selectedMonth).getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPast = new Date(dateStr) < new Date().setHours(0, 0, 0, 0);
          week.push({
            day,
            date: dateStr,
            disabled: isPast,
            hasPlan: dailyPlans?.some(plan => plan.date === dateStr) || false
          });
          day++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  // Calculate total spent for the month so far
  const calculateTotalSpent = () => {
    if (!selectedMonth) return 0;
    
    return dailyPlans.reduce((total, plan) => {
      const planDate = new Date(plan.date);
      const currentMonth = new Date(selectedMonth);
      
      if (planDate.getMonth() === currentMonth.getMonth() && 
          planDate.getFullYear() === currentMonth.getFullYear()) {
        // Sum up all category amounts for this day
        const daySpent = plan.categories.reduce((sum, cat) => sum + (cat.amount || 0), 0);
        return total + daySpent;
      }
      return total;
    }, 0);
  };

  // Handle date selection with fixed budget calculation
  const handleDateSelect = (date) => {
    if (!date || date.disabled) return;
    
    setSelectedDate(date.date);
    
    // Get existing plan if available
    const existingPlan = dailyPlans?.find(plan => plan.date === date.date);
    
    // Calculate days remaining in month (including today)
    const dateObj = new Date(date.date);
    const daysInMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
    const dayOfMonth = dateObj.getDate();
    const daysRemaining = daysInMonth - dayOfMonth + 1;
    
    // Calculate money available for remaining days
    const totalSpent = calculateTotalSpent();
    const moneyAvailable = remainingAfterAllocation - totalSpent; // Updated to use remainingAfterAllocation
    
    // Calculate daily budget
    const calculatedDaily = moneyAvailable / daysRemaining;
    const roundedDaily = parseFloat(calculatedDaily.toFixed(2));
    
    setDailyBudget(roundedDaily);
    generateSuggestions(roundedDaily);
    
    // Initialize category values
    if (existingPlan) {
      const values = {};
      existingPlan.categories.forEach(cat => {
        values[cat.id] = cat.amount;
      });
      setCategoryValues(values);
    } else {
      const initialValues = {};
      categories.forEach(cat => {
        initialValues[cat.id] = 0;
      });
      setCategoryValues(initialValues);
    }
  };

  // Generate smart suggestions
  const generateSuggestions = (dailyAmount) => {
    const suggestions = {};
    const totalEssentialWeight = categories.reduce((sum, cat) => sum + cat.essentialWeight, 0);
    const totalLuxuryWeight = categories.reduce((sum, cat) => sum + cat.luxuryWeight, 0);
    
    categories.forEach(cat => {
      let weight = priorityMode === "essential" 
        ? cat.essentialWeight 
        : priorityMode === "luxury" 
          ? cat.luxuryWeight 
          : (cat.essentialWeight + cat.luxuryWeight) / 2;
      
      const normalizedWeight = priorityMode === "essential" 
        ? weight / totalEssentialWeight 
        : priorityMode === "luxury" 
          ? weight / totalLuxuryWeight 
          : weight / ((totalEssentialWeight + totalLuxuryWeight) / 2);
      
      suggestions[cat.id] = parseFloat((dailyAmount * normalizedWeight).toFixed(2));
    });
    
    setSuggestedValues(suggestions);
  };

  // Update remaining daily budget
  useEffect(() => {
    const totalSpent = Object.values(categoryValues).reduce((acc, val) => acc + (val || 0), 0);
    setRemainingDailyBudget(parseFloat((dailyBudget - totalSpent).toFixed(2)));
  }, [categoryValues, dailyBudget]);

  // Handle category changes
  const handleCategoryChange = (category, value) => {
    const amount = parseFloat(value) || 0;
    if (amount < 0) {
      setError("Amount cannot be negative.");
      return;
    }
    if (amount > dailyBudget) {
      setError(`Amount cannot exceed daily budget of $${dailyBudget}.`);
      return;
    }
    
    setError("");
    setCategoryValues({ ...categoryValues, [category]: amount });
  };

  // Save daily plan
  const handleSaveDailyPlan = () => {
    if (!selectedDate) {
      setError("Please select a date first.");
      return;
    }

    const totalDailySpending = Object.values(categoryValues).reduce((sum, val) => sum + (val || 0), 0);
    const totalSpent = calculateTotalSpent();
    
    // Calculate new projected money (remainingAfterAllocation minus all spent amounts including this day)
    const newProjected = remainingAfterAllocation - totalSpent - totalDailySpending;
    setProjectedMoney(newProjected);

    const dailyPlan = {
      date: selectedDate,
      dailyBudget,
      priorityMode,
      categories: categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        amount: categoryValues[cat.id] || 0,
        suggested: suggestedValues[cat.id] || 0
      })),
      remaining: remainingDailyBudget
    };

    saveDailyPlan(dailyPlan);
    setError("");
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar */}
      <motion.div 
        className="w-64 h-full bg-gradient-to-b from-blue-600 to-purple-600 shadow-lg flex flex-col justify-between py-6 px-4 fixed left-0 top-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Dashboard</h2>
          <div className="space-y-4">
            <Link to="/monthly-organizer">
              <motion.button
                className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FaCalendarAlt /> <span>Monthly Organizer</span>
              </motion.button>
            </Link>
            <Link to="/DailyOrganizer">
              <motion.button
                className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FaListUl /> <span>Daily Organizer</span>
              </motion.button>
            </Link>
            <Link to="/FuturePlans">
              <motion.button
                className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FaChartLine /> <span>Future Plans</span>
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/UserMainPage">
            <motion.button
              className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FaHome /> <span>Main Page</span>
            </motion.button>
          </Link>
          <Link to="/features">
            <motion.button
              className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FaCogs /> <span>Features</span>
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button
              className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FaInfoCircle /> <span>About Us</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Daily Organizer</h2>
        
        {/* Month Display */}
        {selectedMonth && (
          <div className="mt-4 p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700">
              Selected Month: {new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600">Available After Goals</p>
                <p className={`text-2xl font-bold ${remainingAfterAllocation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(remainingAfterAllocation).toFixed(2)}
                </p>
                {remainingAfterAllocation < 0 && (
                  <p className="text-red-500 text-sm">(Over Budget)</p>
                )}
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-600">Projected After Saved Plans</p>
                <p className={`text-2xl font-bold ${projectedMoney >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(projectedMoney).toFixed(2)}
                </p>
                {projectedMoney < 0 && (
                  <p className="text-red-500 text-sm">(Over Budget)</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Calendar View */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {generateCalendar().map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`p-2 border rounded-lg text-center cursor-pointer transition ${
                    day?.disabled 
                      ? "bg-gray-100 text-gray-400" 
                      : day?.date === selectedDate
                        ? "bg-blue-100 text-blue-600 font-bold"
                        : day?.hasPlan
                          ? "bg-green-50 hover:bg-green-100"
                          : "hover:bg-gray-50"
                  }`}
                  whileHover={!day?.disabled ? { scale: 1.05 } : {}}
                  onClick={() => !day?.disabled && handleDateSelect(day)}
                >
                  {day?.day || ""}
                  {day?.hasPlan && (
                    <div className="w-1 h-1 bg-green-500 rounded-full mx-auto mt-1"></div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Budget UI (only shown when date selected) */}
        {selectedDate && (
          <>
            {/* Budget Summary */}
            <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-600">Daily Budget</p>
                  <p className="text-2xl font-bold text-green-600">${dailyBudget.toFixed(2)}</p>
                </div>
                <div className={`p-4 rounded-lg ${remainingDailyBudget >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-gray-600">Remaining Today</p>
                  <p className={`text-2xl font-bold ${remainingDailyBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${remainingDailyBudget.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-600">Selected Date</p>
                  <p className="text-xl font-bold text-purple-600">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Priority Mode Selector */}
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.button
                  className={`px-4 py-2 rounded-lg ${priorityMode === "essential" ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setPriorityMode("essential");
                    generateSuggestions(dailyBudget);
                  }}
                >
                  Essential Mode
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-lg ${priorityMode === "balanced" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setPriorityMode("balanced");
                    generateSuggestions(dailyBudget);
                  }}
                >
                  Balanced Mode
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-lg ${priorityMode === "luxury" ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setPriorityMode("luxury");
                    generateSuggestions(dailyBudget);
                  }}
                >
                  Luxury Mode
                </motion.button>
              </div>

              <motion.button
                className="px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-lg hover:bg-blue-200 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCategoryValues(suggestedValues)}
              >
                Apply Smart Suggestions
              </motion.button>
            </div>

                   {/* Spending Categories */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Spending Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const hasLocationPage = Object.keys(locationLinks).includes(category.id);
              return (
                <motion.div 
                  key={category.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-blue-500">{category.icon}</span>
                    <h4 className="font-semibold text-gray-700">{category.name}</h4>
                    <span className="text-sm text-gray-500 ml-auto">
                      Suggested: ${suggestedValues[category.id]?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={categoryValues[category.id] || ""}
                      onChange={(e) => handleCategoryChange(category.id, e.target.value)}
                      min="0"
                      max={dailyBudget}
                      step="0.01"
                    />
                  </div>
                  {hasLocationPage && (
                    <Link
                      to={locationLinks[category.id]}
                      className="text-blue-500 text-sm underline hover:text-blue-700"
                    >
                      Get Best Location
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

            {/* Save Button */}
            <motion.button
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveDailyPlan}
            >
              Save Daily Plan
            </motion.button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyOrganizer;