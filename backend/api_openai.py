import openai
import os
from dotenv import load_dotenv

load_dotenv()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def obtener_respuesta_openai(pregunta):
    respuesta = client.chat.completions.create(
        model="gpt-4o",  # O "gpt-3.5-turbo" según el modelo que quieras usar
        messages=[{"role": "user", "content": pregunta}],
        temperature=0.7,
        max_tokens=500,
    )
    return respuesta.choices[0].message.content

# Prueba rápida
if __name__ == "__main__":
    print(obtener_respuesta_openai("¿Cómo empezar una conversación seductora?"))
