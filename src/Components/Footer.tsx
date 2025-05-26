export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">CryptoSim</h2>
          <p className="mt-4 text-sm leading-relaxed">
            The best risk-free crypto trading simulator.<br />
            Learn, trade, and compete like a pro.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Features", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-green-400 transition duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        © {2025} CryptoSim. All rights reserved.
      </div>
    </footer>
  );
}
