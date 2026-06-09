export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-700 via-purple-700 to-blue-700">
      <div className="w-105 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          {title}
        </h1>
        <p className="text-white/70 text-center mb-8">
          {subtitle}
        </p>
        
        {children} 
        
      </div>
    </div>
  )
}