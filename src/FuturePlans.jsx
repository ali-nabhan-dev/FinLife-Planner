import React, { useContext, useState, useEffect } from 'react';
import { BudgetContext } from './BudgetContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt, FaListUl, FaChartLine, FaHome, FaCogs, FaInfoCircle,
  FaPiggyBank, FaCar, FaHome as FaHouse,
  FaGraduationCap, FaPlane, FaHeart, FaPercentage, FaTrash, FaPlus,
  FaCheck, FaSlidersH, FaCoins
} from 'react-icons/fa';

const ProgressBar = ({ value, max, color }) => {
  return (
    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

// Icon mapping for goals
const goalIcons = {
  car: <FaCar className="text-xl" />,
  house: <FaHouse className="text-xl" />,
  education: <FaGraduationCap className="text-xl" />,
  vacation: <FaPlane className="text-xl" />,
  wedding: <FaHeart className="text-xl" />,
  default: <FaPiggyBank className="text-xl" />
};

const FuturePlans = () => {
  const {
    moneyInHand,
    futureGoalsCutoff,
    setFutureGoalsCutoff,
    remainingAfterAllocation,
    setRemainingAfterAllocation,
    selectedGoals,
    setSelectedGoals,
    totalGoalsCost,
    setTotalGoalsCost,
    goalsDisplayData
  } = useContext(BudgetContext);

  const [customGoalName, setCustomGoalName] = useState('');
  const [customGoalAmount, setCustomGoalAmount] = useState('');
  const [showAllocationPanel, setShowAllocationPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('goals');

  const predefinedGoals = [
    { id: 'car', name: 'Car', iconType: 'car', typicalAmount: 20000, color: 'bg-blue-400' },
    { id: 'house', name: 'House', iconType: 'house', typicalAmount: 50000, color: 'bg-purple-400' },
    { id: 'education', name: 'Education', iconType: 'education', typicalAmount: 30000, color: 'bg-green-400' },
    { id: 'vacation', name: 'Vacation', iconType: 'vacation', typicalAmount: 5000, color: 'bg-yellow-400' },
    { id: 'wedding', name: 'Wedding', iconType: 'wedding', typicalAmount: 20000, color: 'bg-pink-400' }
  ];

  useEffect(() => {
    const total = selectedGoals.reduce((sum, goal) => sum + goal.amount, 0);
    setTotalGoalsCost(total);
    setRemainingAfterAllocation(moneyInHand - futureGoalsCutoff);
  }, [selectedGoals, futureGoalsCutoff, moneyInHand, setRemainingAfterAllocation, setTotalGoalsCost]);

  const handleGoalSelect = (goal) => {
    const isSelected = selectedGoals.some(g => g.id === goal.id);
    if (!isSelected) {
      const newGoals = [...selectedGoals, {
        ...goal,
        amount: goal.typicalAmount,
        allocationPercent: selectedGoals.length === 0 ? 100 : 0,
        monthsNeeded: 0,
        monthlyAllocation: 0,
        completionPercent: 0
      }];
      setSelectedGoals(newGoals);
    }
  };

  const handleRemoveGoal = (goalId) => {
    const newGoals = selectedGoals.filter(goal => goal.id !== goalId);
    setSelectedGoals(newGoals);
  };

  const handleGoalAmountChange = (goalId, value) => {
    const amount = Math.max(0, Number(value) || 0);
    const newGoals = selectedGoals.map(goal =>
      goal.id === goalId ? { ...goal, amount } : goal
    );
    setSelectedGoals(newGoals);
  };

  const handleAllocationPercentChange = (goalId, value) => {
    const percent = Math.max(0, Math.min(100, Number(value) || 0));
    const newGoals = selectedGoals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, allocationPercent: percent };
      } else if (selectedGoals.length === 2) {
        return { ...goal, allocationPercent: 100 - percent };
      }
      return goal;
    });
    setSelectedGoals(newGoals);
  };

  const calculateMonthlyAllocation = (goal) => {
    return (futureGoalsCutoff * goal.allocationPercent / 100).toFixed(2);
  };

  const calculateMonthsNeeded = (goal) => {
    const monthlyAllocation = calculateMonthlyAllocation(goal);
    return monthlyAllocation > 0 ? Math.ceil(goal.amount / monthlyAllocation) : 0;
  };

  const handleAddCustomGoal = () => {
    if (customGoalName && customGoalAmount) {
      const newGoal = {
        id: `custom-${Date.now()}`,
        name: customGoalName,
        iconType: 'default',
        amount: Number(customGoalAmount),
        allocationPercent: selectedGoals.length === 0 ? 100 : 0,
        isCustom: true,
        color: 'bg-indigo-400',
        monthlyAllocation: 0,
        monthsNeeded: 0,
        completionPercent: 0
      };
      const newGoals = [...selectedGoals, newGoal];
      setSelectedGoals(newGoals);
      setCustomGoalName('');
      setCustomGoalAmount('');
    }
  };

  const handleAllocationChange = (e) => {
    const value = Math.min(Math.max(0, Number(e.target.value)), moneyInHand);
    const validValue = isNaN(value) ? 0 : value;
    setFutureGoalsCutoff(validValue);
    setRemainingAfterAllocation(moneyInHand - validValue);
  };

  const handlePercentageClick = (percent) => {
    const newAllocation = Math.min(moneyInHand * (percent / 100), moneyInHand);
    setFutureGoalsCutoff(newAllocation);
    setRemainingAfterAllocation(moneyInHand - newAllocation);
  };

  // Get icon for goal
  const getGoalIcon = (goal) => {
    return goalIcons[goal.iconType] || goalIcons.default;
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 h-full bg-gradient-to-b from-blue-600 to-purple-600 shadow-2xl flex flex-col justify-between py-6 px-4 fixed left-0 top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Future Planner
          </h2>
          <div className="space-y-2">
            {[
              { icon: <FaCalendarAlt />, text: "Monthly Organizer", path: "/monthly-organizer" },
              { icon: <FaListUl />, text: "Daily Organizer", path: "/DailyOrganizer" },
              { icon: <FaChartLine />, text: "Future Plans", path: "/FuturePlans", active: true }
            ].map((item) => (
              <Link to={item.path} key={item.text}>
                <button
                  className={`flex items-center space-x-3 p-3 w-full text-lg rounded-lg transition-all ${item.active ? 'bg-white bg-opacity-20 shadow-md' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { icon: <FaHome />, text: "Main Page", path: "/UserMainPage" },
            { icon: <FaCogs />, text: "Features", path: "/features" },
            { icon: <FaInfoCircle />, text: "About Us", path: "/about" }
          ].map((item) => (
            <Link to={item.path} key={item.text}>
              <button className="flex items-center space-x-3 p-3 w-full text-lg rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all">
                <span className="text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        {/* Dashboard Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Future Plans</h2>
          <p className="text-gray-600 mb-6">Visualize and plan your financial goals</p>
        </div>

        <div className="mt-6 p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaCoins className="mr-2 text-yellow-500" /> Budget Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                label: "Money in Hand", 
                value: moneyInHand.toFixed(2), 
                color: "text-blue-600",
                bg: "bg-blue-50",
                icon: <FaPiggyBank className="text-blue-400" />
              },
              { 
                label: "Goals Allocation", 
                value: futureGoalsCutoff.toFixed(2), 
                color: "text-purple-600",
                bg: "bg-purple-50",
                icon: <FaChartLine className="text-purple-400" />
              },
              { 
                label: "Remaining Balance", 
                value: remainingAfterAllocation.toFixed(2), 
                color: remainingAfterAllocation >= 0 ? "text-green-600" : "text-red-600",
                bg: remainingAfterAllocation >= 0 ? "bg-green-50" : "bg-red-50",
                icon: remainingAfterAllocation >= 0 ? 
                  <FaCheck className="text-green-400" /> : 
                  <FaInfoCircle className="text-red-400" />
              }
            ].map((item) => (
              <div
                key={item.label}
                className={`p-5 rounded-xl ${item.bg} border border-transparent hover:border-${item.color.split('-')[1]}-200 transition-all`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{item.label}</p>
                  {item.icon}
                </div>
                <p className={`text-2xl font-bold mt-2 ${item.color}`}>
                  ${item.value}
                </p>
                <ProgressBar 
                  value={item.label === "Money in Hand" ? moneyInHand : 
                         item.label === "Goals Allocation" ? futureGoalsCutoff : 
                         Math.abs(remainingAfterAllocation)} 
                  max={moneyInHand} 
                  color={`bg-${item.color.split('-')[1]}-400`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rest of the content */}
        <div className="mt-8 flex border-b border-gray-200">
          {['goals', 'savings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium relative ${activeTab === tab ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                  layoutId="tabIndicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'goals' ? (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {selectedGoals.length > 0 && (
                <motion.div
                  className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Your Selected Goals ({selectedGoals.length})
                    </h3>
                    <motion.button
                      className="flex items-center space-x-2 text-purple-500 hover:text-purple-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAllocationPanel(!showAllocationPanel)}
                    >
                      <FaSlidersH />
                      <span>{showAllocationPanel ? 'Hide Allocation' : 'Adjust Allocation'}</span>
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <AnimatePresence>
                      {selectedGoals.map((goal) => (
                        <motion.div
                          key={goal.id}
                          className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ y: -3 }}
                          layout
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className={`p-3 rounded-full ${goal.color} text-white`}>
                                {getGoalIcon(goal)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 text-lg">{goal.name}</h4>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                  <div>
                                    <label className="block text-sm text-gray-500 mb-1">Goal Amount</label>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-500">$</span>
                                      <input
                                        type="number"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                        value={goal.amount}
                                        onChange={(e) => handleGoalAmountChange(goal.id, e.target.value)}
                                        min="0"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm text-gray-500 mb-1">Time Required</label>
                                    <div className="p-2 bg-gray-50 rounded-lg text-center">
                                      {calculateMonthsNeeded(goal)} months
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="text-red-500 hover:text-red-700 p-2"
                              onClick={() => handleRemoveGoal(goal.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {showAllocationPanel && (
                            <motion.div
                              className="mt-4 pt-4 border-t border-gray-100"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Allocation Percentage
                                </label>
                                <span className="text-sm font-semibold text-purple-600">
                                  {goal.allocationPercent.toFixed(0)}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={goal.allocationPercent}
                                onChange={(e) => handleAllocationPercentChange(goal.id, e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span>100%</span>
                              </div>
                              <div className="mt-3 text-sm text-gray-600">
                                <span className="font-medium">Monthly Allocation:</span> ${calculateMonthlyAllocation(goal)}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 font-medium">Total Goals Cost</p>
                          <p className="text-xl font-bold text-blue-600">
                            ${totalGoalsCost.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 font-medium">Longest Goal Duration</p>
                          <p className="text-xl font-bold text-purple-600">
                            {Math.max(...selectedGoals.map(goal => calculateMonthsNeeded(goal)))} months
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Add Financial Goals
                </h3>

                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-600 mb-3">Common Goals</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {predefinedGoals.map((goal) => {
                      const isSelected = selectedGoals.some(g => g.id === goal.id);
                      return (
                        <motion.button
                          key={goal.id}
                          className={`p-4 rounded-xl flex flex-col items-center transition ${isSelected ? 'bg-green-100 border-2 border-green-500 shadow-inner' : 'bg-gray-100 hover:bg-gray-200 shadow-sm'}`}
                          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGoalSelect(goal)}
                          disabled={isSelected}
                          layout
                        >
                          <span className={`text-2xl mb-2 ${isSelected ? 'text-green-600' : 'text-purple-600'}`}>
                            {goalIcons[goal.iconType]}
                          </span>
                          <span className="font-medium text-gray-800">{goal.name}</span>
                          <span className="text-sm text-gray-500 mt-1">
                            ${goal.typicalAmount.toLocaleString()}
                          </span>
                          {isSelected && (
                            <span className="mt-1 text-green-500">
                              <FaCheck />
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-600 mb-3">Custom Goal</h4>
                  <div className="flex flex-col md:flex-row gap-3">
                    <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Goal name"
                      value={customGoalName}
                      onChange={(e) => setCustomGoalName(e.target.value)}
                    />
                    <input
                      type="number"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Amount ($0)"
                      value={customGoalAmount}
                      onChange={(e) => setCustomGoalAmount(e.target.value)}
                      min="0"
                    />
                    <motion.button
                      className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center"
                      whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddCustomGoal}
                      disabled={!customGoalName || !customGoalAmount}
                    >
                      <FaPlus className="mr-2" /> Add Goal
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <motion.div
                className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Monthly Savings Plan
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Total Monthly Allocation (Max: ${moneyInHand.toFixed(2)})
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        value={futureGoalsCutoff}
                        onChange={handleAllocationChange}
                        min="0"
                        max={moneyInHand}
                      />
                      <span className="absolute right-3 top-3 text-gray-400">$</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 mb-3">Quick Allocation</p>
                    <div className="flex flex-wrap gap-3">
                      {[10, 20, 30, 50, 75, 100].map((percent) => (
                        <motion.button
                          key={percent}
                          className={`px-4 py-2 rounded-xl flex items-center ${futureGoalsCutoff === Math.min(moneyInHand * (percent / 100), moneyInHand) ? 'bg-purple-100 text-purple-600 shadow-inner' : 'bg-blue-100 text-blue-600'}`}
                          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePercentageClick(percent)}
                        >
                          <FaPercentage className="mr-1" /> {percent}%
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedGoals.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-700 mb-3">Allocation Breakdown</h4>
                      <div className="space-y-3">
                        {selectedGoals.map((goal) => (
                          <div 
                            key={goal.id}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center space-x-2">
                                <span className={`p-2 rounded-full ${goal.color} text-white`}>
                                  {getGoalIcon(goal)}
                                </span>
                                <span className="font-medium">{goal.name}</span>
                              </div>
                              <span className="font-semibold">
                                ${calculateMonthlyAllocation(goal)}/mo
                              </span>
                            </div>
                            <ProgressBar 
                              value={goal.allocationPercent} 
                              max={100} 
                              color={goal.color}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all w-full shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Save Future Plan
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FuturePlans;