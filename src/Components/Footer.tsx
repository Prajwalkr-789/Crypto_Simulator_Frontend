export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">CryptoSim</h2>
            <p className="mt-3 text-sm">
              The best risk-free crypto trading simulator. Learn, trade, and compete!
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
            </ul>
          </div>
  
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
        </div>
  
        {/* Bottom Line */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} CryptoSim. All rights reserved.
        </div>
      </footer>
    );
  }
  