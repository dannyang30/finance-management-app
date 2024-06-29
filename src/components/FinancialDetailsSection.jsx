import ResetButton from "./ResetButton.jsx"
import LabledDollarValue from "./LabeledDollarValue.jsx"
import Transactions from "./Transactions.jsx";
import AddButton from "./AddButton.jsx";


function FinancialDetailsSection({data}) {
    return(
        <section className="financial-details">
            <h2>Your financial details</h2>
            <ResetButton/>
            <div className="nett-balance-container">
                <LabledDollarValue label="Nett Balance" value="0"/> 
            </div>
            <div className="financial-details-transactions">
                <p>Transactions</p>
                <Transactions data={data}/>
            </div>
            <div className="add-button-container">
                <AddButton/>  
            </div>
        </section>
    )
}
export default FinancialDetailsSection