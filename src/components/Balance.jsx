import '../styles/main.scss';

const Balance = ({ transactions }) => {
    const amounts = transactions.map((t) => t.amount);
    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  
    return (
      <div className="balance">
        <h2>Balance</h2>
        <p>${total}</p>
      </div>
    );
  };
  
  export default Balance;
  