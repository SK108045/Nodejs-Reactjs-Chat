const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Set this before starting the server, for example:
//   CHAT_ENGINE_PRIVATE_KEY=your-key npm start
const PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;
const PORT = process.env.PORT || 3001;

app.post("/authenticate", async (req, res) => {
  const { username } = req.body || {};

  if (!username || typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ message: "username is required" });
  }
  if (!PRIVATE_KEY) {
    return res
      .status(500)
      .json({ message: "Server is missing CHAT_ENGINE_PRIVATE_KEY" });
  }

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // e.response is undefined on network errors. Do not crash the server.
    if (!e.response) {
      return res
        .status(502)
        .json({ message: "Could not reach the chat service" });
    }
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
