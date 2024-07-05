import Navbar from "./components/Navbar.jsx"
import TopSection from "./components/TopSection.jsx"
import ChatbotSection from "./components/ChatbotSection.jsx"
import FinancialDetailsSection from "./components/FinancialDetailsSection.jsx"
import FinancialGlanceSection from "./components/FinancialGlanceSection.jsx"
import { useEffect, useState } from "react"

// const default_transactions_data = [
//   { transaction_id: 1, transaction_timestamp: "DD-MM-YYYY", transaction_category: "Expense category 1", amount: 4 },
//   { transaction_id: 2, transaction_timestamp: "DD-MM-YYYY", transaction_category: "Expense category 2", amount: 10 }
// ];

const top_expenses_data = [
  { id: 23, transaction_category: "Expense category 1", amount: 4 },
  { id: 24, transaction_category: "Expense category 2", amount: 10 }
];

function App() {
  const [transactions_data, setTransactions_data] = useState( [] );

  const fetchTransactions = () => {
    fetch('http://localhost:8081/transactions')
    .then(response => response.json()) // this returns a Promise object, which represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. 
    .then(transactions_data => setTransactions_data(transactions_data)) // resolved value of the promise returned by response.json(), which is the parsed JSON data.
    .catch(error => console.log(error)) 
  }

  useEffect(() => {
    fetchTransactions();
  }, [] )


  return(
    <>
      <div className="app-div">
          <Navbar/>
          <TopSection/>
          <ChatbotSection/>
          <FinancialDetailsSection transactions_data={transactions_data} fetchTransactions={fetchTransactions}/>
          <FinancialGlanceSection top_expenses_data={top_expenses_data}/>
      </div>      
    </>
  )
}
export default App
