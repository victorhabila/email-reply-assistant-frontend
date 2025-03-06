import { useState } from "react";

import "./App.css";
import { Container, Typography } from "@mui/material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" component="h1" gutterBottom>
        Email Reply Assistant
      </Typography>

      {/* <header>
        <h1>Email Assistant</h1>
      </header>
      <main>
        <section>
          <label htmlFor="emailContent">Email Content</label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="tone">Tone</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">Select a tone</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </section>
        <section>
          <button
            onClick={async () => {
              setLoading(true);
              setError("");
              setGeneratedReply("");
              try {
                const response = await fetch("/api/generate-reply", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ emailContent, tone }),
                });
                if (!response.ok) {
                  throw new Error("Failed to generate reply");
                }
                const data = await response.json();
                setGeneratedReply(data.reply);
              } catch (e) {
                setError(e.message);
              }
              setLoading(false);
            }}
          >
            Generate Reply
          </button>
        </section>
        <section>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {generatedReply && <p>{generatedReply}</p>}
        </section>
      </main> */}
    </Container>
  );
}

export default App;
