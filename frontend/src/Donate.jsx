import React, { useState } from "react";
import { Droplet, Globe, Sprout, Heart } from "lucide-react";

const predefinedAmounts = [10, 25, 50, 100, 250];

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSelect = (val) => {
    setAmount(val);
    setCustomAmount("");
    setIsCustom(false);
    setError("");
    setSuccess(false);
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount("");
    setIsCustom(true);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const donationAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);
    if (!donationAmount || donationAmount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setIsProcessing(true);

    // Simulate donation process (replace with real payment integration later)
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setAmount("");
      setCustomAmount("");
      setIsCustom(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Donate to Water Footprint</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Support water conservation, research, and community programs. Every contribution helps protect our most precious resource.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Choose an amount</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Preset donations</label>
                  <span className="text-xs text-gray-500">Tap to select</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelect(val)}
                      className={`py-2 rounded-xl border text-sm font-medium transition ${
                        Number(amount) === val
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-teal-700 border-gray-200 hover:shadow-sm"
                      }`}
                      aria-pressed={Number(amount) === val}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="Enter amount"
                    className="w-full pl-9 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">You can donate any amount you feel comfortable with.</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing || (!amount && !customAmount)}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  isProcessing || (!amount && !customAmount)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isProcessing ? "Processing..." : "Donate Now"}
              </button>

              {error && <div className="text-sm text-red-600">{error}</div>}
              {success && <div className="text-sm text-emerald-700">Thank you! Your support makes a real difference.</div>}
            </form>
          </section>

          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How your donation helps</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Protect fresh water</h4>
                    <p className="text-sm text-gray-600">Support programs that safeguard rivers, lakes, and groundwater.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Build community projects</h4>
                    <p className="text-sm text-gray-600">Fund local initiatives that bring clean water to vulnerable communities.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Raise awareness</h4>
                    <p className="text-sm text-gray-600">Help us share knowledge about reducing water footprints across the globe.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Celebrate impact</h4>
                    <p className="text-sm text-gray-600">We report back on every milestone so you can see the difference you make.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 via-teal-50 to-sky-50 rounded-2xl p-7 shadow-md">
              <h3 className="text-lg font-semibold text-teal-700 mb-2">Frequently asked questions</h3>
              <dl className="space-y-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-800">Is my donation secure?</dt>
                  <dd className="mt-1">Yes — we use industry-standard encryption and never store payment details on our servers.</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-800">Can I receive a receipt?</dt>
                  <dd className="mt-1">Yes, donations are emailed to you immediately after the transaction completes.</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-800">Can I donate monthly?</dt>
                  <dd className="mt-1">Monthly giving is coming soon. For now, feel free to donate any time.</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

//                     <p className="text-sm text-gray-600">Support projects that reduce water waste and improve efficiency.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 p-4 rounded-lg bg-emerald-50">
//                   <div className="p-3 rounded-md bg-white text-green-700">
//                     <Globe className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Global Reach</h4>
//                     <p className="text-sm text-gray-600">Help us expand community programs and educational resources.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50">
//                   <div className="p-3 rounded-md bg-white text-emerald-700">
//                     <Seedling className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Sustainable Future</h4>
//                     <p className="text-sm text-gray-600">Contribute to long-term conservation and research initiatives.</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 text-center">
//                 <Heart className="mx-auto w-8 h-8 text-pink-500" />
//                 <p className="text-xs text-gray-500 mt-2">All donations are processed securely via Razorpay.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

