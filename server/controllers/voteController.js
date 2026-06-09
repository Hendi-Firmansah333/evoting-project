const prisma = require("../config/prisma")

/* GET CANDIDATES */
exports.getCandidates = async (req, res) => {
  try {
    const candidates =
      await prisma.candidate.findMany({
        include: {
          votes: true,
        },
      })

    res.json(candidates)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* ADD CANDIDATE */
exports.addCandidate = async (req, res) => {
  try {
    const { name, vision, mission } = req.body

    const photo = req.file
      ? req.file.filename
      : null

    const candidate =
      await prisma.candidate.create({
        data: {
          name,
          vision,
          mission,
          photo,
        },
      })

    res.json(candidate)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* UPDATE */
exports.updateCandidate = async (
  req,
  res
) => {
  try {
    const { name, vision, mission } =
      req.body

    const data = {
      name,
      vision,
      mission,
    }

    if (req.file) {
      data.photo = req.file.filename
    }

    const candidate =
      await prisma.candidate.update({
        where: {
          id: parseInt(req.params.id),
        },
        data,
      })

    res.json(candidate)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* DELETE */
exports.deleteCandidate = async (
  req,
  res
) => {
  try {
    await prisma.candidate.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })

    res.json({
      message: "Candidate deleted",
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* VOTE */
exports.voteCandidate = async (
  req,
  res
) => {
  try {
    const candidateId = parseInt(
      req.params.id
    )

    const userId = req.user.id

    /* cek sudah vote */
    const existingVote =
      await prisma.vote.findUnique({
        where: {
          userId,
        },
      })

    if (existingVote) {
      return res.status(400).json({
        message:
          "Kamu sudah melakukan voting",
      })
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId,
      },
    })

    res.json(vote)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}