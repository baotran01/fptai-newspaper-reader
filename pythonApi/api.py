from fastapi import FastAPI
from newspaper import Article
import requests
import nltk
import time
import os 
api_key = os.environ.get('MY_API_KEY', None) 


app = FastAPI()


@app.post("/newspaper/")
async def read_item(url: str):
    article = Article(url)
    article.download()
    article.parse()

    text = article.text

    sentences = nltk.tokenize.sent_tokenize(text)

    headers = {
        "api_key": api_key,
        "voice": "leminh"
    }

    arr = []
    mp3 = []
    cur = article.title

    for sentence in sentences:
        if len(cur) + len(sentence) + 1 > 5000:
            while True:
                res = requests.post("https://api.fpt.ai/hmi/tts/v5", headers=headers, data=cur.encode('utf-8'))
                doc = res.json()
                if "error" in doc and doc["error"] == 0:
                    break
                else:
                    time.sleep(60)
            arr.append(cur)
            mp3.append(doc["async"])
            cur = sentence
        else:
            cur = cur + " " + sentence

    if len(cur) >= 1:
        while True:
            res = requests.post("https://api.fpt.ai/hmi/tts/v5", headers=headers, data=cur.encode('utf-8'))
            doc = res.json()
            if "error" in doc and doc["error"] == 0:
                break
        arr.append(cur)
        mp3.append(doc["async"])

    return {"title": article.title, "sentences": arr, "files": mp3}
