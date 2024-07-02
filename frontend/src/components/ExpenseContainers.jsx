import ExpenseContainer from "./ExpenseContainer"

function ExpenseContainers({ top_expenses_data }) {
    return(
        <div className="expense-containers-container">
            {top_expenses_data.map(top_expense_data => (
                    <ExpenseContainer key={top_expense_data.id} topExpenseCategory={top_expense_data.transaction_category} topExpenseValue={top_expense_data.amount}/>
                ))
            }
        </div>


    )
}
export default ExpenseContainers