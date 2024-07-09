import ExpenseContainers from "./ExpenseContainers";

function FinancialGlanceSection({ top_expenses_data }) {
    return(
        <section>
            <h2>Finances at a Glance</h2>
            <div className="expense-dropdown">
                <label htmlFor="expense-dropdown">Top expenses for: </label>
                <select id="expense-dropdown" defaultValue='current-month'>
                    <option value="current-month">Current Month</option>
                    <option value="previous-month">Previous Month</option>
                    <option value="two-months-ago">Two Months Ago</option>
                </select>                
            </div>
            <ExpenseContainers top_expenses_data={top_expenses_data}/>
        </section>
    )
};
export default FinancialGlanceSection;