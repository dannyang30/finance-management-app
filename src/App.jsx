import Navbar from "./components/Navbar.jsx"
import TopSection from "./components/TopSection.jsx"
import ChatbotSection from "./components/ChatbotSection.jsx"
import FinancialDetailsSection from "./components/FinancialDetailsSection.jsx"
import FinancialGlanceSection from "./components/FinancialGlanceSection.jsx"

const data = [
  { id: 1, transaction_timestamp: "DD-MM-YYYY", transaction_category: "Expense category 1", amount: 4 },
  { id: 2, transaction_timestamp: "DD-MM-YYYY", transaction_category: "Expense category 2", amount: 10 }
];

const top_expenses_data = [
  { id: 23, transaction_category: "Expense category 1", amount: 4 },
  { id: 24, transaction_category: "Expense category 2", amount: 10 }
];

function App() {
  return(
    <>
      <div className="app-div">
        <Navbar/>
        <TopSection/>
        <ChatbotSection/>
        <FinancialDetailsSection data={data}/>
        <FinancialGlanceSection top_expenses_data={top_expenses_data}/>
      </div>      
    </>
  )
}
export default App
