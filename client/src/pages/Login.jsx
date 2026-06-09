import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import AuthLayout from "../layouts/AuthLayout"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      })

      /* SIMPAN TOKEN & USER */
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      /* REDIRECT BERDASARKAN ROLE */
      const role = response.data.user.role
      if (role === "admin") {
        navigate("/admin")
      } else {
        navigate("/candidates")
      }
    } catch (err) {
      console.log(err)
      alert("Login gagal, periksa email dan password Anda.")
    }
  }

  return (
    <AuthLayout title="E-Voting" subtitle="Sistem Voting Kampus Modern">
      <form onSubmit={handleLogin}>
        <div className="mb-5">
          <label className="text-white block mb-2">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Masukkan email"
            className="w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-white block mb-2">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Masukkan password"
            className="w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-white text-indigo-700 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg">
          Login
        </button>
      </form>

      <p className="text-white/70 text-center mt-6">
        Belum punya akun?
        <Link to="/register" className="text-white hover:text-indigo-200 font-bold ml-2 transition-colors">
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}