import FormInputField from "./FormInputField";
import FormDropdownField from "./FormDropdownField";
import { useState, useEffect } from "react";
import DateField from "./DateField";

const transaction_type_options = [
    { value: "debit", label: "Debit"},
    { value: "credit", label: "Credit"}    
];

const debit_transaction_category_options = [
    { value: "Groceries", label: "Groceries"},
    { value: "Dining", label: "Dining"},
    { value: "Housing", label: "Housing"},
    { value: "Entertainment", label: "Entertainment"},
    { value: "Health", label: "Health"},
    { value: "Education", label: "Education"}
];

const credit_transaction_category_options = [
    { value: "Salary", label: "Salary"},
];


function PopUp({ onClose, mode, selectedTransaction, fetchTransactions }) {

    const [ formData, setFormData ] = useState(selectedTransaction || {});

    const category_options = (formData.transaction_type === "debit" ? debit_transaction_category_options : credit_transaction_category_options )
   
    const handleInputChange = (event) => { // update formData state whenever input field changes, to be able to provide real-time feedback and ensure information is still there when user leaves the page
        setFormData({ ...formData, [event.target.name]: event.target.value }); // ... is the spread operator, which ensures the existing state isn't overwritten with just updated field value
    };

    const handleAddSubmit = (event) => {
        event.preventDefault(); // prevents default behavior like page refreshing on submit

        const formDataObject = new FormData(event.target);
        const formData = Object.fromEntries(formDataObject.entries()); // { "transaction_type": "credit", "transaction_category": "Groceries", "amount": "412" }
        
        fetch('http://localhost:8081/add-transaction', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body:JSON.stringify(formData)
        })
        .then(response => response.json()) // this returns a Promise object, which represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. 
        .then(response_data => {
            console.log(response_data); // resolved value of the promise returned by response.json(), which is the parsed JSON data.
            fetchTransactions();
        }) 
        .catch(error => console.log(error));
        
        onClose();
    }

    const handleEditSubmit = (event) => {
        event.preventDefault(); // prevents default behavior like page refreshing on submit

        const formDataObject = new FormData(event.target);
        const formData = Object.fromEntries(formDataObject.entries()); // { "transaction_type": "credit", "transaction_category": "Groceries", "amount": "412" }

        const body = { ...formData, transaction_id: selectedTransaction.transaction_id }
        console.log("body: ", body)
        console.log(selectedTransaction.transaction_id)

        fetch('http://localhost:8081/update-transaction', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body:JSON.stringify(body)
        })
        .then(response => response.json()) // this returns a Promise object, which represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. 
        .then(response_data => {
            console.log(response_data); // resolved value of the promise returned by response.json(), which is the parsed JSON data.
            fetchTransactions();
        }) 
        .catch(error => console.log(error));
        
        onClose();
    } 
    
    const handleSubmit = mode === 'add' ? handleAddSubmit : handleEditSubmit;

    const content = mode === "add" ? (
        <>
            <FormDropdownField name="transaction_type" label="Type of transaction: " options={transaction_type_options} onChange={handleInputChange}/>
            <FormDropdownField name="transaction_category" label="Transaction category: " options={category_options} onChange={handleInputChange}/>
            <FormInputField label="Amount: " name="amount" type="number" placeholder="" onChange={handleInputChange}/>
            <DateField label="Transaction date: " name="transaction_date" onChange={handleInputChange}/>
        </>
    ) : (
        <>
            <FormDropdownField name="transaction_type" label="Type of transaction: " defaultValue={formData.transaction_type} options={transaction_type_options} onChange={handleInputChange}/>
            <FormDropdownField name="transaction_category" label="Transaction category: " defaultValue={formData.transaction_category} options={category_options} onChange={handleInputChange}/>
            <FormInputField label="Amount: " name="amount" type="number" defaultValue={formData.amount} placeholder="" onChange={handleInputChange}/>
            <DateField label="Transaction date: " name="transaction_date" defaultValue={formData.transaction_date} onChange={handleInputChange}/>
        </>
    );


    return (
        <div className="overlay">
            <div className="popup">
                <div className="popup-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>{mode === "add" ? "Add New" : "Edit"}</h2>
                    <form onSubmit={handleSubmit} id="form">
                        {content}
                        <button type="submit" className="submission-button">{mode === "add" ? "Confirm" : "Update"}</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
export default PopUp;