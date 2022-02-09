import { useState } from 'react';

import "./Expenses.css"
import ExpensesFilter from '../ExpenseFilter/ExpenseFilter';
import Card from "../ui/Card"
import ExpensesList from './ExpensesList';

const Expenses = (props) => {

    const [ chosenYear, setChosenYear ] = useState("2022")

    const filterChangeHandler = (selectedYear) => {
        console.log(selectedYear)
        setChosenYear(selectedYear)
    }

    const filteredExpenses = props.expenses.filter(expense => {
        return expense.date.getFullYear().toString() === chosenYear
    })


    return (
        
        <Card className="expenses">

            <ExpensesFilter selectedYear = { chosenYear } onChangeFilter = { filterChangeHandler } />

            {/* EXPENSE ITEMS */}

            <ExpensesList expenses = { filteredExpenses } />

            {/* old map method to display all expenses */}
            {/* { props.expenses.map(expense => 
                <ExpenseItem
                    key = { expense.id }
                    title = { expense.title }
                    amount = { expense.amount }
                    date = { expense.date }
                />
            )} */}

        </Card>
    )
}

export default Expenses