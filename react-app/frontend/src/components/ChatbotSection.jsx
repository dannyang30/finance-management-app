import ChatbotIframe from "./ChatbotIframe"

function ChatbotSection() {
    return(
        <section className="chatbot-section">
            <h2>AI financial advisor</h2>
            <ChatbotIframe src="http://localhost:8501" title="Chatbot" />
        </section>
    )
}
export default ChatbotSection