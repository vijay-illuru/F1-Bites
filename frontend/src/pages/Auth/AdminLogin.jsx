import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../utils/api";
import f1 from "../../assets/f1.png";
import sideImage from "../../assets/f1-redbull.png";
import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/padlock.png";

function AdminLogin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/admin/login", {
        email,
        password,
        adminKey,
      });
      
      // Save JWT token and admin status to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", "true");
      setIsAuthenticated(true);
      
      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* top brand bar */}
      <div className="flex items-center justify-center py-6">
        <img src={f1} alt="Logo" className="w-36 sm:w-44 md:w-52" />
      </div>

      <div className="container mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Visual */}
        <div className="hidden md:block">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={sideImage} alt="Visual" className="w-full h-[520px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Form card */}
        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              ADMIN ACCESS
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-400 to-red-500">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            <div className="relative">
              <img src={emailIcon} alt="Email Icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base w-full"
                required
              />
            </div>

            <div className="relative">
              <img src={passwordIcon} alt="Password Icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base w-full"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">🔑</span>
              <input
                type="password"
                placeholder="Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="border-2 border-amber-200 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base w-full bg-amber-50"
                required
              />
            </div>

            <button 
              type="submit" 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md hover:from-amber-600 hover:to-orange-600 transition"
            >
              Login as Admin
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-center text-sm">
            Don't have an admin account?{" "}
            <a href="/admin/signup" className="text-amber-600 hover:underline font-semibold">
              Register as Admin
            </a>
          </p>
          
          <p className="mt-2 text-gray-600 text-center text-sm">
            <a href="/login" className="text-red-600 hover:underline">
              ← Back to User Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
