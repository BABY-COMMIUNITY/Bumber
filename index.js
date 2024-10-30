const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (like CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/sms", async (req, res) => {
  const { number, limit } = req.query;
console.log(number)
  let msg;

  try {
    const axiosRes = await axios.get(`http://5.9.12.94:15560/bombing?number=${number}&limit=${limit}`);

    if (axiosRes.data.error) {
      msg = axiosRes.data.error;
    } else {
      msg = axiosRes.data.send.msg;
    }

    console.log(msg)

    res.json({ message: msg });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while sending the SMS" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
