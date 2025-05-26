import { useState } from 'react'
import './App.css'

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const response = await fetch('http://localhost:3001/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2, operator })
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <form onSubmit={calculate}>
        <input
          type="number"
          value={num1}
          onChange={e => setNum1(e.target.value)}
          placeholder="First number"
          required
        />
        <select value={operator} onChange={e => setOperator(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={e => setNum2(e.target.value)}
          placeholder="Second number"
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <div className="result">Result: {result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App
