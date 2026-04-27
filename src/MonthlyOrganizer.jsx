import React, { useContext, useState, useEffect } from "react";
import { BudgetContext } from "./BudgetContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, FaListUl, FaChartLine, FaHome, FaCogs, FaInfoCircle,
  FaMoneyBillWave, FaCoins, FaTrash
} from "react-icons/fa";
import './App.css';

const MonthlyOrganizer = () => {
  const { 
    budget,
    setBudget,
    bills,
    incomes,
    monthlyData,
    saveMonthlyData,
    updateBillAmount,
    updateIncomeAmount
  } = useContext(BudgetContext);

  const [month, setMonth] = useState("");
  const [billDueDates, setBillDueDates] = useState({});
  const [incomeDates, setIncomeDates] = useState({});
  const [error, setError] = useState("");

  // Get current month & disable past months
  const today = new Date();
  const minMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  // Calculate remaining budget
  const totalBills = bills.reduce((acc, bill) => acc + (Number(bill.amount) || 0), 0);
  const totalIncome = incomes.reduce((acc, income) => acc + (Number(income.amount) || 0), 0);
  const remainingBudget = (Number(budget) || 0) + totalIncome - totalBills;

  // Handle input changes
  const handleBillChange = (billName, value) => {
    const amount = Number(value);
    if (amount < 0) {
      setError("Bill amount cannot be negative.");
      return;
    }
    setError("");
    updateBillAmount(billName, amount);
  };

  const handleIncomeChange = (incomeName, value) => {
    const amount = Number(value);
    if (amount < 0) {
      setError("Income amount cannot be negative.");
      return;
    }
    setError("");
    updateIncomeAmount(incomeName, amount);
  };

  // Handle date selection
  const handleBillDueDateChange = (bill, date) => {
    if (!month) {
      setError("Please select a month first.");
      return;
    }

    const selectedMonth = new Date(month).getMonth();
    const selectedYear = new Date(month).getFullYear();
    const inputDate = new Date(date);

    if (inputDate.getMonth() !== selectedMonth || inputDate.getFullYear() !== selectedYear) {
      setError("Bill date must be within the selected month.");
      return;
    }

    setError("");
    setBillDueDates({ ...billDueDates, [bill]: date });
  };

  const handleIncomeDateChange = (income, date) => {
    if (!month) {
      setError("Please select a month first.");
      return;
    }

    const selectedMonth = new Date(month).getMonth();
    const selectedYear = new Date(month).getFullYear();
    const inputDate = new Date(date);

    if (inputDate.getMonth() !== selectedMonth || inputDate.getFullYear() !== selectedYear) {
      setError("Income date must be within the selected month.");
      return;
    }

    setError("");
    setIncomeDates({ ...incomeDates, [income]: date });
  };

  // Date helpers
  const getMinDueDate = () => month ? `${month}-01` : "";
  const getMaxDueDate = () => {
    if (!month) return "";
    const lastDay = new Date(month.split("-")[0], month.split("-")[1], 0).getDate();
    return `${month}-${lastDay}`;
  };

  // Generate calendar
  const generateCalendar = () => {
    if (!month) return [];

    const year = new Date(month).getFullYear();
    const monthIndex = new Date(month).getMonth();
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
          const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const billsOnDay = bills.filter(bill => billDueDates[bill.name] === date);
          const incomesOnDay = incomes.filter(income => incomeDates[income.name] === date);
          week.push({ day, date, bills: billsOnDay, incomes: incomesOnDay });
          day++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  // Save monthly plan
  const saveMonthlyPlan = () => {
    if (!month) {
      setError("Please select a month first.");
      return;
    }

    const monthlyPlan = {
      month,
      budget,
      bills: bills.map(bill => ({
        name: bill.name,
        amount: bill.amount || 0,
        dueDate: billDueDates[bill.name] || ""
      })),
      incomes: incomes.map(income => ({
        name: income.name,
        amount: income.amount || 0,
        date: incomeDates[income.name] || ""
      })),
      remainingBudget
    };

    saveMonthlyData(month, monthlyPlan);
    alert("Monthly plan saved successfully!");
  };

  // Load saved data when month changes
  useEffect(() => {
    if (month && monthlyData[month]) {
      const savedData = monthlyData[month];
      const newBillDueDates = {};
      const newIncomeDates = {};

      savedData.bills.forEach(bill => {
        if (bill.dueDate) newBillDueDates[bill.name] = bill.dueDate;
      });

      savedData.incomes.forEach(income => {
        if (income.date) newIncomeDates[income.name] = income.date;
      });

      setBillDueDates(newBillDueDates);
      setIncomeDates(newIncomeDates);
    } else {
      setBillDueDates({});
      setIncomeDates({});
    }
  }, [month, monthlyData]);

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
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Monthly Organizer</h2>
        
        {/* Month Selection */}
        <div className="mt-4 p-6 bg-white shadow-lg rounded-xl">
          <label className="text-lg font-semibold text-gray-700">Select Month:</label>
          <input
            type="month"
            className="p-2 mt-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={minMonth}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        {/* Budget & Remaining Value */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <div className="text-lg font-semibold text-gray-700">
            <span>Monthly Budget:</span>
            <span className="text-blue-600 font-bold ml-2">${budget || "Not Set"}</span>
          </div>
          <div className={`text-lg font-semibold mt-2 ${remainingBudget < 0 ? "text-red-600" : "text-green-600"}`}>
            <span>Remaining Budget:</span>
            <span className="font-bold ml-2">${remainingBudget.toFixed(2)}</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${totalBills.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-purple-600">${(Number(budget) || 0 + totalIncome - totalBills).toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded-lg ${(totalIncome - totalBills) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-gray-600">Net Total</p>
              <p className={`text-2xl font-bold ${(totalIncome - totalBills) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalIncome - totalBills).toFixed(2)}
              </p>
              <p className={`text-sm font-semibold ${(totalIncome - totalBills) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(totalIncome - totalBills) >= 0 ? 'POSITIVE NET TOTAL' : 'NEGATIVE NET TOTAL'}
              </p>
            </div>
          </div>
        </div>

        {/* Bills Section */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Bills</h3>
          {bills.length === 0 ? (
            <p className="text-gray-500 mt-2">No bills selected.</p>
          ) : (
            <table className="w-full mt-2 border border-gray-200 shadow-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Bill</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Due Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
                    <td className="p-2">{bill.name}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={bill.amount || ""}
                        onChange={(e) => handleBillChange(bill.name, e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={getMinDueDate()}
                        max={getMaxDueDate()}
                        value={billDueDates[bill.name] || ""}
                        onChange={(e) => handleBillDueDateChange(bill.name, e.target.value)}
                        disabled={!month}
                      />
                    </td>
                    <td className="p-2">
                      <motion.button
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          const newDueDates = {...billDueDates};
                          delete newDueDates[bill.name];
                          setBillDueDates(newDueDates);
                        }}
                      >
                        <FaTrash />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Income Section */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Income Sources</h3>
          {incomes.length === 0 ? (
            <p className="text-gray-500 mt-2">No income sources selected.</p>
          ) : (
            <table className="w-full mt-2 border border-gray-200 shadow-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Income Source</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
                    <td className="p-2">{income.name}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={income.amount || ""}
                        onChange={(e) => handleIncomeChange(income.name, e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={getMinDueDate()}
                        max={getMaxDueDate()}
                        value={incomeDates[income.name] || ""}
                        onChange={(e) => handleIncomeDateChange(income.name, e.target.value)}
                        disabled={!month}
                      />
                    </td>
                    <td className="p-2">
                      <motion.button
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          const newIncomeDates = {...incomeDates};
                          delete newIncomeDates[income.name];
                          setIncomeDates(newIncomeDates);
                        }}
                      >
                        <FaTrash />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Calendar Section */}
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Calendar</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {generateCalendar().map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`p-2 border border-gray-200 rounded-lg transition ${
                    day?.bills.length > 0
                      ? "bg-red-50 hover:bg-red-100"
                      : day?.incomes.length > 0
                      ? "bg-green-50 hover:bg-green-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {day ? (
                    <>
                      <div className="text-gray-700 font-semibold">{day.day}</div>
                      {day.bills.map((bill) => (
                        <div key={bill.name} className="text-sm text-red-600 flex items-center space-x-1">
                          <FaMoneyBillWave className="inline-block" />
                          <span>{bill.name}: ${bill.amount}</span>
                        </div>
                      ))}
                      {day.incomes.map((income) => (
                        <div key={income.name} className="text-sm text-green-600 flex items-center space-x-1">
                          <FaCoins className="inline-block" />
                          <span>{income.name}: ${income.amount}</span>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveMonthlyPlan}
        >
          Save Monthly Plan
        </motion.button>

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

export default MonthlyOrganizer;