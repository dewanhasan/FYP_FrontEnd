// Import React hooks and Next.js router
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function PaymentPage() {
  const router = useRouter();
  const { duration, cost } = router.query;

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [status, setStatus] = useState("awaiting");
  const [originalCost, setOriginalCost] = useState(null);
  const [savings, setSavings] = useState(null);

  // Calculate original cost and savings
  useEffect(() => {
    if (duration && cost) {
      const original = parseFloat((parseInt(duration) * 0.02).toFixed(2));
      const paid = parseFloat(cost);
      const saved = original - paid;

      setOriginalCost(original.toFixed(2));
      if (saved > 0) {
        setSavings(saved.toFixed(2));
      }
    }
  }, [duration, cost]);

  // Handle payment click
  const handlePayment = () => {
    if (!selectedMethod) return alert("Please select a payment method!");

    setStatus("processing");

    setTimeout(() => {
      setStatus("complete");

      // Save transaction to backend
      fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: localStorage.getItem("fullname") || "Guest",
          duration: parseInt(duration),
          method: selectedMethod,
          amountPaid: parseFloat(cost),
          originalAmount: parseFloat(originalCost),
          discount: parseFloat(savings || 0),
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Transaction saved:", data))
        .catch((err) => console.error("Failed to save transaction:", err));
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="payment-wrapper">
        <div className="payment-box">
          <h1 className="title">💳 Payment Summary</h1>
          <hr className="glow-line" />

          {/* Payment info */}
          <p className="text">Charging Duration: <strong>{duration || "00:00"}</strong></p>
          <p className="text">Original Cost: <strong>€{originalCost || "0.00"}</strong></p>
          <p className="text">Amount Due: <strong>€{cost || "0.00"}</strong></p>

          {/* Member savings */}
          {savings && (
            <p className="text saving-message">
              🎉 You saved €{savings} as a member!
            </p>
          )}

          {/* Payment method selection */}
          {status !== "complete" && (
            <>
              <h3 className="subtitle">Select Payment Method:</h3>
              <div className="logos">
                <img
                  src="/visa-classic-svgrepo-com.svg"
                  alt="Visa"
                  className={`logo ${selectedMethod === "visa" ? "selected" : ""}`}
                  onClick={() => setSelectedMethod("visa")}
                />
                <img
                  src="/mastercard-svgrepo-com.svg"
                  alt="Mastercard"
                  className={`logo ${selectedMethod === "mastercard" ? "selected" : ""}`}
                  onClick={() => setSelectedMethod("mastercard")}
                />
                <img
                  src="/applepay.svg"
                  alt="Apple Pay"
                  className={`logo ${selectedMethod === "apple" ? "selected" : ""}`}
                  onClick={() => setSelectedMethod("apple")}
                />
              </div>
            </>
          )}

          {/* Payment button */}
          {status === "awaiting" && (
            <button onClick={handlePayment} className="pay-button">
              Pay Now
            </button>
          )}

          {/* Processing or Success Messages */}
          {status === "processing" && (
            <p className="status-text">🔄 Processing payment...</p>
          )}
          {status === "complete" && (
            <div className="thank-you">
              <h2>🎉 Payment successfully completed</h2>
              <p>Thank you for charging with us!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
