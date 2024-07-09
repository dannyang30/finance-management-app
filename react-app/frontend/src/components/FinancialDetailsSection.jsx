import ResetButton from "./ResetButton.jsx"
import LabeledDollarValue from "./LabeledDollarValue.jsx"
import Transactions from "./Transactions.jsx";
import AddButton from "./AddButton.jsx";
import PopUp from "./PopUp.jsx"
import {useState, useEffect} from "react"

function FinancialDetailsSection({ transactions_data, fetchTransactions }) {

    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState(); // Store selected transaction for editing
    const [selectedTransaction, setSelectedTransaction] = useState();
    const [nettAmount, setNettAmount] = useState();

    const calculateNettAmount = (transactions_data) => {
        let totalCredit = 0;
        let totalDebit = 0;

        transactions_data.forEach(transaction => {
            if (transaction.transaction_type === "credit") {
                totalCredit += transaction.amount;
            } else {
                totalDebit += transaction.amount;
            }
        });
        return totalCredit - totalDebit;
    }

    useEffect(() => { // only run when transactions_data changes
        const newNettAmount = calculateNettAmount(transactions_data);
        setNettAmount(newNettAmount);
    }, [transactions_data]);
    
    const handleAddClick = () => {
        setIsOpen(true);
        setMode("add");
    }

    const handleResetClick = () => {
        fetch('http://localhost:8081/reset', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json()) // this returns a Promise object, which represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. 
        .then(response_data => {
            console.log(response_data); // resolved value of the promise returned by response.json(), which is the parsed JSON data.
            fetchTransactions();
        }) 
        .catch(error => console.log(error));
    }

    const handleEditClick = (existing_transaction_data) => {
        setIsOpen(true);
        setMode("edit");
        setSelectedTransaction(existing_transaction_data);  
        console.log("existing_transaction_data", existing_transaction_data);      
    };   

    return(
        <section className="financial-details">
            <div className="financial-details-header-button">
                <h2>Your financial details</h2>
                <ResetButton handleResetClick={handleResetClick}/>
            </div>

            <div className="nett-balance-container">
                <LabeledDollarValue label="Nett Balance" value={nettAmount}/> 
            </div>
            <div className="financial-details-transactions">
                <p>Transactions</p>
                <Transactions transactions_data={transactions_data} handleEditClick={handleEditClick} />
            </div>
            <div className="add-button-container">
                <AddButton handleAddClick={handleAddClick}/>
            </div>
                {isOpen && (
                    <PopUp
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    mode={mode}
                    fetchTransactions={fetchTransactions}
                    selectedTransaction={selectedTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    />
                )}  
        </section>
    );
};
export default FinancialDetailsSection;