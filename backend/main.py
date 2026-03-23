from fastapi import FastAPI
from pydantic import BaseModel
from search import find_trials
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

def extract_condition(text):

    text = text.lower()

    if "lung" in text:
        return "lung cancer"

    if "breast" in text:
        return "breast cancer"

    return text


@app.post("/search")

def search_trials(query: Query):

    text = query.message.lower()

    condition = extract_condition(text)
    results = find_trials(condition)

    # NEW: filter recruiting if mentioned
    if "recruiting" in text:
        results = [t for t in results if t["status"].lower() == "recruiting"]

    return {
        "condition": condition,
        "trials": results
    }