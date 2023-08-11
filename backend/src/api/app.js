const express = require('express');
const multer = require('multer');
const cors = require('cors');
const {
  stacksRouter,
  projectsRouter,
  stacksProjectsRouter,
} = require('../routes/index.routes');
const app = express();

app.use(express.json()); // parse json bodies
app.use(cors()); // allow all origins

app.use('/stacks', stacksRouter);
app.use('/projects', projectsRouter);
app.use('/stacks-projects', stacksProjectsRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/assets/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('snapshot'), (req, res) => {
  res.send('file uploaded');
});

module.exports = app;