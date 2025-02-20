import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"; // Default to localhost if env is missing
      const res = await fetch(`${backendUrl}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Error: Unable to fetch response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", textAlign: "center" }}>
      <h2>Tanya Jawab Seputar Buku Panduan LPDP</h2>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Masukan pertanyaanmu disini..."
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />
      
      <button
        onClick={handleSend}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Kirim"}
      </button>

      {loading && (
        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              width: "100%",
              height: "5px",
              backgroundColor: "#ddd",
              position: "relative",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                backgroundColor: "#4CAF50",
                position: "absolute",
                animation: "progress-animation 1.5s infinite",
              }}
            />
          </div>
          <style>
            {`
              @keyframes progress-animation {
                0% { left: -50%; }
                50% { left: 50%; }
                100% { left: 100%; }
              }
            `}
          </style>
        </div>
      )}

      {!loading && response && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            fontSize: "16px",
            whiteSpace: "pre-line",
          }}
        >
          <strong>Response:</strong> <br />
          {response}
        </div>
      )}
    </div>
  );
};

export default App;
