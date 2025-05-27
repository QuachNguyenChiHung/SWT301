// Simple Node.js server for calculator operations
import express from 'express'
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  try {
    const { num1, num2, operation } = req.body;

    // Input validation
    if (num1 === undefined || num2 === undefined || !operation) {
      return res.status(400).json({
        error: 'Missing required parameters (num1, num2, operation)'
      });
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    let result;

    switch (operation) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) {
          return res.status(400).json({ error: 'Cannot divide by zero' });
        }
        result = a / b;
        break;
      default:
        return res.status(400).json({
          error: 'Invalid operation. Use add, subtract, multiply, or divide'
        });
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Calculator server running on http://localhost:${PORT}`);
});
