import { useState } from "react";
import axios from "axios";

import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import logo from "./assets/AILogo.png";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError(
        "An error occurred. Failed to generate email replyPlease try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: { xs: "100%", md: 700 },
          height: "443px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src={logo}
          alt="Project Logo"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
          }}
        />
        <Typography variant="h6" fontWeight={600}>
          About This Project
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="justify">
          Tired of spending time crafting email responses? Our AI-Powered Email
          Reply Generator <b style={{ color: "#2196f3" }}>(MailCute)</b>makes it
          effortless! Built using Gemini AI Free API, Spring Boot, and React.js,
          this tool generates professional, casual, or friendly email replies in
          seconds. We also developed a Google Chrome extension that seamlessly
          integrates with Gmail, allowing you to generate responses directly
          from your inbox.
        </Typography>
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ textAlign: "left", width: "100%" }}
        >
          <b>Author:</b> Victor Habila <br /> <b>Date:</b> 7th March 2025
        </Typography>
      </Paper>

      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: { xs: "100%", md: 900 },
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Email Reply Generator
        </Typography>

        <Box sx={{ my: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3, borderRadius: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="info"
            onClick={handleSubmit}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
              boxShadow: 2,
            }}
            disabled={!emailContent || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mt: 3,
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <Button
              variant="outlined"
              sx={{ mt: 2, borderRadius: 2 }}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to Clipboard
            </Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default App;
