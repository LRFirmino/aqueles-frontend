export default function Navbar(){
    return (
        <nav  className="flex items-center justify-between bg-white shadow-md px-8 py-4 rounded-xl">
            <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-gray-800">🌈 Aqueles, né?</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</a>
                <a href="/ranking" className="text-gray-700 hover:text-blue-600 transition">Ranking</a>
            </div>
        </nav>
    );
}
