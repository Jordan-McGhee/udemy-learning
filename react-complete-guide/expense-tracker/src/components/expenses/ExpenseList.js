import { useState } from 'react';

import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"
import ExpensesFilter from "../ExpenseFilter/ExpenseFilter"
import Card from "../ui/Card"

const ExpenseList = (props) => {

    const [ chosenYear, setChosenYear ] = useState("2022")

    const filterChangeHandler = (selectedYear) => {
        console.log(selectedYear)
        setChosenYear(selectedYear)
    }

    return (
        
        <Card className="expenses">

            <ExpensesFilter selectedYear = { chosenYear } onChangeFilter = { filterChangeHandler } />

            {/* EXPENSE ITEMS */}
            <ExpenseItem
            title={props.expenses[0].title}
            amount={props.expenses[0].amount}
            date={props.expenses[0].date}
            />

            <ExpenseItem
            title={props.expenses[1].title}
            amount={props.expenses[1].amount}
            date={props.expenses[1].date}
            />

            <ExpenseItem
            title={props.expenses[2].title}
            amount={props.expenses[2].amount}
            date={props.expenses[2].date}
            />

            <ExpenseItem
            title={props.expenses[3].title}
            amount={props.expenses[3].amount}
            date={props.expenses[3].date}
            />

        </Card>
    )
}

export default ExpenseList