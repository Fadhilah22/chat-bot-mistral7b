const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.post("/api/chat", async (req, res) => {
    console.log("Request to Mistral API:", req.body);
    
    try {
      const response = await axios.post("https://api.mistral.ai/v1/chat/completions", req.body, {
        headers: {
          Authorization: `Bearer gW5XR6ys2JjL7VvRMff3fUoexFQpdR6X`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response from Mistral API:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error making request to Mistral API:", error.response?.data || error.message);
      res.status(error.response?.status || 500).send(error.response?.data || error.message);
    }
  });

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));

