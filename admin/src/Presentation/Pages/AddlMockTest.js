import { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar";
import "../Styles/AddMockTest.css";
import axios from 'axios';
const AddMockTest = () => {
  // Predefined sections (Physics, Chemistry, Maths) each with 25 questions
  const predefinedSections = [
    { name: 'Physics', questions: Array(25).fill({ question: '', options: { a: '', b: '', c: '', d: '' }, correctOption: '', explanation: '' }) },
    { name: 'Chemistry', questions: Array(25).fill({ question: '', options: { a: '', b: '', c: '', d: '' }, correctOption: '', explanation: '' }) },
    { name: 'Maths', questions: Array(25).fill({ question: '', options: { a: '', b: '', c: '', d: '' }, correctOption: '', explanation: '' }) }
  ];

  const [mockTest, setMockTest] = useState({
    title: '',
    totalMarks: 300,
    scoredMarks: 0,
    timer: 10800,
    sections: predefinedSections
  });

  const handleChange = (e, sectionIndex, questionIndex, field, option) => {
    const { value } = e.target;
  
    setMockTest(prevState => {
      const updatedSections = [...prevState.sections];
  
      // If updating a specific option (a, b, c, d)
      if (field === 'options' && option) {
        updatedSections[sectionIndex].questions[questionIndex].options[option] = value;
      }else if (field === 'title') {
        prevState[field] = value;
      } else if (sectionIndex !== undefined && questionIndex !== undefined) {
        updatedSections[sectionIndex].questions[questionIndex][field] = value;
      } else if (sectionIndex !== undefined) {
        updatedSections[sectionIndex][field] = value;
      } else {
        prevState[field] = value;
      }
  
      return { ...prevState, sections: updatedSections };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response =await axios.post('http://localhost:5000/mock/addmocktest', mockTest);
    // Send mockTest data to the server (this would be done via an API call)
  };

  // Prevent page reload without confirmation
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Standard for modern browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div id="addmocktest-container" className="mocktest-cont">
        <h1 id="addmocktest-heading" className="dashboard-heading">Add Mock Test</h1>
        <form id="addmocktest-form" className="mocktest-form" onSubmit={handleSubmit}>
        <div className="form-groups-cont">
        <div className="form-group">
  <label>Title</label>
  <input
    id="input-bar"
    type="text"
    name="title"
    value={mockTest.title}
    onChange={(e) => handleChange(e, null, null, 'title')}  // We pass 'title' as field here
    required
  />
</div>



          <div className="form-group">
            <label>Timer (in minutes)</label>
            <input
              type="number"
              id="input-bar"
              name="timer"
              value={mockTest.timer}
              onChange={(e) => handleChange(e, null, null, 'timer')}
              required
            />
          </div>

          </div>

          {mockTest.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section-container">
              <h3 className="section-heading">{section.name}</h3>

              {section.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-container">
                  <h4 className="question-number">Question {questionIndex + 1}</h4>
                  <div className="form-group2">
                    <label>Question</label>
                    <textarea
                        name="question"
                        value={question?.question || ''}  // Ensure `question.question` is always a valid value (use empty string as fallback)
                        onChange={(e) => handleChange(e, sectionIndex, questionIndex, 'question')}
                        required
                    />
                </div>


                  {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option} className="form-group">
                        <label>{option.toUpperCase()}:</label>
                        <input
                        type="text"
                        id="input-bar"
                        name={option}
                        value={question.options[option]}
                        onChange={(e) => handleChange(e, sectionIndex, questionIndex, 'options', option)}  // Pass the specific option key
                        required
                        />
                    </div>
                    ))}

                  <div  className="form-group2">
                    <label>Correct Option</label>
                    <select
                      id="input-bar"
                      name="correctOption"
                      value={question.correctOption}
                      onChange={(e) => handleChange(e, sectionIndex, questionIndex, 'correctOption')}
                      required
                    >
                        <option value="">Select correct option</option>
                        {['a', 'b', 'c', 'd'].map((option) => (
                            <option key={option} value={option}>{option.toUpperCase()}</option>
                        ))}
                    </select>

                  </div>

                  <div className="form-group2">
                    <label>Explanation</label>
                    <textarea
                      type="text"
                      name="explanation"
                      value={question.explanation}
                      onChange={(e) => handleChange(e, sectionIndex, questionIndex, 'explanation')}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button type="submit" onClick={async()=>{
          }} className="submit-btn">Submit Mock Test</button>
        </form>
      </div>
    </div>
  );
};

export default AddMockTest;
