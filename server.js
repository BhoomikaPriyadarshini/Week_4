const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const path = require("path");

const taskRoutes = require("./routes/tskroutes");
const authRoutes = require("./routes/authroutes");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "Frontend")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT || 5000, function() {
            console.log("Server is running on port " + (process.env.PORT || 5000));
        });
    })
    .catch(function(error) {
        console.log("MongoDB Connection Error:", error);
    });
