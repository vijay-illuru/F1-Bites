import { useLocation, Link } from "react-router-dom";

function Footer() {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname==="/admin/login" || location.pathname==="/admin/signup") return null;

  return (
    <footer className="mt-10 border-t border-gray-200 bg-white/80 backdrop-blur">
     
      <div className="h-1 bg-gradient-to-r from-red-600 via-white to-black" />
      <div className="max-w-6xl mx-auto px-6 py-10 text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">F1 Bites</div>
            <p className="text-sm text-gray-600 mt-2">Premium snacks tuned for speed, quality, and delight.</p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li><Link className="hover:text-red-600" to="/">Home</Link></li>
              <li><Link className="hover:text-red-600" to="/about">About</Link></li>
              <li><Link className="hover:text-red-600" to="/cart">Cart</Link></li>
              <li><Link className="hover:text-red-600" to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Stay Updated</div>
            <p className="text-sm text-gray-600">New drops, special offers, and race-day treats.</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6" />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} F1 Bites. All rights reserved.</span>
          <span>Built with MERN & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
