const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
const file = 'claimed.json';

if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');
let claimed = JSON.parse(fs.readFileSync(file));

app.post('/claim', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, msg: "No ID" });

  if (claimed[id]) {
    return res.json({ success: false, msg: "Already claimed" });
  }

  claimed[id] = true;
  fs.writeFileSync(file, JSON.stringify(claimed));
  res.json({ success: true, msg: "You got 1 coin!" });
});

app.get('/', (req, res) => {
  res.send('Backend is live.');
});

app.listen(process.env.PORT || 3000);
￼Enter
