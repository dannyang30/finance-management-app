import LabeledDollarValue from "./LabeledDollarValue.jsx";
import EditButton from "./EditButton.jsx";

function Transactions({ transactions_data }) {    
    return(
        <ul className="transaction-list-container">
            {transactions_data.map(transaction_record => (
                <li key={transaction_record.transaction_id} className="transaction-list">
                    <div>
                        <LabeledDollarValue label={transaction_record.transaction_category} value={transaction_record.amount}/>
                        <span>{transaction_record.transaction_timestamp}</span>
                    </div>
                    <EditButton/>
                </li>
            ))
            }
        </ul>
    )
};
export default Transactions;


