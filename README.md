# Expense Tracker CLI

## Description
Sample solution for the [Expense Tracker challenge](https://roadmap.sh/projects/expense-tracker) from [roadmap.sh](https://roadmap.sh).

## Prerequisites
- Node.js (version 12 or later).

## Installation
```bash
# Clone this repository
git clone [<repository_url>
](https://github.com/jibarram/Backend-ExpenseTracker)
# Navigate to the project directory
cd [<project_directory>](Backend-ExpenseTracker)

# Install dependencies
npm install
```

### Required Packages
Ensure the following package is installed:
```bash
# Install yargs if not already installed
npm install yargs
```

## Usage
Run the application using the `node` command followed by the main file (`expense-tracker.js`) and one of the available commands.

### Commands

#### Add an expense
```bash
node expense-tracker.js add --description "Description" --amount Amount [--category "Category"]
```
Example:
```bash
node expense-tracker.js add --description "Dinner" --amount 25 --category "Food"
```

#### List all expenses
```bash
node expense-tracker.js list
```

#### Delete an expense by ID
```bash
node expense-tracker.js delete --id ID
```
Example:
```bash
node expense-tracker.js delete --id 1
```

#### Update an expense by ID
```bash
node expense-tracker.js update --id ID [--description "New description"] [--amount NewAmount] [--category "New category"]
```
Example:
```bash
node expense-tracker.js update --id 1 --amount 30
```

#### View expense summary
```bash
node expense-tracker.js summary [--month Month]
```
Example:
```bash
node expense-tracker.js summary
node expense-tracker.js summary --month 1
```

#### Export expenses to CSV
```bash
node expense-tracker.js export
```

### Notes
- Expenses are stored in the `expenses.json` file in the project directory.
- Exporting data generates an `expenses.csv` file in the same directory.


