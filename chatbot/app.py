import chainlit as cl
import requests

API = "http://127.0.0.1:8001/search"

@cl.on_message
async def main(message: cl.Message):

    response = requests.post(API, json={"message": message.content})

    data = response.json()

    trials = data["trials"]

    if not trials:
        await cl.Message(content="No trials found").send()
        return

    reply = "Here are trials I found:\n\n"

    for t in trials:
        reply += f"{t['title']} ({t['city']})\n"

    await cl.Message(content=reply).send()