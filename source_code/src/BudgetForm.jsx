import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BudgetContext } from "./BudgetContext";
import { motion } from "framer-motion";
import { 
  FaLightbulb, FaWater, FaWifi, FaHome, FaPhone, FaCreditCard, FaMoneyBillWave, 
  FaShoppingCart, FaCar, FaSchool, FaBus, FaTv, FaCoins, FaPiggyBank, FaBriefcase, FaUsers 
} from "react-icons/fa";

const BudgetForm = () => {
  const { 
    budget, 
    setBudget,
    bills,
    addBill,
    removeBill,
    incomes,
    addIncome,
    removeIncome,
    setSelectedMonth
  } = useContext(BudgetContext);
  
  const [step, setStep] = useState(1);
  const [selectedBills, setSelectedBills] = useState([]);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const navigate = useNavigate();

  const availableBills = [
    { name: "Electricity", icon: <FaLightbulb /> },
    { name: "Water", icon: <FaWater /> },
    { name: "Internet", icon: <FaWifi /> },
    { name: "Rent", icon: <FaHome /> },
    { name: "Phone Bill", icon: <FaPhone /> },
    { name: "Credit Card", icon: <FaCreditCard /> },
    { name: "Insurance", icon: <FaMoneyBillWave /> },
    { name: "Groceries", icon: <FaShoppingCart /> },
    { name: "Gas", icon: <FaCar /> },
    { name: "Education", icon: <FaSchool /> },
    { name: "Transportation", icon: <FaBus /> },
    { name: "TV", icon: <FaTv /> },
    { name: "Other", icon: <FaCoins /> },
  ].filter(bill => !bills.some(b => b.name === bill.name));

  const availableIncomeSources = [
    { name: "Salary", icon: <FaBriefcase /> },
    { name: "Freelancing", icon: <FaPiggyBank /> },
    { name: "Investments", icon: <FaMoneyBillWave /> },
    { name: "Side Business", icon: <FaCoins /> },
    { name: "Passive Income", icon: <FaCreditCard /> },
    { name: "Stock Market", icon: <FaMoneyBillWave /> },
    { name: "Real Estate", icon: <FaHome /> },
    { name: "Part-time Job", icon: <FaBriefcase /> },
    { name: "Parents", icon: <FaUsers /> },
    { name: "Other", icon: <FaCoins /> }
  ].filter(income => !incomes.some(i => i.name === income.name));

  const handleBillSelection = (billName) => {
    if (selectedBills.includes(billName)) {
      setSelectedBills(prev => prev.filter(b => b !== billName));
    } else {
      setSelectedBills(prev => [...prev, billName]);
    }
  };

  const handleIncomeSelection = (incomeName) => {
    if (selectedIncomes.includes(incomeName)) {
      setSelectedIncomes(prev => prev.filter(i => i !== incomeName));
    } else {
      setSelectedIncomes(prev => [...prev, incomeName]);
    }
  };

  const handleSubmit = () => {
    // Set default month to current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setSelectedMonth(currentMonth);
    
    // Add all selected bills and incomes
    selectedBills.forEach(bill => addBill(bill));
    selectedIncomes.forEach(income => addIncome(income));
    
    navigate("/UserMainPage");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div 
        className="w-full max-w-4xl p-8 bg-white shadow-2xl rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-4xl font-extrabold text-center mb-8 text-blue-600"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Financial Setup
        </motion.h2>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step === stepNumber ? 'bg-blue-500 text-white' : 
                  step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mt-4 ${step > stepNumber ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Enter Budget */}
        {step === 1 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Enter Your Monthly Budget</h3>
            <div className="relative max-w-md mx-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <motion.input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-4 pl-8 border-2 border-gray-300 rounded-lg text-xl focus:ring-2 focus:ring-blue-400 bg-white"
                placeholder="Enter amount"
                min="0"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <p className="mt-4 text-gray-600">This will be your base monthly budget before any income or expenses</p>
          </motion.div>
        )}

        {/* Step 2: Choose Bills */}
        {step === 2 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Select Your Monthly Bills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableBills.map((bill) => (
                <motion.button 
                  key={bill.name} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                    selectedBills.includes(bill.name) 
                      ? "bg-blue-100 border-blue-500 shadow-inner" 
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleBillSelection(bill.name)}
                >
                  <span className="text-2xl mb-2 text-blue-500">
                    {bill.icon}
                  </span>
                  <span className="font-medium">{bill.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Choose Income Sources */}
        {step === 3 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Select Your Income Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableIncomeSources.map((income) => (
                <motion.button 
                  key={income.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                    selectedIncomes.includes(income.name)
                      ? "bg-green-100 border-green-500 shadow-inner"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleIncomeSelection(income.name)}
                >
                  <span className="text-2xl mb-2 text-green-500">
                    {income.icon}
                  </span>
                  <span className="font-medium">{income.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <motion.button 
              onClick={() => setStep(step - 1)} 
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          
          {step < 3 ? (
            <motion.button 
              onClick={() => setStep(step + 1)} 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={step === 1 && !budget}
            >
              Continue
            </motion.button>
          ) : (
            <motion.button 
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
            >
              Complete Setup
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetForm;