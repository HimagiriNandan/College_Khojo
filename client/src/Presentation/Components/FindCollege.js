//React file imports
import { useEffect, useState } from 'react';

//component imports
import Loading from '../Pages/Loading';

// css import
import '../Styles/FindCollege.css';

//api imports
import { filterColleges } from '../../Application/Services/api';

const College = ({ key, college }) => {
    return (
        <div key={key} className="college">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h1 className="college-course">{college["Academic Program Name"]}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap", paddingTop: "20px" }}>
                    <h1 className="college-name">{college.Institute}</h1>
                    <div className="college-info">
                        <h1 className="tag">{college.State}</h1>
                        <h1 className={"tag" + (college.Tier === "2" ? " tag-sad" : (college.Tier === "3" ? " tag-poor" : ""))}>Tier {college.Tier}</h1>
                        <h1 className="tag">{college.Gender}</h1>
                        <h1 className="tag">{college.Percentile}%ile</h1>
                        <h1 className="tag">{college["Seat Type"]}</h1>
                        <h1 className="tag">Closing Rank {college["Closing Rank"]}</h1>
                        <h1 className="tag">{college.Marks} / 300</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FindCollege = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCat, setSelectedCat] = useState("");
    const [collegs, setCollegs] = useState([]);
    const [totalPages, setTotalPages] = useState(1); 
    const [pagenumber, setPage] = useState(1);
    const [marksdata, setMarks] = useState(300);
    const [percentiledata, setPercentile] = useState(100);
    const [rankingdata, setRanking] = useState(1);
    const [tiertype, setTiertype] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [gender, setGender] = useState("");
    const [seattype, setSeattype] = useState("");

    const fetchColleges = async () => {
        try {
            setIsloading(true);
            const response = await  filterColleges({
                page: pagenumber,
                marks: marksdata,
                percentile: percentiledata,
                ranking: rankingdata,
                examtype : selectedOption,
                tiertype : tiertype,
                location: selectedLocation,
                gender : gender,
                seattype : seattype,
            });
            
            if(response.data.colleges.length === 0) {
                alert("No colleges found matching the criteria");
            }
            setCollegs(response.data.colleges);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching college data: ", error);
            setCollegs([]);
            setPage(1);
            setTotalPages(0);
        } finally{
            setIsloading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSubmit = (e) => {
       e.preventDefault();
        fetchColleges();
    };

    const handleMarksChange = (page2) => {
        setMarks(page2);
        setPage(1);
    };

    const handlePercentileChange = (page2) => {
        setPercentile(page2);
        setPage(1);
    };

    const handleRankChange = (page2) => {
        setRanking(page2);
        setPage(1);
    };

    useEffect(() => {
        fetchColleges();
    }, [pagenumber]);

    return (
        <>
        {isloading && <Loading />}
        <div className="find-college">
            <h1 id="find-heading" className="heading">Find Your Best College</h1>
            <form id="find-form">
                <select
                    id="dropdown"
                    name="exam"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="" disabled>Select Exam</option>
                    <option value="JEE" >JEE</option>
                    <option value="Boards">Boards</option>
                </select>
                
                <select
                    id="dropdown"
                    name="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="" disabled>Select Location</option>
                    <option value="">All States</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                </select>

                {(selectedOption === "JEE" || selectedOption==="") && (
                    <>
                        <select
                            id="dropdown"
                            name="basedon"
                            value={tiertype}
                            onChange={(e) => setTiertype(e.target.value)}
                        >
                            <option value="" disabled>Select Tier</option>
                            <option value="">All Tiers</option>
                            <option value="1">Tier 1</option>
                            <option value="2">Tier 2</option>
                            <option value="3">Tier 3</option>
                        </select>
                        <select
                            id="dropdown"
                            name="basedon"
                            value={seattype}
                            onChange={(e) => setSeattype(e.target.value)}
                        >
                            <option value="" disabled>Select Seat Type</option>
                            <option value="">All Category</option>
                            <option value="OPEN">OPEN</option>
                            <option value="OBC-NCL">OBC-NCL</option>
                            <option value="SC">SC</option>
                            <option value="EWS">EWS</option>
                            <option value="ST">ST</option>
                        </select>
                        <select
                            id="dropdown"
                            name="basedon"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="">All Category</option>
                            <option value="Gender-Neutral">Gender-Neutral</option>
                            <option value="Female-only">Female-only</option>

                        </select>
                        <select
                            id="dropdown"
                            name="basedon"
                            value={selectedCat}
                            onChange={(e) =>{

                             setSelectedCat(e.target.value);
                                if(e.target.value === "Marks"){
                                    handleMarksChange(-1);
                                }
                                else if(e.target.value === "Percentile"){
                                    handlePercentileChange(-1);
                                }
                                else if(e.target.value === "Ranking"){
                                    handleRankChange(-1);
                                }
                           }}
                        >
                            <option value="Marks">Marks</option>
                            <option value="Percentile">Percentile</option>
                            <option value="Ranking">Ranking</option>
                        </select>
                        <input 
                            id="dropdown" 
                            type="number" 
                            name="value" 
                            value={(selectedCat === "Marks") ? marksdata : (selectedCat === "Percentile") ? percentiledata : rankingdata}
                            placeholder="Enter the value" 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (selectedCat === "Marks") {
                                    console.log("marks");

                                    handlePercentileChange(-1);
                                    setSelectedCat("Marks");
                                    handleRankChange(-1);

                                    handleMarksChange(value);
                                } else if (selectedCat === "Percentile") {
                                    console.log("percentile");
                                    handleMarksChange(-1);
                                    setSelectedCat("Percentile");
                                    handleRankChange(-1);

                                    handlePercentileChange(value);
                                } else if (selectedCat === "Ranking") {
                                    console.log("ranking");
                                    handleMarksChange(-1);
                                    handlePercentileChange(-1);
                                    setSelectedCat("Ranking");
                                    handleRankChange(value);
                                }
                            }}
                        />
                        <button id="find-button" className='herobutton' type="submit" onClick={handleSubmit}>Find</button>
                    </>
                )}
            </form>

            <div className="college-cont">
                {collegs.map((college, index) => (
                    <College key={index} college={college} />
                ))}
            </div>

            <div className="pagination">
                <button 
                    className="herobutton"
                    disabled={pagenumber === 1}
                    id="find-colleges-btn"

                    onClick={() => handlePageChange(pagenumber - 1)}>
                    Prev
                </button>
                <span>Page {pagenumber} of {totalPages}</span>
                <button 
                    className="herobutton"
                    id="find-colleges-btn"
                    disabled={pagenumber === totalPages}
                    onClick={() => handlePageChange(pagenumber + 1)}>
                    Next
                </button>
            </div>
        </div>
        </>
    );
};

export default FindCollege;
