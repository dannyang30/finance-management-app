import streamlit as st
import google.generativeai as genai
from db_operations import execute_query


# Configure the API key and create instance of model
genai.configure(api_key=st.secrets["gemini_api_key"])
llm = genai.GenerativeModel("gemini-1.5-pro-latest")

def load_css():
    with open("static/styles.css", "r") as f:
        css = f"<style>{f.read()}</style>"
        st.markdown(css, unsafe_allow_html=True)

# Initialize session state for chat history
def initialize_session_state():
    if "history" not in st.session_state:
        st.session_state.history = []
        welcome_message = 'Hi there, ask me anything about your transactions!'
        st.session_state.history.append({ 'role': 'model', 'parts': welcome_message })

def generate_llm_history(user_message, llm_response):
    st.session_state.history.append({ 'role': 'user', 'parts': user_message })
    st.session_state.history.append({ 'role': 'model', 'parts': llm_response })

# Callback function to handle user input and generate a response from the model
def on_click_callback():
    context = get_transaction_records()

    prompt = f"""
    Answer the question based on the following transaction records: {context}.

    Before answering, follow these guidelines:
    1. Each transaction record is unique and enclosed within {{}}
    2. Each transaction record contains a transaction date. 01-05-2024 means 1 May 2024
    3. Respond like you are a friendly customer service officer at the bank.
    4. Only answer based on the transaction records provided. Do not invent numbers.
    5. Look through every single transaction record. Differentiate between debit and credits
    6. Your nett balance or account balance is the basically the sum of all debit and credit transaction records
    7. Keep your responses as concise as possible. Only make use of the transactions
    8. If there isn't enough context to answer the question, say so.

    
    Here is a example data, use reasoning like the following examples when giving your answer to any questions:
    Sample transaction Records: [
        {{'Transaction Date': '01-05-2024', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}},
        {{'Transaction Date': '01-01-2024', 'Amount': 1000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}},
        {{'Transaction Date': '01-01-2024', 'Amount': 200.0, 'Transaction Type': 'debit', 'Category': 'Groceries'}},
        {{'Transaction Date': '05-01-2024', 'Amount': 200.0, 'Transaction Type': 'debit', 'Category': 'Groceries'}},
        {{'Transaction Date': '05-12-2023', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}},
        {{'Transaction Date': '10-11-2023', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}}
    ]

    Sample question: How much salary have I gotten between Dec 2023 to Jul 2024?
    Steps:
    1. Find relevant records:
        - Identify Salary Records: We need to focus on records where the Transaction Type is credit and the Category is Salary.
        - Filter Records by Date: Only include records between Dec 2023 and July 2024.
        - Sum the Amounts: Add up the amounts from the filtered records.
        - Explain why you selected every record
    2. Review records. Here are the relevant transactions:
        {{'Transaction Date': '01-05-2024', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}},
        {{'Transaction Date': '01-01-2024', 'Amount': 1000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}},
        {{'Transaction Date': '05-12-2023', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}}

        Note that the following is not included because it is before Dec 2023:
        {{'Transaction Date': '10-11-2023', 'Amount': 30000.0, 'Transaction Type': 'credit', 'Category': 'Salary'}} 
    3. Verify salary
        - 30000 on 01-05-2024
        - 10000 on 01-01-2024
        - 30000 on 05-12-2023
    4. Add up salary:
        - 30000 + 10000 + 30000 = 61000


    Okay, let's start:
    Question:
    """
            
    user_message = st.session_state.user_message
    chat = llm.start_chat(history=st.session_state.history) # always include history in chat
    llm_response = chat.send_message([prompt,user_message]).text
    generate_llm_history(user_message, llm_response)
    st.session_state.user_message = ''


load_css()

initialize_session_state()

# Create the chat history and prompt input containers in Streamlit
chat_history_container = st.container()
prompt_container = st.form("chat-form")


# Display the chat history
with chat_history_container:
    for message in st.session_state.history:
        div = f"""
<div class="chat-row 
    {'' if message['role'] == 'model' else 'row-reverse'}">
        <div class= "chat-bubble {'model-bubble' if message['role'] == 'model' else 'user-bubble'}">{message['parts']}</div>
</div>
        """ 
        st.markdown(div, unsafe_allow_html=True)

# Create the prompt input form
with prompt_container:
    cols = st.columns([0.8, 0.2])
    cols[0].text_input(
        "label", 
        value="", 
        label_visibility="collapsed",
        key="user_message"
    )
    cols[1].form_submit_button(
        "Submit",
        type="primary",
        on_click=on_click_callback,
    )


def get_transaction_records():
    sql_query = "SELECT * FROM transactions ORDER BY transaction_date DESC"
    records = execute_query(sql_query)
    if records:
        context = []
        for record in records:
            context.append({
                "Transaction Date": record[6].strftime('%d-%m-%Y'),
                "Amount": float(record[3]),
                "Transaction Type": record[4],
                "Category": record[5]
            })
        return context
    else:
        return("No records found.")
    
    


