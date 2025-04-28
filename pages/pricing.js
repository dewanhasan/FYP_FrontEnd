export default function PricingPage() {
    return (
      <div style={{ 
        backgroundColor: "#ffffff", 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        padding: "20px"
      }}>
        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%"
        }}>
          <h1 style={{ color: "#00bfff", marginBottom: "20px" }}>Pricing Details</h1>
          <p style={{ color: "#333", fontSize: "16px", marginBottom: "20px" }}>
            Charging cost is calculated at <strong>€0.02 per second</strong> of active charging.
          </p>
          <p style={{ color: "#333", fontSize: "16px", marginBottom: "20px" }}>
            For example, a 1-minute session (60 seconds) would cost approximately <strong>€1.20</strong>.
          </p>
          <p style={{ color: "#00aa77", fontSize: "16px", fontWeight: "bold" }}>
            Members enjoy a special <u>10% discount</u> on all sessions!
          </p>
        </div>
      </div>
    );
  }
  