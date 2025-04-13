// React Imports
import { useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Data Imports
import paths from "../../Application/UseCases/index";

// Main Component
const ExamExplanation = () => {
    // Variables
    const { id } = useParams("id");
    const navigate = useNavigate();
    const modelData = paths[(id) ? id : 0];

    // Rendered Component
    return (
        <div className="exam-explanation-container">

            <div className="Path-model">

                <div className="path-model-2">

                    <div className="cancelIcon" onClick={(e) => { navigate("/home") }}>
                        <MdCancel className="cancelIcon" color="#05B97D" size="1.5rem" />
                    </div>

                    <h1 className="path-model-heading">{modelData.name}</h1>

                    <div id="model-path-infor" className="path-infor">
                        <h2>Duration</h2>
                        <p className="tag">{modelData.duration}</p>
                    </div>

                    <div id="model-path-infor" className="path-infor">
                        <h2>Months</h2>
                        {modelData.months.map((month, index) => {
                            return <p key={index} className="tag">{month}</p>;
                        })}
                    </div>

                    <h1 id="model-path-infor" className="path-explanation">{modelData.description}</h1>

                    <div id="model-path-table" className="path-infor">
                        <table className="model-path-table1">
                            <tr>
                                <th>Subject</th>
                                <th>Questions</th>
                                <th>Marks</th>
                            </tr>

                            {modelData.subjects.map((subject, index) => {
                                return (
                                    <tr>
                                        <td>{subject.name}</td>
                                        <td>{subject.questions}</td>
                                        <td>{subject.marks}</td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>

                    <div id="model-path-infor" className="path-infor">
                        <h2>Total Marks</h2>
                        {modelData.marks.map((mark, index) => {
                            return <p key={index} className="tag">{mark} marks</p>;
                        })}
                    </div>

                    <div id="model-path-infor" className="path-infor">
                        <h2>Marking Scheme</h2>
                        <p className="tag">Correct Answer: {modelData.correctOne}</p>
                        <p className="tag">Wrong Answer: {modelData.wrongOne}</p>
                    </div>

                    <div id="model-path-infor" className="path-infor">
                        <h2>Preparation Time</h2>
                        <p className="tag">{modelData.preparationTime}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ExamExplanation;