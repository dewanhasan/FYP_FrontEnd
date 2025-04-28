// Importing Navbar and Footer components
import Navbar from "../component/NavBar";
import Footer from "@/component/Footer";

// Importing global and specific CSS styles
import "../styles/globals.css";
import "../styles/NavBar.css";
import "../styles/footer.css";
import "../styles/index.css";
import "../styles/session.css";
import "../styles/map.css";
import "../styles/payment.css";
import "../styles/login.css";

// Main App component that wraps all pages
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Render the main page content */}
      <Component {...pageProps} />

      {/* Navbar stays consistent across all pages */}
      <Navbar />

      {/* Footer stays consistent across all pages */}
      <Footer />
    </>
  );
}

