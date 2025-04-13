//React file imports
import faqs from "../../Application/Services/index.js";

// css import
import "../Styles/FAQ.css";


const FAQ = () => {
  return (
    <div className="mainContainer-faq">
      <h1 className="faqHeading">Frequently Asked Questions...</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="childContainer">
            <h3 className="questions">{faq.question}</h3>
            <p className="answers">{faq.answer}</p>
          </div>
        ))}
    </div>
  )
}

export default FAQ
