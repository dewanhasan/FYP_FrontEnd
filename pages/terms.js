export default function TermsOfServicePage() {
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
          <h1 style={{ color: "#333", marginBottom: "20px" }}>Terms of Service</h1>
          <p style={{ color: "#555", fontSize: "16px" }}>
            By using ZapZapGo, users agree to comply with all safety instructions. Charging sessions are monitored 
            for maintenance and quality purposes. ZapZapGo reserves the right to update terms as needed.
          </p>
        </div>
      </div>
    );
  }
  