export default function PrivacyPolicyPage() {
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
          <h1 style={{ color: "#333", marginBottom: "20px" }}>Privacy Policy</h1>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Your privacy is important to us. ZapZapGo does not share personal information with third parties. 
            Any data collected during sessions is used solely for operational and improvement purposes.
          </p>
        </div>
      </div>
    );
  }
  