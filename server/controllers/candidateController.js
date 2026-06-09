const prisma = require("../config/prisma")

/* GET */
exports.getCandidates = async (req, res) => {
  try {
    const candidates =
      await prisma.candidate.findMany({
        include: {
          votes: true,
        },
      })

    const result = candidates.map(
      (candidate) => ({
        ...candidate,
        votes: candidate.votes.length,
      })
    )

    res.json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* CREATE */
exports.createCandidate = async (
  req,
  res
) => {
  try {
    const {
      electionTitle,
      teamName,
      chairman,
      viceChairman,
      vision,
      mission,
    } = req.body

    const chairmanPhoto =
      req.files["chairmanPhoto"]
        ? req.files["chairmanPhoto"][0]
            .filename
        : null

    const vicePhoto =
      req.files["vicePhoto"]
        ? req.files["vicePhoto"][0]
            .filename
        : null

    const candidate =
      await prisma.candidate.create({
        data: {
          electionTitle,
          teamName,
          chairman,
          viceChairman,
          vision,
          mission,
          chairmanPhoto,
          vicePhoto,
        },
      })

    res.json(candidate)
  } catch (error) {
    console.log(error)

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
    const candidateId = Number(
      req.params.id
    )

    /* hapus semua vote dulu */
    await prisma.vote.deleteMany({
      where: {
        candidateId,
      },
    })

    /* baru hapus candidate */
    await prisma.candidate.delete({
      where: {
        id: candidateId,
      },
    })

    res.json({
      message:
        "Kandidat berhasil dihapus",
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}