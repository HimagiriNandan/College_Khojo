// React imports
import { useState } from "react";

// FAQ data
import faqs from "../../Application/Services/index.js";

// CSS import
import "../Styles/FAQ.css";

const FAQ = () => {
  // Stores the index of the currently expanded FAQ.
  // null means all FAQs are collapsed.
  const [openFaq, setOpenFaq] = useState(null);

  const handleFaqClick = (index) => {
    // Clicking the already-open FAQ will collapse it.
    // Otherwise, open the selected FAQ.
    setOpenFaq((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <div className="mainContainer-faq">
      <h1 className="faqHeading">Frequently Asked Questions...</h1>

      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div key={index} className="childContainer">
            {/* Clickable FAQ question */}
            <button
              type="button"
              className="questionButton"
              onClick={() => handleFaqClick(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="questions">{faq.question}</h3>

              {/* Expand / collapse icon */}
              <span
                className={`faqIcon ${isOpen ? "faqIconOpen" : ""}`}
                aria-hidden="true"
              ></span>
            </button>

            {/* Answer is displayed only when FAQ is expanded */}
            {isOpen && (
              <p
                id={`faq-answer-${index}`}
                className="answers"
              >
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;