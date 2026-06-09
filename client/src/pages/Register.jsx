import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      })

      alert("Register berhasil")

      navigate("/")
    } catch (error) {
      console.log(error)

      alert("Register gagal")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-700 via-purple-700 to-blue-700">
      <div className="w-105 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Register
        </h1>

        <p className="text-white/70 text-center mb-8">
          Buat akun E-Voting
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="text-white block mb-2">
              Nama
            </label>

            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none"
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label className="text-white block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-6">
            <label className="text-white block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button className="w-full bg-white text-indigo-700 font-bold py-4 rounded-2xl hover:scale-105 transition-all duration-300">
            Register
          </button>
        </form>

        <p className="text-white/70 text-center mt-6">
          Sudah punya akun?
          <Link
            to="/"
            className="text-white font-bold ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}