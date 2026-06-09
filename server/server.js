const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const path = require("path")

require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const candidateRoutes = require("./routes/candidateRoutes")
const voteRoutes = require("./routes/voteRoutes")

const app = express()

/* =========================
   MIDDLEWARE
========================= */

app.use(cors())

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
)

app.use(express.json())

/* =========================
   STATIC FILES
========================= */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
)

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes)

app.use(
  "/api/candidates",
  candidateRoutes
)

app.use("/api/votes", voteRoutes)

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("API berjalan")
})

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Server berjalan di port ${PORT}`
  )
})