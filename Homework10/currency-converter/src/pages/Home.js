// src/pages/Home.js
import React, { useContext } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import CurrencyConverter from '../CurrencyConverter';

const Home = () => {
  const { history } = useContext(HistoryContext);

  return (
    <div>
      <CurrencyConverter />
      <h2>Last 10 Conversions</h2>
      <ul>
        {history.slice(0, 10).map((conversion, index) => (
          <li key={index}>
            {conversion.amount} {conversion.from} = {conversion.convertedAmount} {conversion.to} at rate {conversion.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
