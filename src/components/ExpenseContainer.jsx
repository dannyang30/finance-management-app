import PropTypes from 'prop-types';

function ExpenseContainer(props) {
    return(
        <div className="expense-container">
            <span>{props.topExpenseCategory}</span>
            <span>{props.topExpenseValue}</span>
        </div>
    )
};

ExpenseContainer.propTypes = {
    topExpenseCategory: PropTypes.string.isRequired,
    topExpenseValue: PropTypes.number.isRequired,
};

export default ExpenseContainer;