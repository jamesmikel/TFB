import "./styles.css";
import { useState } from "react";
import faqs from "./notes"; // Ensure this path points to your faqs JSON file
import Footer from "./Footer";
import Heading from "./Header";
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        {question}
      </div>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <hr style={{ color: "#02030b" }} />
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      <Heading />
      <h2 className="faq-h2">Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
      <Footer />
    </div>
  );
}
