export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-6">
        {/* Social Media Links - Stack on mobile */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <div className="text-center text-sm">
            Built with{" "}
            <span role="img" aria-label="love" className="text-red-500">
              ❤️
            </span>{" "}
            by <b className="text-gray-300">Karthik</b>
          </div>
          
          <ul className="flex space-x-6">
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
        </div>
      </div>
    </footer>
  );
};