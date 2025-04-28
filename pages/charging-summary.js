import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChargingSummary() {
  const router = useRouter();
  const { duration, guest } = router.query;
  const [chargingTime, setChargingTime] = useState(0);
  const [cost, setCost] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (duration) {
      const timeInSeconds = parseInt(duration);
      const baseCost = timeInSeconds * 0.02;
      const isGuest = guest === "true";
      const finalCost = isGuest ? baseCost : baseCost * 0.9;

      setChargingTime(timeInSeconds);
      setCost(finalCost.toFixed(2));
      setDiscountApplied(!isGuest);
    }
  }, [duration, guest]);

  const fetchGraphData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/session-graph");
      const data = await res.json();
      const filtered = data.filter((point) => point.time <= chargingTime);
      setGraphData(filtered);
    } catch (err) {
      console.error("Failed to fetch graph data:", err);
    }
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleProceedToPayment = () => {
    router.push({
      pathname: "/payment",
      query: {
        duration: chargingTime.toString(),
        cost: cost.toString(),
      },
    });
  };

  return (
    <div className="page-container">
      <div className="summary-wrapper">
        <div className="summary-box">
          <h1 className="summary-title">⚡ Charging Summary</h1>
          <hr className="glow-line" />

          <div className="info">
            <p className="label">⏱️ Charging Time</p>
            <p className="value">{formatTime(chargingTime)}</p>
          </div>
          <div className="info">
            <p className="label">💶 Amount Due</p>
            <p className="value">€{cost}</p>
            {discountApplied && (
              <p
                style={{ color: "#00ffaa", fontSize: "14px", marginTop: "4px" }}
              >
                🎉 10% Member Discount Applied!
              </p>
            )}
          </div>

          <div className="button-row">
            <button className="pay-btn" onClick={handleProceedToPayment}>
              Proceed to Payment →
            </button>

            <button
              className="graph-btn"
              onClick={() => {
                setShowGraph(true);
                fetchGraphData();
              }}
            >
              📈 View Graph
            </button>
          </div>

          {showGraph && (
            <div style={{ marginTop: "30px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={graphData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(tick) => `${tick}s`}
                    label={{
                      value: "Session Time (s)",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Current (A)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    domain={[0, 1.5]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#00ffaa"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-container {
          background: #050505;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .summary-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(to bottom, #050505, #0f0f0f);
        }

        .summary-box {
          background: #1c1c1e;
          padding: 40px;
          border-radius: 18px;
          box-shadow: 0 0 25px rgba(0, 255, 200, 0.15);
          text-align: center;
          max-width: 500px;
          width: 100%;
          animation: slideFade 0.6s ease;
        }

        .summary-title {
          font-size: 30px;
          color: #00ffff;
          margin-bottom: 10px;
        }

        .glow-line {
          border: none;
          height: 2px;
          background: linear-gradient(to right, #00ffff, #00aaff);
          margin: 20px auto;
          width: 80%;
          box-shadow: 0 0 10px #00ffff;
        }

        .info {
          margin: 20px 0;
        }

        .label {
          font-size: 15px;
          color: #ccc;
        }

        .value {
          font-size: 24px;
          font-weight: bold;
          color: #00ffaa;
        }

        .pay-btn {
          margin-top: 30px;
          background-color: #00bfff;
          border: none;
          padding: 10px 6px;
          font-size: 16px;
          font-weight: bold;
          color: black;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pay-btn:hover {
          background-color: #00ffff;
          transform: translateY(-2px);
          box-shadow: 0 0 10px #00ffff;
        }

        .graph-btn {
          margin-top: 30px;
          background: rgba(0, 128, 255, 0.56);
          color: rgb(237, 231, 231);
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 8px;
          padding: 12px 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.15);
        }

        .graph-btn:hover {
          background: linear-gradient(to right, #555, #777);
          box-shadow: 0 0 15px #00ffff;
          transform: translateY(-2px);
        }

        .button-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }

        @keyframes slideFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ChargingSummary;
