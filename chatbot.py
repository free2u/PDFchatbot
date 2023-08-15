import pickle
from dotenv import load_dotenv
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback

load_dotenv()

model_filename = "trained_model.pkl"

# Load the trained model
with open(model_filename, "rb") as model_file:
    knowledge_base = pickle.load(model_file)
print("Loaded trained model")

def chatbot(user_question):

    if user_question:
        # Perform a similarity search in the knowledge base to get relevant documents
        relevant_documents = knowledge_base.similarity_search(user_question)

        llm = OpenAI()
        chain = load_qa_chain(llm, chain_type="stuff")
        with get_openai_callback() as cb:
            # Pass the relevant documents and user's question to the question-answering chain
            response = chain.run(input_documents=relevant_documents, question=user_question)
            print(cb)
            return (response)
