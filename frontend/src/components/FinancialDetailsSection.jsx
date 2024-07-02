import ResetButton from "./ResetButton.jsx"
import LabeledDollarValue from "./LabeledDollarValue.jsx"
import Transactions from "./Transactions.jsx";
import AddButton from "./AddButton.jsx";


function FinancialDetailsSection({ transactions_data }) {
    return(
        <section className="financial-details">
            <div className="financial-details-header-button">
                <h2>Your financial details</h2>
                <ResetButton/>
            </div>

            <div className="nett-balance-container">
                <LabeledDollarValue label="Nett Balance" value={0} /> 
            </div>
            <div className="financial-details-transactions">
                <p>Transactions</p>
                <Transactions transactions_data={transactions_data}/>
            </div>
            <div className="add-button-container">
                <AddButton/>  
            </div>
        </section>
    )
};
export default FinancialDetailsSection;