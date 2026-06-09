import { useState } from "react"
import { FaChartBar, FaPlus, FaUsers, FaSignOutAlt } from "react-icons/fa"

export default function AdminSidebar({ activeMenu, setActiveMenu }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleConfirmLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <>
      <div className="w-[320px] bg-linear-to-b from-indigo-800 via-purple-800 to-indigo-950 text-white p-8 shadow-2xl flex flex-col justify-between relative z-10">
        <div>
          <h1 className="text-4xl font-black mb-10 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-white">
            E-Voting
          </h1>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-5 mb-8 backdrop-blur-md shadow-inner">
            <div className="flex items-center gap-4">
              <img
                src="http://localhost:3000/uploads/1779351422324-WhatsApp-Image-2026-04-28-at-14.43.33.jpeg"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 shadow-lg"
                alt="Admin Profile"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff' 
                }}
              />
              <div>
                <h2 className="text-lg font-bold">Hendi Firmansah</h2>
                <p className="text-indigo-200 text-sm font-medium">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <button 
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full transition-all duration-300 py-4 rounded-2xl flex items-center gap-4 px-6 text-lg font-semibold ${activeMenu === 'dashboard' ? 'bg-white/20 shadow-md border border-white/20 translate-x-2' : 'hover:bg-white/10 hover:translate-x-1 text-white/70 hover:text-white'}`}
            >
              <FaChartBar className={activeMenu === 'dashboard' ? 'text-indigo-300' : ''} />
              Dashboard
            </button>
            
            <button 
              onClick={() => setActiveMenu('add')}
              className={`w-full transition-all duration-300 py-4 rounded-2xl flex items-center gap-4 px-6 text-lg font-semibold ${activeMenu === 'add' ? 'bg-white/20 shadow-md border border-white/20 translate-x-2' : 'hover:bg-white/10 hover:translate-x-1 text-white/70 hover:text-white'}`}
            >
              <FaPlus className={activeMenu === 'add' ? 'text-indigo-300' : ''} />
              Tambah Kandidat
            </button>

            <button 
              onClick={() => setActiveMenu('list')}
              className={`w-full transition-all duration-300 py-4 rounded-2xl flex items-center gap-4 px-6 text-lg font-semibold ${activeMenu === 'list' ? 'bg-white/20 shadow-md border border-white/20 translate-x-2' : 'hover:bg-white/10 hover:translate-x-1 text-white/70 hover:text-white'}`}
            >
              <FaUsers className={activeMenu === 'list' ? 'text-indigo-300' : ''} />
              Daftar Kandidat
            </button>
          </nav>
        </div>

        <button
          className="w-full bg-rose-500/80 hover:bg-rose-500 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-lg hover:shadow-rose-500/30"
          onClick={() => setShowLogoutModal(true)}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

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
              Apakah Anda yakin ingin mengakhiri sesi administrator ini?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmLogout} 
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