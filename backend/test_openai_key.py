import os
from dotenv import load_dotenv

print("🟡 Cargando .env...")

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
print("🔑 OPENAI_API_KEY detectada:", api_key[:8] + "..." if api_key else "NO DETECTADA")
if not api_key:
    print("❌ ERROR: No se detectó ninguna clave en el .env.")
    exit(1)

print("🟢 Probando conexión real a OpenAI...")

try:
    import openai
    client = openai.OpenAI(api_key=api_key)
    respuesta = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Si tienes acceso a "gpt-4o", puedes ponerlo aquí
        messages=[{"role": "user", "content": "¿Cuánto es 2 + 2?"}],
        temperature=0,
        max_tokens=10,
    )
    print("✅ RESPUESTA de OpenAI:", respuesta.choices[0].message.content)
except Exception as e:
    print("❌ ERROR REAL devuelto por OpenAI:", repr(e))
    exit(1)

print("🎉 Todo OK: La clave es válida y el modelo responde.")
