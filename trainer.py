import pickle
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback






# Load .env file if needed
load_dotenv()

# Path to save the trained model
model_filename = "trained_model.pkl"

def traineee(pdfs):
    # Load existing model or train a new one

    print("Training a new model")

    # Extract the text from each PDF
    texts = []
    for pdf in pdfs:
        pdf_reader = PdfReader(pdf)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        texts.append(text)

    # Combine the text from all PDFs into a single string
    combined_text = "\n".join(texts)

    # Split into chunks
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(combined_text)

    # Create embeddings
    embeddings = OpenAIEmbeddings()
    knowledge_base = FAISS.from_texts(chunks, embeddings)

    # Save the trained model using pickle
    with open(model_filename, "wb") as model_file:
        pickle.dump(knowledge_base, model_file)
    print("Trained model saved as", model_filename)

    return True



# traineee(['uploads/sample.pdf','uploads/Invoice-597BF583-0007.pdf'])