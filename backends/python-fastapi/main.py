import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Fullstack List Backend (Python)")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "people.json"
people: list[dict] = json.loads(DATA_PATH.read_text())


@app.get("/")
def health():
    return {"status": "ok", "service": "fullstack-list-backend-python"}


@app.get("/people")
def get_people(page: int = 1, limit: int = 10):
    page = max(1, page)
    limit = min(100, max(1, limit))
    results = people

    total = len(results)
    offset = (page - 1) * limit
    data = results[offset:offset + limit]

    return {"data": data, "meta": {"total": total, "page": page, "limit": limit}}


@app.get("/people/{person_id}")
def get_person(person_id: str):
    if not person_id.isdigit() or int(person_id) >= len(people):
        raise HTTPException(status_code=404, detail="Person not found")
    return people[int(person_id)]
