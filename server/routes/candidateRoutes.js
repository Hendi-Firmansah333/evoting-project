const express = require("express")
const router = express.Router()

const multer = require("multer")

const {
  getCandidates,
  createCandidate,
  deleteCandidate,
} = require("../controllers/candidateController")

/* STORAGE */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {
    const cleanName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^\w.-]/g, "")

    cb(
      null,
      Date.now() + "-" + cleanName
    )
  },
})

const upload = multer({
  storage,
})

/* ROUTES */

router.get("/", getCandidates)

router.post(
  "/",
  upload.fields([
    {
      name: "chairmanPhoto",
      maxCount: 1,
    },
    {
      name: "vicePhoto",
      maxCount: 1,
    },
  ]),
  createCandidate
)

router.delete(
  "/:id",
  deleteCandidate
)

module.exports = router