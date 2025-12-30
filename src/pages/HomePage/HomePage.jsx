import { Box, Typography, TextField, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle, #ffffff, #f0f0f0)",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
        {/* Heading */}
        <Typography
          sx={{
            fontFamily: '"Pacifico", cursive',
            fontSize: "2.8rem",
            color: "#6ab04c",
            mb: 4,
            fontWeight:800
          }}
        >
          Free Dictionary
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="Search..."
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              "& fieldset": {
                borderColor: "#ccc",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6ab04c",
              px: 3,
              textTransform: "none",
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#5aa03c",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
