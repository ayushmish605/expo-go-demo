const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

let latestImageUrl = null;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

app.use('/uploads', express.static(uploadsDir));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/latest', (req, res) => {
  res.json({ imageUrl: latestImageUrl });
});

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded. Expected field name: photo');

  latestImageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: latestImageUrl });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
