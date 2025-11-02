import React from "react";
import ferrari from "../../assets/ferrari.jpg";
import redbull from "../../assets/redbull.jpg";
import mercedes from "../../assets/mercedes.jpg";
import driverPlaceholder from "../../assets/user.png";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
          About F1 Bites
        </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
            We bring premium snacks with a touch of racing thrill — crafted for speed, quality, and pure delight in every bite.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="text-xl font-semibold mb-2">Premium Ingredients</div>
            <p className="text-gray-600">Only the finest sources make it into our products for a clean, bold taste.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="text-xl font-semibold mb-2">Lightning Fast</div>
            <p className="text-gray-600">Quick deliveries and snappy experience — because cravings can’t wait.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="text-xl font-semibold mb-2">Crafted With Care</div>
            <p className="text-gray-600">Thoughtful recipes, consistent quality, and a dash of racing spirit.</p>
          </div>
        </div>

        {/* Story section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Born from a love for motorsport and great food, F1 Bites blends the
              adrenaline of the track with a passion for taste. We obsess over details —
              texture, seasoning, and freshness — so your snack experience feels premium.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Whether you are at home, at work, or on the move, our products are designed
              to be the perfect pit stop: fast, satisfying, and unforgettable.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-r from-black via-gray-700 to-gray-300">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_40%)]" />
              <div className="absolute bottom-4 left-4 text-white/90 text-lg font-semibold">Precision. Performance. Flavor.</div>
            </div>
          </div>
        </div>

        {/* Vision banner */}
        <div className="mt-16 rounded-2xl p-8 bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 text-white shadow-md">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Our Vision</h3>
          <p className="text-white/90 max-w-3xl">
            To become the most loved snack brand by delivering exceptional taste, delightful
            experiences, and a premium feel — every single time.
          </p>
        </div>

        {/* F1 cars gallery */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">F1 Cars We Love</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition">
              <img src={ferrari} alt="Ferrari" className="w-full h-48 object-cover hover:scale-[1.03] transition-transform duration-300" />
              <div className="p-4 text-gray-700 font-semibold">Ferrari</div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition">
              <img src={redbull} alt="Red Bull" className="w-full h-48 object-cover hover:scale-[1.03] transition-transform duration-300" />
              <div className="p-4 text-gray-700 font-semibold">Red Bull Racing</div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition">
              <img src={mercedes} alt="Mercedes" className="w-full h-48 object-cover hover:scale-[1.03] transition-transform duration-300" />
              <div className="p-4 text-gray-700 font-semibold">Mercedes</div>
            </div>
          </div>
        </div>

        {/* Drivers we love */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Drivers We Love</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/70">
                <img src="/src/assets/max.jpg" alt="Max Verstappen" onError={(e)=>{e.currentTarget.src = driverPlaceholder}} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 font-semibold">Max Verstappen</div>
              <p className="text-sm text-gray-600 mt-1">Relentless pace, clinical racecraft, and champion mindset.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-900/70">
                <img src="/src/assets/lewis.png" alt="Lewis Hamilton" onError={(e)=>{e.currentTarget.src = driverPlaceholder}} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 font-semibold">Lewis Hamilton</div>
              <p className="text-sm text-gray-600 mt-1">Iconic precision, tire wizardry, and masterful consistency.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-emerald-500/70">
                <img src="/src/assets/alonso.jpg" alt="Fernando Alonso" onError={(e)=>{e.currentTarget.src = driverPlaceholder}} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 font-semibold">Fernando Alonso</div>
              <p className="text-sm text-gray-600 mt-1">Racecraft legend — instinctive, strategic, endlessly competitive.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
