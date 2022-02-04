import "./ExpenseItem.css"

function ExpenseItem () {
    return(
        <div className="expense-item">

            <div>
                Date
            </div>

            <div className="expense-item__description">
                <h2>Title</h2>

                <div className="expense-item__price">
                    <h2>Amount</h2>
                </div>

            </div>

        </div>
    )
}

export default ExpenseItem