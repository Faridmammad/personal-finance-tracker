import React, { useState } from 'react';
import '../styles/main.scss';

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [type, setType] = useState('outcome'); // yeni state

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: type === 'income' ? +amount : -Math.abs(amount), // income plus, outcome minus
      category,
      date: new Date().toISOString()
    };

    onAdd(newTransaction);

    setText('');
    setAmount('');
    setCategory('Other');
    setType('outcome');
  };

  return (
    <form className="add-transaction" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Note (ex: Market)"
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Clothes">Clothes</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="outcome">Outcome</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTransaction;
