// Root React Component (client/src/App.jsx)
import { useState } from 'react';
import GoldChart from './goldchart';

export default function App() {
  const [champion, setChampion] = useState('Sona');

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Champion Level Gold Value Viewer</h1>
      <input
        type="text"
        value={champion}
        onChange={(e) => setChampion(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Enter Champion Name (e.g. Sona)"
      />
      <GoldChart championName={champion} />
    </div>
  );
}
