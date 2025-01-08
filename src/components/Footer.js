export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-400 relative">
        <div className="container mx-auto px-4 py-6 flex items-center justify-center h-16">
          {/* Social Media Links */}
          <ul className="absolute bottom-4 right-8 flex space-x-6">
            <li>
              <a
                href="https://www.instagram.com/manyam_karthik/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/manyamkarthik"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/karthik-manyam"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </li>
          </ul>

          {/* Built with love */}
          <div className="text-center text-sm">
            Built with{" "}
            <span role="img" aria-label="love" className="text-red-500">
              ❤️
            </span>{" "}
            by <b className="text-gray-300">Karthik</b>
          </div>
        </div>
      </footer>
      
    </>
  );
};
