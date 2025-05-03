import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE', '#FF6666'];

const Chart = ({ data }) => {
  const categorySums = data.reduce((acc, tx) => {
    const category = tx.category || "Other";
    const value = parseFloat(tx.amount);
    if (value > 0) {
      acc[category] = (acc[category] || 0) + value;
    }
    return acc;
  }, {});

  const chartData = Object.keys(categorySums).map((category) => ({
    name: category,
    value: categorySums[category],
  }));

  // Əgər heç bir data yoxdursa
  if (chartData.length === 0) {
    return <p style={{ textAlign: 'center' }}>No data to display for this month.</p>;
  }

  // Ən kiçik pie parçaları üçün 10% dəyəri limit qoyuruq
  const smallPieThreshold = 0.1;  // 10% limit

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
          labelLine={false}
          label={(entry) => {
            // Əgər dəyər 10%-dən böyükdürsə, labeli göstəririk
            return entry.value / chartData.reduce((acc, curr) => acc + curr.value, 0) > smallPieThreshold
              ? entry.name
              : ''; // Kiçik parçalar üçün boş göstərin
          }}
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
