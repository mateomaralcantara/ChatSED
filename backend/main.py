from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from api_openai import obtener_respuesta_openai
from api_gemini import obtener_respuesta_gemini

app = FastAPI(
    title="ChatSed API",
    description="API para ChatSed: agente conversacional de seducción usando OpenAI y Gemini.",
    version="1.0.0"
)

# Configuración CORS para cualquier origen (puedes restringirlo si sabes tu frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a ["http://localhost:3000"] si solo usas local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pregunta(BaseModel):
    pregunta: str = Field(..., description="Pregunta o mensaje enviado al chatbot", example="¿Qué es el amor?")

@app.get("/", tags=["Health"])
def home():
    return {"mensaje": "ChatSed API funcionando 🚀"}

@app.post("/chat/openai", tags=["OpenAI"])
def chat_openai(datos: Pregunta):
    try:
        respuesta = obtener_respuesta_openai(datos.pregunta)
        return {"respuesta": respuesta}
    except Exception as e:
        print(f"🔥 Error en /chat/openai: {repr(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.post("/chat/gemini", tags=["Gemini"])
def chat_gemini(datos: Pregunta):
    try:
        respuesta = obtener_respuesta_gemini(datos.pregunta)
        return {"respuesta": respuesta}
    except Exception as e:
        print(f"🔥 Error en /chat/gemini: {repr(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
