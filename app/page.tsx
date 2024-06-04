// pages/index.js
"use client";
import { useState } from 'react';
import { CustomInput } from './CommonComponent/Input/CustomInput';

interface ResultProps {
  age: number;
  gender: string;
  country: string[];
}

export default function Home() {
  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<ResultProps|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|string>(null);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`).then((res) => res.json()),
        fetch(`https://api.genderize.io?name=${name}`).then((res) => res.json()),
        fetch(`https://api.nationalize.io?name=${name}`).then((res) => res.json()),
      ]);
      setResult({
        age: responses[0].age,
        gender: responses[1].gender,
        country: responses[2].country,
      });
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Guess Age, Gender, and Country</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter name"/>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Guess'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h2>Results for {name}</h2>
          <p>Age: {result.age}</p>
          <p>Gender: {result.gender}</p>
          <p>Country: {result.country.map(c => c.country_id).join(', ')}</p>
        </div>
      )}
    </div>
  );
}
