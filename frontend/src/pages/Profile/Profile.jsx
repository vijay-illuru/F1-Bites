import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    location: "",
    pincode: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setProfile({
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        city: res.data.city || "",
        location: res.data.location || "",
        pincode: res.data.pincode || "",
      });
      setIsAdmin(res.data.isAdmin || false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      // Fallback to localStorage if API fails
      const stored = JSON.parse(localStorage.getItem("profile") || "null");
      if (stored) setProfile(stored);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      const res = await api.put("/profile", {
        username: profile.username,
        phone: profile.phone,
        city: profile.city,
        location: profile.location,
        pincode: profile.pincode,
      });
      
      // Also save to localStorage as backup
      localStorage.setItem("profile", JSON.stringify(profile));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(err.response?.data?.message || "Failed to save profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Force hard navigation so auth state resets immediately
    window.location.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-end justify-between">
          <div>
            {isAdmin && (
              <div className="mb-2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ADMIN
                </span>
              </div>
            )}
            <h1 className={`text-4xl font-extrabold tracking-tight bg-clip-text text-transparent ${
              isAdmin 
                ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-red-500' 
                : 'bg-gradient-to-r from-red-500 via-rose-400 to-amber-400'
            }`}>
              {isAdmin ? 'Admin Profile' : 'My Profile'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isAdmin 
                ? 'Manage your admin account details' 
                : 'Your details are used to auto-fill checkout.'}
            </p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold shadow-sm hover:shadow-md hover:bg-black transition">
            Logout
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                name="username" 
                value={profile.username} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400" 
              />
              <input 
                name="email" 
                type="email" 
                value={profile.email} 
                disabled
                placeholder="Email" 
                className="w-full border p-3 rounded-xl bg-gray-100 cursor-not-allowed" 
                title="Email cannot be changed"
              />
              <input 
                name="phone" 
                value={profile.phone} 
                onChange={handleChange} 
                placeholder="Phone (optional)" 
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400" 
              />
              <input 
                name="city" 
                value={profile.city} 
                onChange={handleChange} 
                placeholder="City (optional)" 
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400" 
              />
              <input 
                name="location" 
                value={profile.location} 
                onChange={handleChange} 
                placeholder="Location / Address (optional)" 
                className="w-full border p-3 rounded-xl sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-400" 
              />
              <input 
                name="pincode" 
                value={profile.pincode} 
                onChange={handleChange} 
                placeholder="Pincode (optional)" 
                className="w-full border p-3 rounded-xl sm:col-span-1 focus:outline-none focus:ring-2 focus:ring-red-400" 
              />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button 
                onClick={handleSave} 
                className={`px-6 py-3 rounded-xl text-white font-semibold shadow-sm hover:shadow-md transition ${
                  isAdmin 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Save Profile
              </button>
              {saved && <span className="text-green-600 text-sm font-medium">✓ Saved successfully!</span>}
            </div>
          </div>

          <div className="lg:col-span-1 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-3">
              {isAdmin ? 'Admin Info' : 'Tips'}
            </h2>
            {isAdmin ? (
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Your profile data is stored in MongoDB</li>
                <li>All fields except email are optional</li>
                <li>Contact details help with notifications</li>
              </ul>
            ) : (
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Use the same email you'll use at checkout.</li>
                <li>City and pincode help speed up delivery.</li>
                <li>You can update these anytime.</li>
                <li>All fields are optional except email.</li>
              </ul>
            )}
          </div>
        </div>

        {/* Orders - only show for regular users */}
        {!isAdmin && (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            <OrdersList />
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersList() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      // Fallback to localStorage
      const saved = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(saved);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-600">No orders yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {orders.map((o) => (
        <li key={o._id || o.id} className="border rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Order #{o._id || o.id}</span>
            <span>{new Date(o.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">Total: ₹{o.totalAmount}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              o.status === 'delivered' ? 'bg-green-100 text-green-800' :
              o.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
              o.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
              o.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {o.status ? o.status.replace('_', ' ').toUpperCase() : 'PENDING'}
            </span>
          </div>
          <ul className="mt-2 text-sm list-disc pl-5">
            {o.items.map((it, idx) => (
              <li key={idx}>{it.name} × {it.quantity} — ₹{it.price * it.quantity}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Profile;


