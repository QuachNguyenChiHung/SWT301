Feature('Calculator API');

Scenario('Addition: 5 + 3 = 8', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '5', num2: '3', operator: '+' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 8 });
});

Scenario('Subtraction: 10 - 4 = 6', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '10', num2: '4', operator: '-' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 6 });
});

Scenario('Multiplication: 2.5 * 4.2 = 10.5', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '2.5', num2: '4.2', operator: '*' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 10.5 });
});

Scenario('Division: 15 / 3 = 5', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '15', num2: '3', operator: '/' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 5 });
});

Scenario('Division by zero', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '7', num2: '0', operator: '/' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 'Error: Division by zero' });
});

Scenario('Invalid operator', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '7', num2: '3', operator: '%' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 'Invalid operator' });
});

Scenario('Add negative and positive numbers', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '-5', num2: '8', operator: '+' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: 3 });
});

Scenario('Subtract negative numbers', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '-10', num2: '-5', operator: '-' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: -5 });
});

Scenario('Missing num2', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: '10', operator: '+' });
    I.seeResponseCodeIs(200);
    // Server trả NaN vì parseFloat(undefined) là NaN
    I.seeResponseContainsJson({ result: NaN });
});

Scenario('Non-numeric input', async ({ I }) => {
    I.sendPostRequest('/calculate', { num1: 'abc', num2: '2', operator: '+' });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ result: NaN });
});
