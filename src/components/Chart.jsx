import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE', '#FF6666'];

const Chart = ({ data }) => {
  const categorySums = data.reduce((acc, tx) => {
    const category = tx.category || "Other";
    acc[category] = (acc[category] || 0) + parseFloat(tx.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categorySums).map((category) => ({
    name: category,
    value: categorySums[category],
  }));

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h3>Expenses by Category</h3>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart;
