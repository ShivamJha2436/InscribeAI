from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="InscribeAI LLM Bridge (GPT4All)")


class ChatRequest(BaseModel):
    prompt: str
    temperature: float = 0.7


@app.post("/chat")
def chat(req: ChatRequest):
    # Placeholder: integrate GPT4All here
    return {"output": f"[gpt4all-placeholder] {req.prompt}"}


