// Simple Node.js server for calculator operations
import express from 'express'
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { num1, num2, operator } = req.body;
    let result;
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (operator) {
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
            result = b !== 0 ? a / b : 'Error: Division by zero';
            break;
        default:
            result = 'Invalid operator';
    }
    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Calculator server running on http://localhost:${PORT}`);
});
