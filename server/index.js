require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes  = require("./route/user")
const authRoutes = require("./route/auth")
const connection= require("./db")

// database connection
 connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes)
app.use("/get",userRoutes)


const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Listening on port ${port}`))
