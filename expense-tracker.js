const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const dataFilePath = path.join(__dirname, 'expenses.json');

const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

yargs.command({
    command: 'add',
    describe: 'Add a new expense',
    builder: {
        description: {
            describe: 'Expense description',
            demandOption: true,
            type: 'string',
        },
        amount: {
            describe: 'Expense amount',
            demandOption: true,
            type: 'number',
        },
        category: {
            describe: 'Expense category',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        const expenses = readData();
        const newExpense = {
            id: expenses.length + 1,
            date: new Date().toISOString().split('T')[0],
            description: argv.description,
            amount: argv.amount,
            category: argv.category || 'Uncategorized',
        };
        expenses.push(newExpense);
        writeData(expenses);
        console.log(`Expense added successfully (ID: ${newExpense.id})`);
    },
});

yargs.command({
    command: 'list',
    describe: 'List all expenses',
    handler() {
        const expenses = readData();
        console.table(expenses);
    },
});

yargs.command({
    command: 'delete',
    describe: 'Delete an expense by ID',
    builder: {
        id: {
            describe: 'Expense ID',
            demandOption: true,
            type: 'number',
        },
    },
    handler(argv) {
        let expenses = readData();
        const initialLength = expenses.length;
        expenses = expenses.filter((expense) => expense.id !== argv.id);
        if (expenses.length === initialLength) {
            console.log('No expense found with the given ID.');
        } else {
            writeData(expenses);
            console.log('Expense deleted successfully');
        }
    },
});

yargs.command({
    command: 'summary',
    describe: 'View a summary of expenses',
    builder: {
        month: {
            describe: 'Month for the summary (1-12)',
            demandOption: false,
            type: 'number',
        },
    },
    handler(argv) {
        const expenses = readData();
        const filteredExpenses = argv.month
            ? expenses.filter(
                  (expense) =>
                      new Date(expense.date).getMonth() + 1 === argv.month
              )
            : expenses;
        const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        if (argv.month) {
            console.log(`Total expenses for month ${argv.month}: $${total}`);
        } else {
            console.log(`Total expenses: $${total}`);
        }
    },
});

yargs.command({
    command: 'update',
    describe: 'Update an expense by ID',
    builder: {
        id: {
            describe: 'Expense ID',
            demandOption: true,
            type: 'number',
        },
        description: {
            describe: 'New description',
            demandOption: false,
            type: 'string',
        },
        amount: {
            describe: 'New amount',
            demandOption: false,
            type: 'number',
        },
        category: {
            describe: 'New category',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        const expenses = readData();
        const expense = expenses.find((expense) => expense.id === argv.id);
        if (!expense) {
            console.log('No expense found with the given ID.');
            return;
        }
        if (argv.description) expense.description = argv.description;
        if (argv.amount) expense.amount = argv.amount;
        if (argv.category) expense.category = argv.category;
        writeData(expenses);
        console.log('Expense updated successfully');
    },
});

yargs.command({
    command: 'export',
    describe: 'Export expenses to a CSV file',
    handler() {
        const expenses = readData();
        const csvData = [
            'ID,Date,Description,Amount,Category',
            ...expenses.map(
                (expense) =>
                    `${expense.id},${expense.date},${expense.description},${expense.amount},${expense.category}`
            ),
        ].join('\n');
        const exportPath = path.join(__dirname, 'expenses.csv');
        fs.writeFileSync(exportPath, csvData, 'utf-8');
        console.log(`Expenses exported successfully to ${exportPath}`);
    },
});

yargs.parse();
