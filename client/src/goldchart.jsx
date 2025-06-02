import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const goldMultipliers = {
  hp: 2.67,
  hpregen: 3,
  mp: 1,
  mpregen: 4,
  armor: 20,
  spellblock: 20,
  attackdamage: 35,
  attackspeed: 25,
  movespeed: 12,
};

function calculateGoldValue(stat, base, growth, level) {
  const value = base + growth * (level - 1);
  return (value * goldMultipliers[stat]) || 0;
}

export default function GoldChart({ championName }) {
  const [goldData, setGoldData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!championName) return;
    axios.get(`https://lol-champlvl-calc.onrender.com/${championName}`)
      .then(res => {
        const stats = res.data.data[championName].stats;
        const levels = Array.from({ length: 18 }, (_, i) => i + 1);

        const goldPerLevel = levels.map(level => {
          let total = 0;
          for (let key in stats) {
            const base = stats[key];
            const growth = stats[`${key}perlevel`] || 0;
            total += calculateGoldValue(key, base, growth, level);
          }
          return { level, gold: Math.round(total) };
        });

        setGoldData(goldPerLevel);
        setError(null);
      })
      .catch(() => setError('Could not fetch champion data.'));
  }, [championName]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
  <div>
    <h2 className="text-lg font-semibold mb-2">Gold Value per Level for {championName}</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={goldData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="gold" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}