import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import UserNavbar from "../components/UserNavbar"

import {
  FaVoteYea,
  FaCheckCircle,
  FaEye,
  FaRocket,
  FaExclamationTriangle
} from "react-icons/fa"

export default function Candidates() {
  const [candidates, setCandidates] = useState([])
  const [selected, setSelected] = useState(false)
  
  // State khusus untuk Modal Voting
  const [confirmVoteId, setConfirmVoteId] = useState(null)
  
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/candidates")
        setCandidates(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCandidates()
  }, [])

  /* VOTE EKSEKUSI (Jalan setelah user menekan tombol 'Ya, Coblos' di Pop-Up) */
  const handleConfirmVote = async () => {
    if (!confirmVoteId) return;

    try {
      const token = localStorage.getItem("token")
      await api.post(
        `/votes/${confirmVoteId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      alert("Suara Anda berhasil disimpan! Terima kasih.")
      setSelected(true)
      setConfirmVoteId(null) // Tutup Pop-Up
      
      const response = await api.get("/candidates")
      setCandidates(response.data)
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Voting gagal")
      setConfirmVoteId(null)
    }
  }

  /* LOGOUT EKSEKUSI (Tanpa window.confirm karena sudah ada di UserNavbar) */
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  // Cari data kandidat yang sedang dipilih untuk ditampilkan di Modal
  const selectedCandidateToVote = candidates.find(c => c.id === confirmVoteId)

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24 selection:bg-indigo-100 selection:text-indigo-900">

      <UserNavbar currentUser={currentUser} handleLogout={handleLogout} />

      {/* HERO SECTION */}
      <div className="relative text-center pt-16 pb-12 px-4 max-w-4xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-indigo-400/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight drop-shadow-sm">
          {candidates.length > 0 ? candidates[0]?.electionTitle : "Memuat Data..."}
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium">
          Masa depan ada di tangan Anda. Tentukan pilihan terbaik hari ini.
        </p>
      </div>

      {/* LIST KANDIDAT */}
      <div className="max-w-6xl mx-auto px-6">
        {candidates.length === 0 ? (
           <div className="text-center text-slate-400 py-10 font-medium">Memuat data kandidat...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col relative group"
              >
                
                {/* STATUS BADGE */}
                {(selected || candidate.voted) && (
                  <div className="absolute top-5 right-5 z-20 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30 backdrop-blur-md">
                    <FaCheckCircle className="text-sm" /> Suara Tersimpan
                  </div>
                )}

                {/* HEADER GRAFIS */}
                <div className="h-40 bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>

                {/* FOTO PASANGAN */}
                <div className="flex justify-center gap-6 md:gap-10 -mt-16 relative z-10 px-6">
                  <div className="flex flex-col items-center">
                    <div className="relative group-hover:-translate-y-1 transition-transform duration-500">
                      <img
                        src={`http://localhost:3000/uploads/${candidate.chairmanPhoto}`}
                        alt={candidate.chairman}
                        className="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border-[5px] border-white shadow-xl bg-white"
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ketua&background=e2e8f0&color=475569' }}
                      />
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-700 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm whitespace-nowrap">
                        Calon Ketua
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                      <img
                        src={`http://localhost:3000/uploads/${candidate.vicePhoto}`}
                        alt={candidate.viceChairman}
                        className="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border-[5px] border-white shadow-xl bg-white"
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Wakil&background=e2e8f0&color=475569' }}
                      />
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-100 text-purple-700 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm whitespace-nowrap">
                        Calon Wakil
                      </div>
                    </div>
                  </div>
                </div>

                {/* KONTEN TEXT */}
                <div className="p-8 md:p-10 flex-1 flex flex-col pt-12">
                  <div className="text-center mb-8">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-xs font-bold tracking-widest uppercase mb-4 border border-slate-200/60 shadow-sm">
                      Tim {candidate.teamName}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-none">
                      {candidate.chairman}
                    </h2>
                    <div className="text-slate-300 font-serif italic text-2xl leading-none my-2">&</div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-none">
                      {candidate.viceChairman}
                    </h2>
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    <div className="relative p-6 rounded-3xl bg-linear-to-br from-indigo-50/50 to-white border border-indigo-100/60 hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                          <FaEye className="text-sm" />
                        </div>
                        <h3 className="font-extrabold text-indigo-900 text-xs uppercase tracking-widest">Visi</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {candidate.vision}
                      </p>
                    </div>
                    
                    <div className="relative p-6 rounded-3xl bg-linear-to-br from-purple-50/50 to-white border border-purple-100/60 hover:border-purple-200 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
                          <FaRocket className="text-sm" />
                        </div>
                        <h3 className="font-extrabold text-purple-900 text-xs uppercase tracking-widest">Misi</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                        {candidate.mission}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {/* KLIK INI AKAN MEMBUKA MODAL, BUKAN LANGSUNG VOTING */}
                    <button
                      disabled={selected || candidate.voted}
                      onClick={() => setConfirmVoteId(candidate.id)}
                      className={`w-full py-4 md:py-5 rounded-2xl text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] ${
                        selected || candidate.voted
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200"
                          : "bg-slate-900 hover:bg-indigo-600 text-white shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/30"
                      }`}
                    >
                      {selected || candidate.voted ? (
                        <>
                          <FaCheckCircle className="text-xl" />
                          Telah Dicoblos
                        </>
                      ) : (
                        <>
                          <FaVoteYea className="text-xl" />
                          Coblos Pasangan Ini
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POP-UP MODAL KONFIRMASI VOTING */}
      {confirmVoteId && selectedCandidateToVote && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-4xl p-8 md:p-10 max-w-md w-full shadow-2xl transform transition-all">
            
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <FaExclamationTriangle className="-mt-1" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 text-center mb-3">
              Konfirmasi Pilihan
            </h2>
            <p className="text-slate-500 text-center mb-6 leading-relaxed">
              Apakah Anda yakin ingin memberikan suara untuk <span className="font-bold text-indigo-600 border-b-2 border-indigo-200">Tim {selectedCandidateToVote.teamName}</span>?
              <br/><br/>
              <span className="text-sm text-rose-500 font-semibold bg-rose-50 p-2 rounded-lg inline-block">
                *Peringatan: Suara yang telah masuk tidak dapat ditarik atau diubah kembali.
              </span>
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setConfirmVoteId(null)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold transition-colors"
              >
                Kembali
              </button>
              <button 
                onClick={handleConfirmVote} 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
              >
                Ya, Coblos!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}