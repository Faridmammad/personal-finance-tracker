import React from 'react';
import '../styles/_components.scss';
import '../styles/main.scss';

const categoryColors = {
  "Food": "#4caf50",
  "Transport": "#f44336",
  "Entertainment": "#2196f3",
  "Clothes": "#ff9800",
  "Utilities": "#9c27b0",
  "Other": "#607d8b"
};

const TransactionList = ({ transactions }) => {
  return (
    <ul className="transaction-list">
      {transactions.map((tx) => {
        const formattedDate = new Date(tx.date).toLocaleDateString('en-GB'); // dd/mm/yyyy format
        return (
          <li key={tx.id}>
            <span
              className="dot"
              style={{ backgroundColor: categoryColors[tx.category] || '#999' }}
            ></span>
            <div className="transaction-details">
              <div>
                <strong>{tx.text}</strong> ({tx.category})  
              </div>
              <div className="date">{formattedDate}</div>
            </div>
            <span className={tx.amount > 0 ? 'plus' : 'minus'}>
              {tx.amount > 0 ? '+' : ''}
              {tx.amount} €
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
