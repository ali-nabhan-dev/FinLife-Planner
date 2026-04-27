import React, { createContext, useState, useEffect, useMemo } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  // Main state
  const [budget, setBudget] = useState('');
  const [bills, setBills] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [dailyPlans, setDailyPlans] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [futureGoalsCutoff, setFutureGoalsCutoff] = useState(0);
  const [remainingAfterAllocation, setRemainingAfterAllocation] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [totalGoalsCost, setTotalGoalsCost] = useState(0);
  const [goalsDisplayData, setGoalsDisplayData] = useState([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem('budgetAppData')) || {};
      setBudget(savedData.budget || '');
      setBills(savedData.bills || []);
      setIncomes(savedData.incomes || []);
      setMonthlyData(savedData.monthlyData || {});
      setDailyPlans(savedData.dailyPlans || []);
      setSelectedMonth(savedData.selectedMonth || '');
      setFutureGoalsCutoff(savedData.futureGoalsCutoff || 0);
      setRemainingAfterAllocation(savedData.remainingAfterAllocation || 0);
      setSelectedGoals(savedData.selectedGoals || []);
      setTotalGoalsCost(savedData.totalGoalsCost || 0);
    } catch (e) {
      console.error("Failed to load saved data", e);
    }
  }, []);

  // Calculate goals display data whenever selectedGoals or futureGoalsCutoff changes
  useEffect(() => {
    const updatedGoalsDisplay = selectedGoals.map(goal => {
      const monthlyAllocation = (futureGoalsCutoff * goal.allocationPercent / 100) || 0;
      const monthsNeeded = monthlyAllocation > 0 ? Math.ceil(goal.amount / monthlyAllocation) : 0;
      
      return {
        ...goal,
        monthlyAllocation,
        monthsNeeded,
        completionPercent: Math.min(100, ((monthlyAllocation * monthsNeeded) / goal.amount) * 100) || 0
      };
    });
    
    setGoalsDisplayData(updatedGoalsDisplay);
  }, [selectedGoals, futureGoalsCutoff]);

  // Save to localStorage
  useEffect(() => {
    const dataToSave = {
      budget,
      bills,
      incomes,
      monthlyData,
      dailyPlans,
      selectedMonth,
      futureGoalsCutoff,
      remainingAfterAllocation,
      selectedGoals,
      totalGoalsCost
    };
    
    const safeData = {
      ...dataToSave,
      bills: dataToSave.bills.map(bill => ({ ...bill })),
      incomes: dataToSave.incomes.map(income => ({ ...income })),
      selectedGoals: dataToSave.selectedGoals.map(goal => ({
        ...goal,
        icon: undefined,
        id: goal.id,
        name: goal.name,
        amount: goal.amount,
        allocationPercent: goal.allocationPercent,
        monthsNeeded: goal.monthsNeeded,
        isCustom: goal.isCustom,
        color: goal.color,
        typicalAmount: goal.typicalAmount
      }))
    };
    
    localStorage.setItem('budgetAppData', JSON.stringify(safeData));
  }, [
    budget, 
    bills, 
    incomes, 
    monthlyData, 
    dailyPlans, 
    selectedMonth,
    futureGoalsCutoff, 
    remainingAfterAllocation,
    selectedGoals,
    totalGoalsCost
  ]);

  // Update selected goals and calculate total cost
  const updateSelectedGoals = (newGoals) => {
    const goalsWithoutIcons = newGoals.map(goal => ({
      ...goal,
      icon: undefined
    }));
    setSelectedGoals(goalsWithoutIcons);
    const total = newGoals.reduce((sum, goal) => sum + goal.amount, 0);
    setTotalGoalsCost(total);
  };

  // Bill operations
  const addBill = (name) => {
    setBills(prev => [...prev, { name, amount: 0 }]);
  };

  const updateBillAmount = (name, amount) => {
    const parsedAmount = Math.max(0, Number(amount) || 0);
    setBills(prev => prev.map(bill => 
      bill.name === name ? { ...bill, amount: parsedAmount } : bill
    ));
  };

  const removeBill = (name) => {
    setBills(prev => prev.filter(bill => bill.name !== name));
  };

  // Income operations
  const addIncome = (name) => {
    setIncomes(prev => [...prev, { name, amount: 0 }]);
  };

  const updateIncomeAmount = (name, amount) => {
    const parsedAmount = Math.max(0, Number(amount) || 0);
    setIncomes(prev => prev.map(income => 
      income.name === name ? { ...income, amount: parsedAmount } : income
    ));
  };

  const removeIncome = (name) => {
    setIncomes(prev => prev.filter(income => income.name !== name));
  };

  // Monthly data operations
  const saveMonthlyData = (month, data) => {
    setMonthlyData(prev => ({
      ...prev,
      [month]: data
    }));
    setSelectedMonth(month);
  };

  // Daily plan operations
  const saveDailyPlan = (plan) => {
    setDailyPlans(prev => [
      ...prev.filter(p => p.date !== plan.date),
      plan
    ]);
  };

  // Calculation functions
  const calculateCurrentTotals = useMemo(() => {
    return () => {
      const totalIncome = incomes.reduce((acc, income) => acc + (Number(income.amount) || 0), 0);
      const totalExpenses = bills.reduce((acc, bill) => acc + (Number(bill.amount) || 0), 0);
      const netTotal = totalIncome - totalExpenses;
      const moneyInHand = (Number(budget) || 0) + netTotal;
      const remaining = moneyInHand - futureGoalsCutoff;

      return {
        totalIncome,
        totalExpenses,
        netTotal,
        moneyInHand,
        remaining
      };
    };
  }, [budget, bills, incomes, futureGoalsCutoff]);

  const calculateMonthlyRemaining = useMemo(() => {
    return () => {
      if (!selectedMonth || !monthlyData[selectedMonth]) return 0;
      
      const monthData = monthlyData[selectedMonth];
      const totalBills = monthData.bills?.reduce((sum, bill) => sum + (bill.amount || 0), 0) || 0;
      const totalIncomes = monthData.incomes?.reduce((sum, income) => sum + (income.amount || 0), 0) || 0;
      
      return (monthData.budget || 0) + totalIncomes - totalBills - futureGoalsCutoff;
    };
  }, [selectedMonth, monthlyData, futureGoalsCutoff]);

  // Update remaining after allocation when moneyInHand or cutoff changes
  useEffect(() => {
    const { moneyInHand } = calculateCurrentTotals();
    setRemainingAfterAllocation(moneyInHand - futureGoalsCutoff);
  }, [futureGoalsCutoff, calculateCurrentTotals]);

  // Context value
  const contextValue = {
    // State values
    budget,
    bills,
    incomes,
    monthlyData,
    dailyPlans,
    selectedMonth,
    futureGoalsCutoff,
    remainingAfterAllocation,
    selectedGoals,
    totalGoalsCost,
    goalsDisplayData,
    
    // Derived values
    moneyInHand: calculateCurrentTotals().moneyInHand,
    monthlyRemaining: calculateMonthlyRemaining(),
    
    // State setters
    setBudget,
    setSelectedMonth,
    setFutureGoalsCutoff,
    setRemainingAfterAllocation,
    setSelectedGoals: updateSelectedGoals,
    setTotalGoalsCost,
    
    // Bill functions
    addBill,
    updateBillAmount,
    removeBill,
    
    // Income functions
    addIncome,
    updateIncomeAmount,
    removeIncome,
    
    // Data operations
    saveMonthlyData,
    saveDailyPlan,
    setDailyPlans,
    
    // Calculations
    calculateCurrentTotals,
    calculateMonthlyRemaining
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
};