export default function ContactPage() {
    return (
      <div style={{ 
        backgroundColor: "#ffffff", 
        minHeight: "80vh", 
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
          maxWidth: "400px",
          width: "100%"
        }}>
          <h1 style={{ color: "#333", marginBottom: "20px" }}>Contact Us</h1>
          <p style={{ color: "#555", fontSize: "18px", marginBottom: "10px" }}>
            📞 Phone: +353 83 123 4567
          </p>
          <p style={{ color: "#555", fontSize: "18px" }}>
            📧 Email: support@zapzapgo.com
          </p>
        </div>
      </div>
    );
  }
  