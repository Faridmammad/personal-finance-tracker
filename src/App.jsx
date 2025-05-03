import React, { useEffect, useState } from 'react';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import TransactionFilter from './components/TransactionFilter';
import Chart from './components/Chart';
import Balance from './components/Balance'; // yeni əlavə

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedMonth === "all") return true;
    const txMonth = new Date(tx.date).getMonth() + 1;
    return txMonth === parseInt(selectedMonth);
  });

  return (
    <div className="container">
      <h1>💸 Personal Finance Tracker</h1>
      <AddTransaction onAdd={handleAdd} />
      <Balance transactions={transactions} /> 
      <TransactionFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <Chart data={filteredTransactions} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default App;
