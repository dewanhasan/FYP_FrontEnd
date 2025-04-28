// pages/about.js

export default function AboutPage() {
    return (
      <div className="about-container">
        <h1 className="about-title">About ZapZapGo: FluxCharger</h1>
        <p className="about-text">
          Welcome to <strong>ZapZapGo: FluxCharger</strong> — an innovative solution designed to simplify and modernize the EV charging experience. Our system enables wireless charging for RoboCars using a smart dashboard, session tracking, and real-time updates.
        </p>
  
        <p className="about-text">
          From the homepage, users can start a session by logging in or entering as a guest. Once inside the dashboard, the RoboCar's battery status and charging progress are tracked live. The platform also includes a timer-based charging summary and a simulated payment process with multiple payment method options like Visa, MasterCard, and Apple Pay.
        </p>
  
        <p className="about-text">
          We utilize advanced components such as <strong>ESP32</strong>, <strong>INA219</strong> for current measurement, and MQTT via <strong>HiveMQ</strong> Cloud for seamless real-time communication. Users can even search for nearby charging stations using integrated Google Maps APIs.
        </p>
  
        <p className="about-text">
          Our mission is to make EV charging smarter, more accessible, and visually engaging with animated transitions, sensor integration, and a stylish interface.
        </p>
  
        <style jsx>{`
          .about-container {
            max-width: 900px;
            margin: 150px auto;
            padding: 40px;
            background-color: #111;
            color: #fff;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
            text-align: center;
          }
  
          .about-title {
            font-size: 36px;
            font-weight: bold;
            color: #00bfff;
            margin-bottom: 30px;
          }
  
          .about-text {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 20px;
            text-align: justify;
          }
  
          strong {
            color: #00ffe1;
          }
        `}</style>
      </div>
    );
  }
  