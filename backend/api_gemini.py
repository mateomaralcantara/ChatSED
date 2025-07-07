# api_gemini.py actualizado (más seguro):

import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv() # Esto carga tus variables de entorno desde el archivo .env

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

modelo = genai.GenerativeModel('gemini-pro')

def obtener_respuesta_gemini(pregunta):
    respuesta = modelo.generate_content(pregunta)
    return respuesta.text

if __name__ == "__main__":
    print(obtener_respuesta_gemini("¿Cuál es el mejor consejo para una cita exitosa?"))
