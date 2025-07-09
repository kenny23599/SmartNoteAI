from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import fitz  # PyMuPDF
import os

app = FastAPI()

# Allow CORS for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set to your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your OpenAI API key
client = OpenAI(api_key="YOUR_OPENAI_API_KEY")

@app.post("/summarize")
async def summarize_pdf(pdf: UploadFile = File(...)):
    # Read and extract text from the PDF
    contents = await pdf.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()

    # Truncate to 3000 tokens worth of characters (~12000 chars)
    text = text[:12000]

    # Call GPT-4 Turbo to summarize
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes academic and business documents."},
            {"role": "user", "content": f"Summarize this document:\n\n{text}"}
        ],
        temperature=0.5,
    )

    summary = response.choices[0].message.content.strip()
    return {"summary": summary}
