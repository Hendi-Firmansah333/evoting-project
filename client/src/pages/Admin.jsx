import { useEffect, useState } from "react"
import api from "../services/api"
import AdminSidebar from "../components/AdminSidebar"

import {
  FaUsers,
  FaTrash,
  FaPlus,
  FaVoteYea,
  FaCrown,
} from "react-icons/fa"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function Admin() {
  const [candidates, setCandidates] = useState([])
  const [electionTitle, setElectionTitle] = useState("")
  const [teamName, setTeamName] = useState("")
  const [chairman, setChairman] = useState("")
  const [viceChairman, setViceChairman] = useState("")
  const [vision, setVision] = useState("")
  const [mission, setMission] = useState("")
  const [chairmanPhoto, setChairmanPhoto] = useState(null)
  const [vicePhoto, setVicePhoto] = useState(null)

  const [activeMenu, setActiveMenu] = useState("dashboard")

  /* =========================
     GET DATA
  ========================= */
  const getCandidates = async () => {
    try {
      const response = await api.get("/candidates")
      setCandidates(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getCandidates()
    }
    fetchData()
  }, [])

  /* =========================
     ADD CANDIDATE
  ========================= */
  const addCandidate = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("electionTitle", electionTitle)
      formData.append("teamName", teamName)
      formData.append("chairman", chairman)
      formData.append("viceChairman", viceChairman)
      formData.append("vision", vision)
      formData.append("mission", mission)
      formData.append("chairmanPhoto", chairmanPhoto)
      formData.append("vicePhoto", vicePhoto)

      await api.post("/candidates", formData)

      alert("Pasangan calon berhasil ditambahkan")

      setElectionTitle("")
      setTeamName("")
      setChairman("")
      setViceChairman("")
      setVision("")
      setMission("")
      setChairmanPhoto(null)
      setVicePhoto(null)

      setActiveMenu("list")
      getCandidates()
    } catch (error) {
      console.log(error)
      alert("Gagal tambah kandidat")
    }
  }

  /* =========================
     DELETE
  ========================= */
  const deleteCandidate = async (id) => {
    if(window.confirm("Yakin ingin menghapus kandidat ini?")) {
      try {
        await api.delete(`/candidates/${id}`)
        getCandidates()
      } catch (error) {
        console.log(error)
      }
    }
  }

  /* =========================
     TOTAL VOTES
  ========================= */
  const totalVotes = candidates.reduce(
    (total, item) => total + item.votes,
    0
  )

  /* =========================
     WINNER
  ========================= */
  let winner = null

  if (candidates.length > 0) {
    const maxVote = Math.max(...candidates.map((c) => c.votes))
    const winners = candidates.filter((c) => c.votes === maxVote)

    if (winners.length > 1) {
      winner = {
        teamName: "SERI",
      }
    } else {
      winner = winners[0]
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">

      {/* MEMANGGIL KOMPONEN SIDEBAR & MENGOPER PROPS */}
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* CONTENT AREA */}
      <div className="flex-1 p-10 xl:p-14 overflow-y-auto">

        {/* --- VIEW: DASHBOARD & STATS --- */}
        {activeMenu === 'dashboard' && (
          <div className="animate-fade-in">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-800 mb-2">Overview Statistik</h1>
              <p className="text-slate-500 text-lg">Pantau jalannya pemilihan secara real-time.</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-medium text-sm uppercase tracking-wider mb-2">Total Kandidat</p>
                  <h1 className="text-5xl font-black text-slate-800">{candidates.length}</h1>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-3xl shadow-inner">
                  <FaUsers />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-medium text-sm uppercase tracking-wider mb-2">Total Suara Masuk</p>
                  <h1 className="text-5xl font-black text-slate-800">{totalVotes}</h1>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 text-3xl shadow-inner">
                  <FaVoteYea />
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-400 to-orange-500 p-8 rounded-3xl shadow-md text-white flex items-center justify-between">
                <div>
                  <p className="text-white/80 font-medium text-sm uppercase tracking-wider mb-2">Pemenang Sementara</p>
                  <h1 className="text-4xl font-black drop-shadow-sm">
                    {winner ? winner.teamName : "-"}
                  </h1>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl">
                  <FaCrown />
                </div>
              </div>
            </div>

            {/* CHART */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Grafik Perolehan Suara</h2>
              <div className="h-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={candidates} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="teamName" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="votes" fill="#6366f1" radius={[8, 8, 0, 0]} maxBarSize={80} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: ADD CANDIDATE --- */}
        {activeMenu === 'add' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-800 mb-2">Pendaftaran Kandidat</h1>
              <p className="text-slate-500 text-lg">Lengkapi form di bawah ini untuk menambahkan kandidat baru.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <form onSubmit={addCandidate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Judul Pemilihan</label>
                  <select
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 cursor-pointer"
                    value={electionTitle}
                    onChange={(e) => setElectionTitle(e.target.value)}
                    required
                  >
                    <option value="" disabled>-- Pilih Kategori Pemilihan --</option>
                    <option value="PEMILIHAN KETUA KELAS">1. PEMILIHAN KETUA KELAS</option>
                    <option value="PEMILIHAN KETUA OSIS">2. PEMILIHAN KETUA OSIS</option>
                    <option value="PEMILIHAN GUBERNUR MAHASISWA">3. PEMILIHAN GUBERNUR MAHASISWA</option>
                    <option value="PEMILIHAN PRESIDEN MAHASISWA">4. PEMILIHAN PRESIDEN MAHASISWA</option>
                    <option value="PEMILIHAN LAINNYA">5. PEMILIHAN ........</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Nama Tim / Partai</label>
                  <input
                    type="text"
                    placeholder="Contoh: Tim Harapan Bangsa"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Nama Ketua</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama ketua"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={chairman}
                    onChange={(e) => setChairman(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Nama Wakil Ketua</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama wakil ketua"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={viceChairman}
                    onChange={(e) => setViceChairman(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Foto Ketua (Rekomendasi 1:1)</label>
                  <input
                    type="file"
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                    onChange={(e) => setChairmanPhoto(e.target.files[0])}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Foto Wakil Ketua (Rekomendasi 1:1)</label>
                  <input
                    type="file"
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
                    onChange={(e) => setVicePhoto(e.target.files[0])}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Visi</label>
                  <textarea
                    placeholder="Tuliskan visi pasangan calon..."
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 h-32 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 ml-2">Misi</label>
                  <textarea
                    placeholder="Tuliskan misi pasangan calon..."
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 h-32 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <button className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.99] transition-all text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30">
                    <FaPlus />
                    Simpan Kandidat Baru
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- VIEW: LIST KANDIDAT --- */}
        {activeMenu === 'list' && (
          <div className="animate-fade-in">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-800 mb-2">Daftar Kandidat</h1>
              <p className="text-slate-500 text-lg">Kelola dan lihat profil lengkap pasangan calon.</p>
            </div>

            {candidates.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xl font-medium">Belum ada data kandidat.</p>
              </div>
            ) : (
              <div className="grid xl:grid-cols-2 gap-8">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* HEADER */}
                    <div className="bg-linear-to-r from-slate-800 to-slate-900 p-6 text-white relative">
                      <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-wider font-semibold border border-white/20">
                        TIM {candidate.teamName.toUpperCase()}
                      </div>
                      <h2 className="text-xl font-bold pr-24">{candidate.electionTitle}</h2>
                    </div>

                    {/* FOTO PASANGAN */}
                    <div className="px-8 pt-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                          <img
                            src={`http://localhost:3000/uploads/${candidate.chairmanPhoto}`}
                            alt={candidate.chairman}
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-50 shadow-md"
                          />
                          <h3 className="mt-4 text-lg font-bold text-slate-800 min-h-14 flex items-center justify-center text-center leading-tight">
                            {candidate.chairman}
                          </h3>
                          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mt-1">
                            Calon Ketua
                          </span>
                        </div>

                        <div className="text-center group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                          <img
                            src={`http://localhost:3000/uploads/${candidate.vicePhoto}`}
                            alt={candidate.viceChairman}
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-purple-50 shadow-md"
                          />
                          <h3 className="mt-4 text-lg font-bold text-slate-800 min-h-14 flex items-center justify-center text-center leading-tight">
                            {candidate.viceChairman}
                          </h3>
                          <span className="inline-block bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1 rounded-full mt-1">
                            Calon Wakil Ketua
                          </span>
                        </div>
                      </div>

                      {/* VISI & MISI */}
                      <div className="mt-8 flex flex-col gap-4">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <h3 className="text-indigo-600 font-black text-sm uppercase tracking-wider mb-2">Visi</h3>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {candidate.vision}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <h3 className="text-purple-600 font-black text-sm uppercase tracking-wider mb-2">Misi</h3>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {candidate.mission}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="p-8 mt-auto">
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between mb-4">
                        <div>
                          <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Perolehan Suara</p>
                          <h2 className="text-3xl font-black text-slate-800">{candidate.votes}</h2>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                          <FaVoteYea size={24} />
                        </div>
                      </div>

                      <button
                        onClick={() => deleteCandidate(candidate.id)}
                        className="w-full bg-white border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-500 text-rose-500 hover:text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300"
                      >
                        <FaTrash />
                        Hapus Pasangan Calon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}