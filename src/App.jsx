import { useState } from 'react'
import cafes from './cafe.json'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  const getImageUrl = (name) => {
    return new URL(`./assets/${name}`, import.meta.url).href
  }

  // 1. Urutkan cafe berdasarkan abjad (A-Z)
  const sortedCafes = [...cafes].sort((a, b) => 
    a.nama.localeCompare(b.nama)
  )

  // 2. Filter cafe yang sudah diurutkan berdasarkan input pencarian
  const filteredCafes = sortedCafes.filter((cafe) =>
    cafe.nama.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
              CAFE <span className="text-orange-500">PURWOREJO</span>
            </h1>
            <p className="text-slate-400 mt-3 text-sm md:text-base font-medium">
              Daftar Cafe Di Purworejo.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative group px-2">
            <input
              type="text"
              placeholder="Cari nama cafe favoritmu..."
              className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none shadow-sm group-hover:shadow-md text-slate-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-5 py-8 md:py-16">
        {filteredCafes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredCafes.map((cafe) => (
              <div key={cafe.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                
                {/* IMAGE SECTION */}
                <div className="relative h-56 md:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(cafe.image)}
                    alt={cafe.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                      {cafe.lokasi}
                    </span>
                  </div>
                </div>

                {/* SIMPLIFIED ATRIBUTION BAR - CLEAN VERSION */}
                <div className="py-3 bg-slate-50/80 border-b border-slate-100 flex justify-center items-center">
                  <a 
                    href={cafe.sumber_foto} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-orange-600 font-semibold text-xs md:text-sm hover:text-orange-700 transition-colors"
                  >
                    Original Link Photo
                  </a>
                </div>

                {/* INFO SECTION */}
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-tight">{cafe.nama}</h2>
                  <p className="text-slate-400 text-xs md:text-sm mb-6 flex items-start gap-1">
                    <span className="text-orange-500 text-base">📍</span> {cafe.alamat}
                  </p>

                  <div className="flex gap-3">
                    {/* Maps Button */}
                    <a 
                      href={cafe.gmaps} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-[3] bg-slate-900 text-white flex items-center justify-center py-4 rounded-xl hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                      </svg>
                    </a>

                    {/* Instagram Button */}
                    <a 
                      href={cafe.instagram} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 bg-orange-50 text-orange-500 flex items-center justify-center py-4 rounded-xl hover:bg-orange-100 transition-all active:scale-95 border border-orange-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-slate-300 font-bold text-xl italic">Cafe "{searchTerm}" tidak ditemukan...</h3>
          </div>
        )}
      </main>

      <footer className="text-center py-12 border-t border-slate-100 px-5 bg-slate-50/30">
  <div className="max-w-3xl mx-auto">
    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold mb-2">
      Semoga bermanfaat untuk kalian yang lagi cari tempat nongkrong asik di Purworejo!
    </p>
    
    <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">
      Maaf kalau belum lengkap, nanti akan terus diupdate. <br className="hidden md:block" />
      Izin pakai asset fotonya dan sudah aku cantumkan link foto aslinya.
      <br></br>
       Maaf kalau ada kesalahan data, aku buat ini cuma untuk latihan dan iseng-iseng aja kok hehe.
    </p>

    <div className="mt-8 pt-6 border-t border-slate-100/50">
    </div>
  </div>
</footer>
    </div>
  )
}

export default App