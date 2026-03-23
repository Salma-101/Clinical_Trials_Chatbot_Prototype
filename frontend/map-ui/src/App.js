import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function App() {
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [query, setQuery] = useState("");
  const [trials, setTrials] = useState([]);
  const [messages, setMessages] = useState([]);

const searchTrials = (customQuery) => {
  const q = customQuery || query;

  // Add user message
  setMessages((prev) => [...prev, { role: "user", text: q }]);

  fetch("http://127.0.0.1:8001/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: q }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTrials(data.trials);

      let botMessage = "";

      if (q.toLowerCase().includes("recruiting")) {
        botMessage = `Showing ${data.trials.length} recruiting trials for ${data.condition}`;
      } else if (data.trials.length === 0) {
        botMessage = `No trials found for ${data.condition}. Try refining your search.`;
      } else {
        botMessage = `Found ${data.trials.length} trials for ${data.condition}`;
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: botMessage },
      ]);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

  return (
    <>
      {/* LEFT PANEL */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "25%",
          height: "100vh",
          background: "#f5f5f5",
          padding: "15px",
          zIndex: 1000,
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <h3>Clinical Trial Finder</h3>

        {/* Chat messages */}
        <div style={{ marginBottom: "15px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: "5px" }}>
              <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe condition..."
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={() => searchTrials()} style={{ width: "100%" }}>
          Search
        </button>

        {/* Recruiting filter */}
        <button
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => searchTrials("lung cancer recruiting")}
        >
          Show Recruiting Trials
        </button>

        <p style={{ marginTop: "20px", fontSize: "12px" }}>
          Example: lung cancer, breast cancer
        </p>
      </div>

      {/* SUMMARY PANEL */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          width: "250px",
          background: "white",
          padding: "10px",
          zIndex: 1000,
          borderRadius: "8px",
        }}
      >
        {selectedTrial ? (
          <>
            <h3>{selectedTrial.title}</h3>
            <p><b>City:</b> {selectedTrial.city}</p>
            <p><b>Status:</b> {selectedTrial.status}</p>
          </>
        ) : (
          <p>Select a trial</p>
        )}
      </div>

      {/* MAP */}
      <MapContainer
        center={[50, -95]}
        zoom={3}
        style={{ height: "100vh", width: "75%", marginLeft: "25%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trials.map((t) => (
          <Marker
            key={t.id}
            position={[t.lat, t.lon]}
            eventHandlers={{
              click: () => setSelectedTrial(t),
            }}
          >
            <Popup>
              <b>{t.title}</b>
              <br />
              {t.city}
              <br />
              Status: {t.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;