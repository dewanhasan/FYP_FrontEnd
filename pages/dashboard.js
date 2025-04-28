import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  // State to store user name, defaults to Guest
  const [user, setUser] = useState("Guest");

  // State to store battery status and current reading
  const [battery, setBattery] = useState("Loading...");
  const [current, setCurrent] = useState(null);

  // State to track charging session
  const [isCharging, setIsCharging] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Fetch user's name from localStorage when page loads
  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    if (storedName) {
      setUser(storedName);
    }
  }, []);

  // Format seconds into mm:ss format
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // API call to clear previous session graph data
  const clearGraphData = async () => {
    try {
      await fetch("http://localhost:5000/api/clear-session-graph", {
        method: "POST",
      });
      console.log("✅ Previous session graph data cleared.");
    } catch (err) {
      console.error("Error clearing graph data:", err);
    }
  };

  // Fetch real-time charging session data
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/session-data")
        .then((res) => res.json())
        .then((data) => {
          setBattery(data.battery);

          try {
            setCurrent(data.current);
          } catch (err) {
            console.error("Error setting current:", err);
            setCurrent(null);
          }

          const currentlyCharging = data.battery.includes("Charging");

          // Start session if charging begins
          if (currentlyCharging && !sessionStarted) {
            clearGraphData(); // 🔥 Clear old graph when new session starts
            setSessionStarted(true);
            setIsCharging(true);
            const interval = setInterval(() => {
              setElapsedSeconds((prev) => prev + 1);
            }, 1000);
            setTimerInterval(interval);
          }
          // Resume session if charging resumes
          else if (currentlyCharging && sessionStarted && !isCharging) {
            setIsCharging(true);
            const interval = setInterval(() => {
              setElapsedSeconds((prev) => prev + 1);
            }, 1000);
            setTimerInterval(interval);
          }
          // Stop session if charging stops
          else if (!currentlyCharging && sessionStarted && isCharging) {
            setIsCharging(false);
            clearInterval(timerInterval);
            setTimerInterval(null);
          }
        })
        .catch((err) => console.error("Error fetching session data:", err));
    };

    // Fetch immediately and every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isCharging, sessionStarted, timerInterval]);

  // Handle session stop button click
  const handleStopSession = () => {
    setIsCharging(false);
    setSessionStarted(false);
    clearInterval(timerInterval);
    setTimerInterval(null);

    const isGuest = user === "Guest";
    router.push(
      `/charging-summary?duration=${elapsedSeconds}&guest=${isGuest}`
    );
  };

  return (
    <>
      <div className="welcome-banner">
        <p>Welcome, {user || "User"}</p>
      </div>

      <div className="session-container">
        <h1 className="live-heading">LIVE SESSION</h1>
        <hr className="underline" />

        {/* Instructions before session starts */}
        {!sessionStarted && (
          <div className="info-box">
            <strong>Please align the RoboCar to the Charging Pad</strong>
          </div>
        )}

        {/* Always show current battery status */}
        <div className="info-box">
          <strong>{battery}</strong>
        </div>

        {/* Live session stats */}
        {sessionStarted && (
          <>
            {isCharging && current !== null && (
              <div className="info-box">
                <strong>Current: {parseFloat(current).toFixed(2)} A</strong>
              </div>
            )}
            <div className="info-box">
              <strong>Charging Time: {formatTime(elapsedSeconds)}</strong>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleStopSession} className="stop-button">
                Stop Session
              </button>
            </div>
          </>
        )}

        {/* Additional options for logged in users */}
        {user !== "Guest" && (
          <>
            <div className="top-right-button">
              <button
                className="view-sessions-button"
                onClick={() => router.push("/sessionList")}
              >
                View My Past Sessions
              </button>
            </div>

            <div className="logout-container">
              <button
                className="logout-button"
                onClick={() => {
                  localStorage.removeItem("fullname");
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
