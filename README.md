# Patient-Facing Clinical Trial Chatbot (Prototype)

## Overview

The project is a prototype of a patient facing system that aims to assist the users in finding relevant clinical trials by means of a combination of conversational input and interactive map interface.

Patients usually have difficulties in locating appropriate clinical trials since they are not equipped with structured tools. 
This prototype demonstrates how natural language input can be processed and linked with geospatial visualization to make this process easier and more intuitive.

This project is a part of my GSoC preparation where I was able to explore and build a chatbot system that would be used in clinical trials as I built a more solid foundation in areas I want to work in.

---

## Objectives

The main goals of this prototype are:

* To simulate a chatbot-like interface for patient input
* To process user queries and extract relevant conditions
* To display clinical trial locations on an interactive map
* To allow users to explore and view details of trials
* To demonstrate how filtering (e.g., recruiting trials) can be applied

---

## System Architecture

The prototype system follows a simple client-server architecture:

```
User Input (Frontend - React)
        ↓
API Request (POST /search)
        ↓
Backend Processing (FastAPI)
        ↓
Trial Filtering Logic
        ↓
Response (JSON)
        ↓
Map Rendering (Leaflet)
```

---

## Tech Stack

### Frontend

* React (JavaScript)
* React Leaflet (for maps)
* OpenStreetMap (free map tiles)

### Backend

* FastAPI (Python)
* Pydantic (data validation)

---

## How It Works

### 1. User Input

The user enters a query such as:

```
lung cancer
lung cancer recruiting
```

This input is handled in the frontend and sent to the backend via a POST request.

---

### 2. Backend Processing

The backend receives the query and processes it in two steps:

#### a) Condition Extraction

A simple rule-based function identifies the condition (e.g., “lung cancer”).

#### b) Filtering Logic

If the query includes keywords like “recruiting”, the backend filters trials accordingly.

---

### 3. Data Retrieval

Currently, the system uses a mock dataset with fields such as:

* trial title
* city
* latitude & longitude
* status (Active / Recruiting)

This is used to simulate real-world clinical trial data.

---

### 4. Response

The backend returns a JSON response:

```json
{
  "condition": "lung cancer",
  "trials": [...]
}
```

---

### 5. Frontend Rendering

The frontend:

* updates the map with markers for each trial
* displays a summary panel when a marker is clicked
* shows chatbot-style messages based on the query

---

## Map Visualization

The prototype uses Leaflet with OpenStreetMap tiles.

In this prototype, I have employed OpenStreetMap with Leaflet, as a free and open-source tool that does not need any API keys or even billing. This allowed me to start fast and concentrate on the development of the main functionality of the system.

As the primary purpose of this project is to show how the input of the conversation may be linked to the back-end filtering and map visualization, OpenStreetMap offers a sufficient amount of functionality to visualize the locations of the clinical trials and allow interaction with them

For a production-level system, tools like Mapbox are used for better performance and advanced features. However, for this stage, using an open-source approach was more effective.

Each trial is represented as a marker on the map:

* Clicking a marker shows basic details
* The summary panel updates dynamically

This demonstrates how geospatial data can be integrated into healthcare tools.

---

## 💬 Chat-like Interface

Although not using a real LLM yet, the interface simulates a chatbot:

Example:

```
You: lung cancer
Bot: Found 2 trials for lung cancer

You: lung cancer recruiting
Bot: Showing 1 recruiting trial for lung cancer
```

This helps demonstrate how conversational input can drive system behavior.

---

## Limitations

This is a prototype, so it has several limitations:

* Uses rule-based logic instead of an LLM
* Uses mock data instead of real clinical trial datasets
* No eligibility matching (age, stage, biomarkers)
* No ranking or recommendation system
* No geocoding (addresses → coordinates)

---

## Future Improvements

If extended further, the system can include:

* Integration with real datasets (e.g., Cancer Trials Canada)
* LLM-based extraction of patient details (age, stage, etc.)
* Advanced filtering and eligibility matching
* Ranking trials based on relevance
* Secure handling of sensitive medical data
* Geocoding for real-world addresses

---

## Key Learnings

Through this project, I learnt and brushed up my skills in areas like:

* designing and building a full-stack system
* frontend and backend communication via APIs
* simulating NLP pipelines using rule-based logic
* integrating geospatial visualization
* structuring a project based on real-world requirements

---

## Conclusion

This prototype has shown how it is possible to develop a system that integrates conversational input and geospatial visualization to enhance access to clinical trials.

Although simplified, it represents the overall architecture and flow of interaction of the proposed GSoC project.

---

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### Frontend

```bash
cd frontend/map-ui
npm install
npm start
```
