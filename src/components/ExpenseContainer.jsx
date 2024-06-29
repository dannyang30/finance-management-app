function ExpenseContainer(props) {
    return(
        <div className="expense-container">
            <span>{props.topExpenseCategory}</span>
            <span>{props.topExpenseValue}</span>
        </div>
    )
}
export default ExpenseContainer