// Import Next.js router
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();

  // Handle "Start a Session" button click
  const handleStartSession = () => {
    router.push("/login"); // Navigate to login page
  };

  // Handle "Search for Nearby Charging Stations" button click
  const handleMapSearch = () => {
    router.push("/map"); // Navigate to Google Maps page
  };

  return (
    <div className="container">
      <div className="button-group">
        {/* Button to start a charging session */}
        <div className="session-window" onClick={handleStartSession}>
          <h2>Start a Session</h2>
        </div>

        {/* Button to search for EV charging stations */}
        <div className="session-window" onClick={handleMapSearch}>
          <h2>Search for Nearby Charging Stations</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
