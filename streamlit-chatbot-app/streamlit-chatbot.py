import streamlit as st
import google.generativeai as genai
from db_operations import execute_query


# Configure the API key and create instance of model
genai.configure(api_key=st.secrets["gemini_api_key"])
llm = genai.GenerativeModel("gemini-pro")

def load_css():
    with open("static/styles.css", "r") as f:
        css = f"<style>{f.read()}</style>"
        st.markdown(css, unsafe_allow_html=True)

# Initialize session state for chat history
def initialize_session_state():
    if "history" not in st.session_state:
        st.session_state.history = []

def generate_llm_history(user_message, llm_response):
    st.session_state.history.append({ 'role': 'user', 'parts': user_message })
    st.session_state.history.append({ 'role': 'model', 'parts': llm_response })

# Callback function to handle user input and generate a response from the model
def on_click_callback():
    context = get_transaction_records()
    prompt = f"""Answer the question based on the following transaction records {context}.

    Follow the basic guidelines:
    1. Your balance is basically the calculation of all debits and credits
    2. Every object in transaction records represent a transaction, with keys prepresenting details like date, amount, type for that specific transaction. Do not confuse between different transactions.
    3. Respond like you are a friendly customer service officer at the bank
    4. Only answer based on the transaction records. Do not make up your numbers 
    5. Go straight to the point if possible
    6. If you really have to show calculations, do it in this format - 1400 + 9000 
    7. If you're not able to answer the question due to a lack of context, just say so
    
    Okay let's start 
    Question:  """
    user_message = st.session_state.user_message
    chat = llm.start_chat(history=st.session_state.history) # always include history in chat
    llm_response = chat.send_message([prompt,user_message]).text
    generate_llm_history(user_message, llm_response)

load_css()

initialize_session_state()

# Create the chat history and prompt input containers in Streamlit
chat_history_container = st.container()
prompt_container = st.form("chat-form")
container_to_display_history = st.container()

# Display the chat history
with chat_history_container:
    for message in st.session_state.history:
        div = f"""
<div class="chat-row 
    {'' if message['role'] == 'model' else 'row-reverse'}">
        <div>{message['parts']}</div>
</div>
        """ 
        st.markdown(div, unsafe_allow_html=True)

# Create the prompt input form
with prompt_container:
    cols = st.columns((6, 1))
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

with container_to_display_history:
    st.write(f"History: {st.session_state.history}")


def get_transaction_records():
    sql_query = "SELECT * FROM transactions"
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
    
    

    