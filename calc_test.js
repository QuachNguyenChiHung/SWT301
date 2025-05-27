Feature('Calculator API');

Scenario('Addition: 5 + 3 = 8', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '5', num2: '3', operation: '+' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 8 });
});

Scenario('Subtraction: 10 - 4 = 6', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '10', num2: '4', operation: '-' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 6 });
});

Scenario('Multiplication: 2.5 * 4.2 = 10.5', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '2.5', num2: '4.2', operation: '*' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 10.5 });
});

Scenario('Division: 15 / 3 = 5', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '15', num2: '3', operation: '/' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 5 });
});

Scenario('Division by zero', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '7', num2: '0', operation: '/' });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({ error: 'Cannot divide by zero' });
});

Scenario('Invalid operator', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '7', num2: '3', operation: '%' });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({ error: 'Invalid operation. Use add, subtract, multiply, or divide' });
});

Scenario('Add negative and positive numbers', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '-5', num2: '8', operation: '+' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 3 });
});

Scenario('Subtract negative numbers', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '-10', num2: '-5', operation: '-' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: -5 });
});

Scenario('Missing num2', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '10', operation: '+' });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({ error: 'Missing required parameters (num1, num2, operation)' });
});

Scenario('Non-numeric input', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: 'abc', num2: '2', operation: '*' });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({ error: 'Invalid numbers provided' });
});

Scenario('Missing all parameters', async ({ I }) => {
    I.sendPostRequest('/calculate', {});
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({ error: 'Missing required parameters (num1, num2, operation)' });
});

Scenario('Server error simulation', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: null, num2: null, operation: null });
    // This test expects some kind of error response, either client or server error
    I.seeResponseCodeIsClientError();
});
