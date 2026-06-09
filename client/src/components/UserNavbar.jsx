import { useState } from "react"
import { FaVoteYea, FaUser, FaSignOutAlt } from "react-icons/fa"

export default function UserNavbar({ currentUser, handleLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <>
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20">
            <FaVoteYea />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">
              E-Voting
            </h1>
            <p className="text-indigo-500 text-xs font-bold mt-1 tracking-wider uppercase">
              Politeknik
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {currentUser && (
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">{currentUser.name}</p>
                <p className="text-xs text-slate-500 mt-1">{currentUser.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-sm">
                <FaUser className="text-lg" />
              </div>
            </div>
          )}

          <div className="hidden md:block w-px h-8 bg-slate-200"></div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-white border-2 border-rose-100 hover:bg-rose-50 hover:border-rose-200 text-rose-500 px-5 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-4xl p-8 md:p-10 max-w-sm w-full shadow-2xl transform transition-all">
            <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <FaSignOutAlt className="-ml-1" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 text-center mb-3">
              Konfirmasi Keluar
            </h2>
            <p className="text-slate-500 text-center mb-8 leading-relaxed">
              Apakah Anda yakin ingin keluar dari halaman pemilihan?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false)
                  handleLogout()
                }} 
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-rose-500/30 transition-all active:scale-95"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}