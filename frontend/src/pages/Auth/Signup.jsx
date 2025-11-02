import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../../utils/api";
import f1 from "../../assets/f1.png";
import sideImage from "../../assets/f1-redbull.png";
import googleLogo from "../../assets/google.png";
import userIcon from "../../assets/user.png";
import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/padlock.png";

function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", {
        username,
        email,
        password,
      });
  
      console.log("Response from backend:", res.data); // Debug log
  
      if (!res.data.token) {
        alert("No token received from server");
        return;
      }
  
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log("Signup error:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };
  

  const handleGoogleSignup = () => {
    /* global google */
    const clientId = document.querySelector('meta[name="google-signin-client_id"]').content;
    if (!window.google || !clientId) {
      alert("Google Sign-In not configured");
      return;
    }
    const client = google.accounts.id;
    client.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.credential) {
          // For demo: store Google credential directly; ideally send to backend to exchange for JWT
          localStorage.setItem("token", response.credential);
          setIsAuthenticated(true);
          navigate("/");
        }
      },
    });
    client.prompt();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
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
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Signup</h1>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="relative">
              <img src={userIcon} alt="User Icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base w-full"
                required
              />
            </div>

            <div className="relative">
              <img src={emailIcon} alt="Email Icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base w-full"
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
                className="border p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base w-full"
                required
              />
            </div>

            <button type="submit" className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-sm hover:shadow-md hover:bg-red-600 transition">
              Signup
            </button>

          </form>

          <p className="mt-6 text-gray-600 text-center text-sm">
            Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link>
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm">
              Are you an administrator?{" "}
              <Link to="/admin/login" className="text-amber-600 hover:underline font-semibold">
                Login as Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
