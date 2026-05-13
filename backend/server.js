const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin123@cluster0.4te56ld.mongodb.net/jobportal?retryWrites=true&w=majority");

// Job Schema
const Job = mongoose.model("Job", {
  title: String,
  company: String,
  salary: String
});

// Application Schema
const Application = mongoose.model("Application", {
  name: String,
  email: String,
  jobId: String
});

app.post('/addJob', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send("Job Added");
});

app.get("/", (req, res) => {
  res.send("Job Portal Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});