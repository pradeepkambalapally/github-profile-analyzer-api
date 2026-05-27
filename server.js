
require("dotenv").config();
const express = require('express');
require('./config/db')
const app = express();

const githubRoutes = require("./routes/githubRoutes");

app.use(express.json());

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server now running at ${PORT}`);
    
})