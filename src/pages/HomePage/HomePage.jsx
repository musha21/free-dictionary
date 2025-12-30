import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

export default function HomePage() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word.trim()) return;

    try {
      setError("");
      setMeanings([]);
      setAudioUrl("");

      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setMeanings(data[0].meanings);

      const audio = data[0].phonetics.find(p => p.audio);
      if (audio) setAudioUrl(audio.audio);

    } catch {
      setError("Word not found");
    }
  };

  const playAudio = () => {
    if (!audioUrl) return;
    new Audio(audioUrl).play();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "radial-gradient(circle, #ffffff, #f0f0f0)",
        pt: 6,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontFamily: '"Pacifico", cursive',
          fontSize: "2.8rem",
          color: "#6ab04c",
          fontWeight: 800,
        }}
      >
        Free Dictionary
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", gap: 1, width: 600 }}>
        <TextField
          fullWidth
          placeholder="Search a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#6ab04c",
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Word Header + Audio */}
      {meanings.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            {word}
          </Typography>

          {audioUrl && (
            <IconButton onClick={playAudio} color="success">
              <VolumeUpIcon />
            </IconButton>
          )}
        </Box>
      )}

      {/* Results */}
      <Box
        sx={{
          width: 600,
          backgroundColor: "#f6fff2",
          p: 3,
          borderRadius: 2,
        }}
      >
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {meanings.map((meaning, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            {/* Category */}
            <Typography
              sx={{
                fontWeight: 700,
                color: "#6ab04c",
                textTransform: "capitalize",
                mb: 1,
              }}
            >
              {meaning.partOfSpeech}
            </Typography>

            {/* Definitions */}
          {meaning.definitions.map((def, i) => (
      <Box key={i} sx={{ pl: 2, mb: 1 }}>
        <Typography>• {def.definition}</Typography>
        {def.example && (
          <Typography sx={{ pl: 2, fontStyle: "italic", color: "#555" }}>
            Example: "{def.example}"
          </Typography>
        )}
      </Box>
    ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
