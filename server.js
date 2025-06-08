const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let claimed = fs.existsSync('claimed.json') ? JSON.parse(fs.readFileSync('claimed.json')) : [];

app.post('/claim', (req, res) => {
  const { id } = req.body;
  if (!id) return res.send("Invalid Discord ID.");
  if (claimed.includes(id)) return res.send("❌ Already claimed!");

  claimed.push(id);
  fs.writeFileSync('claimed.json', JSON.stringify(claimed));
  
  // TODO: Add 1 coin to bot system here (or save to file)

  res.send("✅ Reward claimed successfully!");
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
￼Enter
