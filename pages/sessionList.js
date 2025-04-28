import { useEffect, useState } from "react";

export default function SessionListPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("Guest");

  useEffect(() => {
    const fullname = localStorage.getItem("fullname");
    if (fullname) setUser(fullname);

    if (fullname) {
      fetch(`http://localhost:5000/api/transactions/${fullname}`)
        .then((res) => res.json())
        .then((data) => {
          setSessions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching sessions:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="list-container">
      <h1 className="heading">📋 Charging Session History</h1>
      <hr className="line" />

      {user === "Guest" ? (
        <p className="message">This feature is available for registered members only.</p>
      ) : loading ? (
        <p className="message">Loading your sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="message">No sessions found.</p>
      ) : (
        <div className="session-list">
          {sessions.map((session, index) => (
            <div key={index} className="session-card">
              <p><strong>📅 Date:</strong> {new Date(session.timestamp).toLocaleString()}</p>
              <p><strong> Duration:</strong> {session.duration} sec</p>
              <p><strong> Method:</strong> {session.method}</p>
              <p><strong> Paid:</strong> €{session.amountPaid}</p>
              <p><strong> Original:</strong> €{session.originalAmount}</p>
              <p><strong> Discount:</strong> €{session.discount}</p>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .list-container {
          background: #0a0a0a;
          min-height: 100vh;
          color: #f0f0f0;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heading {
          font-size: 28px;
          color: #00ffee;
          margin-bottom: 10px;
        }

        .line {
          height: 2px;
          width: 80%;
          background: linear-gradient(to right, #00ffff, #00bfff);
          border: none;
          margin: 10px 0 30px;
          box-shadow: 0 0 8px #00ffff;
        }

        .message {
          font-size: 18px;
          color: #cccccc;
          text-align: center;
        }

        .session-list {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .session-card {
          background: #1c1c1e;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.1);
          animation: fadeIn 0.4s ease;
        }

        .session-card p {
          margin: 6px 0;
          font-size: 15px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
