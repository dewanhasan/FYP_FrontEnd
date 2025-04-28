// Import React hooks and Next.js router
import { useState } from "react";
import { useRouter } from "next/router";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle user login
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        localStorage.setItem("fullname", data.fullname || "User");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🚗 Member Login</h2>

        {/* Input for Email */}
        <input
          type="email"
          placeholder=" Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input for Password */}
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button onClick={handleLogin}>Login</button>

        {/* Display success or error message */}
        {message && <p className="message">{message}</p>}

        {/* Signup Link */}
        <p className="signup-text">
          Not a member?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>{" "}
          to get exclusive member discounts.
        </p>

        {/* Continue as Guest Button */}
        <button
          className="guest-button"
          onClick={() => {
            localStorage.setItem("fullname", "Guest");
            router.push("/dashboard");
          }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
