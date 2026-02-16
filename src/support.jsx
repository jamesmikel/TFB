import "./styles.css";
import { Link } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useAuth } from "./Authcontent";
import React, { useState } from "react";

const api_url =process.env.REACT_APP_API_URL ;

function ContactForm() {
  const { isLoggedIn, user } = useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const Support_user = async (data) => {
    const response = await axios.post(`${api_url}/support`, data, {
      withCredentials: true, // If using auth cookies
    });
    return response; // return full response so we can check status
  };

  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Support_user(formData);

      if (response.status === 200) {
        setStatus("success");
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setError("Apologies, Something went wrong.");
      }
    }
    setLoading(false);

    // simulate reload by resetting form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="form-cotn" style={styles.container}>
      <h2>Contact Us</h2>
      {status === null && (
        <form onSubmit={handleSubmit}>
          <div style={styles.formCtn}>
            {isLoggedIn ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={user?.full_name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={user?.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />{" "}
              </>
            ) : (
              <>
                {" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  style={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </>
            )}
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "SEND"}
          </button>
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error}
            </p>
          )}
        </form>
      )}

      {/* Messages */}
      {status === "success" && (
        <div>
          Message has been successfully sent. We shall contact you in next 24
          hours, Thank you.
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Montserrat",
    margin: "auto",
    background: "#07091a",
    padding: "30px",
    borderRadius: "8px",
    color: "white",
  },

  formCtn: {
    display: "flex",
    gap: "13px",
    paddingBottom: "20px",
    width: "100%",
  },

  input: {
    fontFamily: "Montserrat",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },

  textarea: {
    width: "97%",
    fontFamily: "Montserrat",
    padding: "10px",
    background: "#0a0d44",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
    outline: "none",
  },

  button: {
    width: "20%",
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    background: "#1e26b6",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
  },

  message: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold",
  },

  contact: {
    margin: "auto",
    maxWidth: "1120px",
    display: "flex",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    paddingBottom: "20px",
  },
};

const Support = () => {
  return (
    <div>
      <Heading />
      <h1 className="contact">Contact Us</h1>

      <div>
        <div>
          <div className="Contact-P">
            <p>
              Please read our{" "}
              <Link to="/faq" style={{ color: "#02030b" }}>
                Frequently Asked Questions (FAQ){" "}
              </Link>{" "}
              page before creating a ticket. Probably your question has already
              been answered there!
            </p>
          </div>
          <div className="f-container" style={styles.contact}>
            <ContactForm />
            <div class="contact-info">
              <div class="info-card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                  alt="Location"
                />
                <p>1 Holbein Place, London, England, SW1W 8NS</p>
              </div>
              <div class="info-card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                  alt="Email"
                />
                <p>support@trusted-finance.biz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Support;


