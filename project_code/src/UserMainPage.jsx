import React, { useContext, useState } from "react";
import { BudgetContext } from "./BudgetContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt, FaListUl, FaChartLine, FaPlus, FaLightbulb, FaWater, FaWifi,
  FaHome as FaHouse, FaPhone, FaCreditCard, FaMoneyBillWave, FaShoppingCart,
  FaCar, FaSchool, FaBus, FaTv, FaCoins, FaPiggyBank, FaBriefcase, FaUsers,
  FaHome, FaCogs, FaInfoCircle, FaEdit, FaTrash, FaChartPie, FaBullseye,
  FaCar as FaCarGoal, FaHome as FaHouseGoal, FaGraduationCap, FaPlane, FaHeart,
  FaCheck, FaMoneyBillAlt
} from "react-icons/fa";

const allBills = [
  { name: "Electricity", icon: <FaLightbulb /> },
  { name: "Water", icon: <FaWater /> },
  { name: "Internet", icon: <FaWifi /> },
  { name: "Rent", icon: <FaHouse /> },
  { name: "Phone Bill", icon: <FaPhone /> },
  { name: "Credit Card", icon: <FaCreditCard /> },
  { name: "Insurance", icon: <FaMoneyBillWave /> },
  { name: "Groceries", icon: <FaShoppingCart /> },
  { name: "Gas", icon: <FaCar /> },
  { name: "Education", icon: <FaSchool /> },
  { name: "Transportation", icon: <FaBus /> },
  { name: "TV", icon: <FaTv /> },
  { name: "Other", icon: <FaCoins /> }
];

const allIncomeSources = [
  { name: "Salary", icon: <FaBriefcase /> },
  { name: "Freelancing", icon: <FaPiggyBank /> },
  { name: "Investments", icon: <FaMoneyBillWave /> },
  { name: "Side Business", icon: <FaCoins /> },
  { name: "Passive Income", icon: <FaCreditCard /> },
  { name: "Stock Market", icon: <FaMoneyBillWave /> },
  { name: "Real Estate", icon: <FaHouse /> },
  { name: "Part-time Job", icon: <FaBriefcase /> },
  { name: "Parents", icon: <FaUsers /> },
  { name: "Other", icon: <FaCoins /> }
];

// Icon mapping for goals
const goalIcons = {
  car: <FaCarGoal className="text-xl" />,
  house: <FaHouseGoal className="text-xl" />,
  education: <FaGraduationCap className="text-xl" />,
  vacation: <FaPlane className="text-xl" />,
  wedding: <FaHeart className="text-xl" />,
  default: <FaPiggyBank className="text-xl" />
};

const ProgressBar = ({ value, max, color }) => {
  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

const UserMainPage = () => {
  const { 
    budget, 
    setBudget,
    bills,
    addBill,
    updateBillAmount,
    removeBill,
    incomes,
    addIncome,
    updateIncomeAmount,
    removeIncome,
    futureGoalsCutoff,
    moneyInHand,
    remainingAfterAllocation,
    calculateCurrentTotals,
    goalsDisplayData
  } = useContext(BudgetContext);

  const [showBillOptions, setShowBillOptions] = useState(false);
  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || "");

  const { 
    totalIncome, 
    totalExpenses, 
    netTotal
  } = calculateCurrentTotals();

  const savings = moneyInHand - futureGoalsCutoff;
  const budgetBeforeAllocation = moneyInHand;

  // Filter available options
  const availableBills = allBills.filter(bill => 
    !bills.some(b => b.name === bill.name)
  );
  const availableIncomeSources = allIncomeSources.filter(income => 
    !incomes.some(i => i.name === income.name)
  );

  const handleEditBudget = () => setIsEditingBudget(true);

  const handleSaveBudget = () => {
    const parsedBudget = Math.max(0, Number(newBudget) || 0);
    setBudget(parsedBudget);
    setIsEditingBudget(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    },
    hover: {
      rotate: [0, 10, -5, 0],
      transition: { duration: 0.7 }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-x-hidden">
      {/* Sidebar */}
      <motion.div
        className="fixed inset-y-0 left-0 w-64 h-full bg-gradient-to-b from-blue-600 to-purple-600 shadow-lg flex flex-col justify-between py-6 px-4"
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
              <FaHome /> <span>Home</span>
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
      <div className="flex-1 p-8 overflow-y-auto ml-64">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Financial Overview
        </motion.h2>
        
        {/* Budget Section */}
        <motion.div 
          className="mt-4 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold flex items-center space-x-4">
              <FaMoneyBillAlt className="text-blue-500" />
              <span>Monthly Budget:</span>
            </p>
            {isEditingBudget ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter new budget"
                  min="0"
                />
                <motion.button
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveBudget}
                >
                  Save
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-bold">${budget || "Not Set"}</span>
                <motion.button
                  className="p-2 text-blue-500 hover:text-blue-600 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEditBudget}
                >
                  <FaEdit />
                </motion.button>
              </div>
            )}
          </div>

          {/* Budget Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { 
                label: "Money in Hand", 
                value: moneyInHand.toFixed(2), 
                bg: "bg-blue-50", 
                text: "text-blue-600",
                icon: <FaMoneyBillAlt className="text-blue-400" />
              },
              { 
                label: "Goals Allocation", 
                value: futureGoalsCutoff.toFixed(2), 
                bg: "bg-purple-50", 
                text: "text-purple-600",
                icon: <FaBullseye className="text-purple-400" />
              },
              { 
                label: "Available After Goals", 
                value: remainingAfterAllocation.toFixed(2), 
                bg: remainingAfterAllocation >= 0 ? 'bg-green-50' : 'bg-red-50', 
                text: remainingAfterAllocation >= 0 ? 'text-green-600' : 'text-red-600',
                icon: remainingAfterAllocation >= 0 ? <FaCheck className="text-green-400" /> : <FaInfoCircle className="text-red-400" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${item.bg}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{item.label}</p>
                  {item.icon}
                </div>
                <p className={`text-xl font-bold ${item.text}`}>${item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Allocation Visualization Section */}
        <motion.div 
          className="mt-6 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartPie className="mr-2 text-purple-500" />
            Budget Allocation Flow
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Allocation */}
            <motion.div 
              className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400 shadow-sm"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <FaMoneyBillAlt className="text-indigo-500 text-xl" />
                </motion.div>
                <h4 className="font-semibold text-gray-700">Before Goal Allocation</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Available:</span>
                  <span className="font-medium text-indigo-600">${budgetBeforeAllocation.toFixed(2)}</span>
                </div>
                <div className="text-sm text-indigo-500">
                  (Base budget + Income - Expenses)
                </div>
              </div>
            </motion.div>

            {/* After Allocation */}
            <motion.div 
              className={`p-4 rounded-lg border-l-4 ${remainingAfterAllocation >= 0 ? 'bg-teal-50 border-teal-400' : 'bg-rose-50 border-rose-400'} shadow-sm`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <FaPiggyBank className={`text-xl ${remainingAfterAllocation >= 0 ? 'text-teal-500' : 'text-rose-500'}`} />
                </motion.div>
                <h4 className="font-semibold text-gray-700">After Goal Allocation</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Balance:</span>
                  <span className={`font-medium ${remainingAfterAllocation >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                    ${remainingAfterAllocation.toFixed(2)}
                  </span>
                </div>
                <div className={`text-sm ${remainingAfterAllocation >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>
                  {remainingAfterAllocation >= 0 ? 'Available for spending' : 'Warning: Over-allocated'}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Goals Display Section */}
        {goalsDisplayData.length > 0 && (
          <motion.div 
            className="mt-6 p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBullseye className="mr-2 text-purple-500" />
              Your Financial Goals
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goalsDisplayData.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={index}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-full ${goal.color} text-white`}>
                      {goalIcons[goal.iconType] || goalIcons.default}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                      <p className="text-sm text-gray-500">${goal.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Allocation:</span>
                      <span className="font-medium">${goal.monthlyAllocation.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time Required:</span>
                      <span className="font-medium">{goal.monthsNeeded} months</span>
                    </div>
                    
                    <div className="mt-2">
                      <ProgressBar 
                        value={goal.completionPercent} 
                        max={100} 
                        color={goal.color}
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span>{goal.completionPercent.toFixed(0)}% Complete</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Monthly Summary Section */}
        <motion.div 
          className="mt-6 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaChartPie className="mr-2 text-blue-500" />
            Monthly Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                label: "Total Income", 
                value: totalIncome.toFixed(2), 
                bg: "bg-green-50", 
                text: "text-green-600" 
              },
              { 
                label: "Total Expenses", 
                value: totalExpenses.toFixed(2), 
                bg: "bg-red-50", 
                text: "text-red-600" 
              },
              { 
                label: "Total Savings", 
                value: savings.toFixed(2), 
                bg: "bg-purple-50", 
                text: "text-purple-600" 
              },
              { 
                label: "Net Total", 
                value: Math.abs(netTotal).toFixed(2), 
                bg: netTotal >= 0 ? 'bg-green-50' : 'bg-red-50', 
                text: netTotal >= 0 ? 'text-green-600' : 'text-red-600',
                status: netTotal >= 0 ? 'POSITIVE BALANCE' : 'NEGATIVE BALANCE'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${item.bg}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <p className="text-gray-600">{item.label}</p>
                <p className={`text-2xl font-bold ${item.text}`}>${item.value}</p>
                {item.status && (
                  <p className={`text-sm font-semibold ${item.text}`}>
                    {item.status}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bills Section */}
        <motion.div 
          className="mt-6 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaMoneyBillWave className="mr-2 text-red-500" />
              Selected Bills
            </h3>
            <motion.button
              className="text-blue-500 flex items-center space-x-2 hover:text-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBillOptions(!showBillOptions)}
            >
              <FaPlus /> <span>Add Bill</span>
            </motion.button>
          </div>
          
          {bills.length > 0 ? (
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm mt-2">
              <tbody>
                {bills.map((bill, index) => {
                  const billObj = allBills.find(b => b.name === bill.name);
                  return (
                    <motion.tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <td className="px-4 py-3 flex items-center space-x-2">
                        {billObj?.icon} <span className="text-gray-700">{bill.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={bill.amount}
                          onChange={(e) => updateBillAmount(bill.name, e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg w-full"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <motion.button
                          className="text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeBill(bill.name)}
                        >
                          <FaTrash />
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <motion.p 
              className="text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              No bills added yet
            </motion.p>
          )}

          {showBillOptions && (
            <motion.div
              className="mt-2 bg-gray-50 p-3 rounded-lg shadow-inner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {availableBills.map((bill) => (
                <motion.button
                  key={bill.name}
                  className="w-full text-left p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-100 flex items-center space-x-2 mb-2 last:mb-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addBill(bill.name)}
                >
                  {bill.icon} <span className="text-gray-700">{bill.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Income Section */}
        <motion.div 
          className="mt-6 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaCoins className="mr-2 text-green-500" />
              Income Sources
            </h3>
            <motion.button
              className="text-blue-500 flex items-center space-x-2 hover:text-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowIncomeOptions(!showIncomeOptions)}
            >
              <FaPlus /> <span>Add Income</span>
            </motion.button>
          </div>
          
          {incomes.length > 0 ? (
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm mt-2">
              <tbody>
                {incomes.map((income, index) => {
                  const incomeObj = allIncomeSources.find(i => i.name === income.name);
                  return (
                    <motion.tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <td className="px-4 py-3 flex items-center space-x-2">
                        {incomeObj?.icon} <span className="text-gray-700">{income.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={income.amount}
                          onChange={(e) => updateIncomeAmount(income.name, e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg w-full"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <motion.button
                          className="text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeIncome(income.name)}
                        >
                          <FaTrash />
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <motion.p 
              className="text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              No income sources added yet
            </motion.p>
          )}

          {showIncomeOptions && (
            <motion.div
              className="mt-2 bg-gray-50 p-3 rounded-lg shadow-inner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {availableIncomeSources.map((income) => (
                <motion.button
                  key={income.name}
                  className="w-full text-left p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-100 flex items-center space-x-2 mb-2 last:mb-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addIncome(income.name)}
                >
                  {income.icon} <span className="text-gray-700">{income.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserMainPage;