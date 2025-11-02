import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Credit Card",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    fetchCart();
    // Prefill from profile if available
    const storedProfile = JSON.parse(localStorage.getItem("profile") || "null");
    if (storedProfile) {
      setCustomer((prev) => ({
        ...prev,
        name: storedProfile.name || prev.name,
        email: storedProfile.email || prev.email,
        city: storedProfile.city || prev.city,
        pincode: storedProfile.pincode || prev.pincode,
        address: storedProfile.location || prev.address,
      }));
    }
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart");
      setCartItems(response.data.items);
      const total = response.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("Error fetching cart:", err);
      // Fallback to localStorage
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const cleanedCart = savedCart.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      }));
      setCartItems(cleanedCart);
      const total = cleanedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { name, email, address, city, pincode, payment } = customer;
    if (!name || !email || !address || !city || !pincode) {
      alert("Please fill all details!");
      return;
    }

    try {
      setPlacing(true);
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        customer: { name, email, address, city, pincode },
        paymentMethod: payment
      };

      const response = await api.post("/orders", orderData);
      
      // Clear cart after successful order
      await api.delete("/cart/clear");
      
      setOrderPlaced(true);
      localStorage.removeItem("cart"); // Clear localStorage backup too
    } catch (err) {
      console.error("Error placing order:", err);
      alert(err.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-white flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-10 shadow-sm">
            {/* success check animation */}
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-pop">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-green-600">
                <path fill="currentColor" d="M9 16.2l-3.5-3.5a1 1 0 10-1.4 1.4l4.2 4.2a1 1 0 001.4 0l10-10a1 1 0 10-1.4-1.4L9 16.2z"/>
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              Order Placed
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              We’re confirming your order and preparing it for dispatch. A receipt has been sent to your email.
            </p>

            {/* subtle progress bar */}
            <div className="mt-8 h-2 w-56 mx-auto rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 animate-progress" />
            </div>

            <div className="mt-8">
              <button 
                onClick={() => navigate("/")} 
                className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-sm hover:shadow-md hover:bg-red-600 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <style>
            {`
              @keyframes progressMove { 0% { transform: translateX(-100%);} 100% { transform: translateX(0);} }
              .animate-progress { animation: progressMove 1.2s ease-out forwards; }
              @keyframes pop { 0% { transform: scale(0.8); opacity: 0;} 100% { transform: scale(1); opacity: 1;} }
              .animate-pop { animation: pop 400ms ease-out forwards; }
            `}
          </style>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">₹{item.price} × {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="mt-4 text-right text-xl font-bold">
            Total: ₹{totalAmount}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Details</h2>
          <input type="text" name="name" placeholder="Full Name" value={customer.name} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="city" placeholder="City / Location" value={customer.city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="number" name="pincode" placeholder="Pincode" value={customer.pincode} onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="address" placeholder="Address" value={customer.address} onChange={handleChange} className="w-full border p-2 rounded" />
          
          <select name="payment" value={customer.payment} onChange={handleChange} className="w-full border p-2 rounded">
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
            <option>Cash on Delivery</option>
          </select>

          <button 
            onClick={handlePlaceOrder} 
            disabled={placing}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition mt-4 w-full"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
