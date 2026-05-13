export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo + Copyright */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-500 w-10 h-10 rounded-lg"></div>
              <h2 className="text-2xl font-bold text-orange-500">Swiggy</h2>
            </div>
            <p className="text-sm">© 2025 Swiggy Limited</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Minis</li>
              <li>Pyng</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2 text-sm">
              <li>Help & Support</li>
              <li>Partner With Us</li>
              <li>Ride With Us</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4">Available in:</h3>
            <ul className="space-y-2 text-sm">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>

            <select className="mt-4 border rounded-md px-3 py-1 text-sm">
              <option>685 cities</option>
            </select>
          </div>

          {/* Life + Social */}
          <div>
            <h3 className="font-semibold mb-4">Life at Swiggy</h3>
            <ul className="space-y-2 text-sm">
              <li>Explore With Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">Social Links</h3>
            <div className="flex gap-4 text-xl">
              <span>🔗</span>
              <span>📸</span>
              <span>📘</span>
              <span>📌</span>
              <span>🐦</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg font-semibold text-gray-800 text-center md:text-left">
            For better experience, download the Swiggy app now
          </p>

          <div className="flex gap-4">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              className="h-12"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              className="h-12"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
