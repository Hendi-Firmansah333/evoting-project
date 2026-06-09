const prisma = require("../config/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        // DEFAULT ROLE
        role: role || "student",
      },
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (!user) {
      return res.status(404).json({
        message:
          "User tidak ditemukan",
      })
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!validPassword) {
      return res.status(401).json({
        message: "Password salah",
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    )

    res.json({
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}