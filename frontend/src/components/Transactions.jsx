import LabeledDollarValue from "./LabeledDollarValue.jsx";
import EditButton from "./EditButton.jsx";
import moment from 'moment'

function formatDate(dateString) {
    return moment(dateString).format('DD-MM-YYYY');
}

function Transactions({ transactions_data, handleEditClick }) { 
    return(
        <ul className="transaction-list-container">
            {transactions_data.map(transaction_record => (
                <li key={transaction_record.transaction_id} className="transaction-list">
                    <div>
                        <LabeledDollarValue label={transaction_record.transaction_category} value={transaction_record.amount}/>
                        <span>{ formatDate(transaction_record.transaction_date) }</span>
                    </div>
                    <EditButton 
                        handleEditClick={() => handleEditClick(transaction_record)}
                    />
                </li>
            ))
            }
        </ul>
    )
};
export default Transactions;

