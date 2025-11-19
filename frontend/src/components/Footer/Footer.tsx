/**
 * Compact footer that mirrors the prototype layout exactly.
 */
export const Footer = () => (
  <footer className="bg-gray-900 mt-12">
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
            }}
          >
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <span className="text-sm text-gray-400">&copy; 2024 Redaktionen</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          {["About", "API", "Privacy", "Contact"].map((label) => (
            <a
              key={label}
              className="hover:text-white transition-colors"
              href="#"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
