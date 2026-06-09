const express = require("express")

const router = express.Router()

const prisma = require("../config/prisma")

const jwt = require("jsonwebtoken")

/* VOTE */
router.post(
  "/:candidateId",
  async (req, res) => {
    try {
      const token =
        req.headers.authorization?.split(
          " "
        )[1]

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized",
        })
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      )

      const existingVote =
        await prisma.vote.findUnique({
          where: {
            userId: decoded.id,
          },
        })

      if (existingVote) {
        return res.status(400).json({
          message:
            "Kamu sudah voting",
        })
      }

      const vote =
        await prisma.vote.create({
          data: {
            userId: decoded.id,
            candidateId: parseInt(
              req.params.candidateId
            ),
          },
        })

      res.json(vote)
    } catch (error) {
      res.status(500).json({
        error: error.message,
      })
    }
  }
)

module.exports = router