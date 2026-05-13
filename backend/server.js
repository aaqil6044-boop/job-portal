const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/jobportal");

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

app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/apply', async (req, res) => {
  const data = new Application(req.body);
  await data.save();
  res.send("Applied");
});

app.listen(5000, () => console.log("Server running on port 5000"));