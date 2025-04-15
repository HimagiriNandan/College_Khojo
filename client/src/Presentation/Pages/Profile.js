// React Imports
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Slices Imports
import { setUserData } from '../../Application/StateManagement/slices/UserSlice';

// Components and Images Imports
import Loading from './Loading';
import PerformanceChart from '../Components/AnalysisGraph';
import AttemptedMocktests from '../Components/AttemptedMocktest';
import profileimg from '../Assests/profile.svg';

// Styles Imports
import '../Styles/Profile.css';

// Api Routes Imports
import { updateUser, updateUserProfile } from '../../Application/Services/api';


// Main Component
const Profile = () => {
    // States and Variables
    const [name, setName] = useState('');
    const [profileimage, setProfileimage] = useState('');
    const [location, setLocation] = useState("");
    const [isloading, setIsloading] = useState(false);

    const [nameedit, setnameedit] = useState(false);
    const [locationedit, setlocationedit] = useState(false);
    const [imageedit, setimageedit] = useState(false);

    const user = useSelector((state) => state.user.data);

    const dispatch = useDispatch();

    useEffect(()=>{

        setIsloading(true);
        const data = localStorage.getItem("user");

        
        console.log(data);
        console.log(user);
        setName(user.name);
        setLocation(user.location);
        setIsloading(false);

    },[]);

    const HandleChange =async () =>{
        try{
            setIsloading(true);
            const response = await updateUser({
                id: user._id,
                name: name,
                location: location
            })
            if (response.data.error === false) {
                dispatch(setUserData(response.data.data));
                window.location.reload();
            }
        } catch (err) {
            console.log("Error");
        } finally {
            setIsloading(false);
        }
    }

    const handleuploadimage = async () => {
        try {
            setIsloading(true);
            const data = new FormData();
            data.append("profilepic", profileimage);
            data.append("id", user._id);

            const response = await updateUserProfile(data);
            if (response.data.error === false) {
                dispatch(setUserData(response.data.data));
                window.location.reload();
            }
            else {
                console.log("Error");
            }
        }
        catch (err) {
            console.log("Error");
        }
    }

    // UseEffects
    useEffect(() => {
        try {
            setIsloading(true);
            setName(user.name);
            setLocation(user.location);
            setIsloading(false);
        }
        catch (err) {
            console.log("Error");
        }
    }, []);


    // Rendered Component
    return (
        <div className="profile-page">
            {isloading && <Loading />}

            <div className="profile-header">

                <div className="profile-image">
                    <img className="profile-image-2" src={user.image || profileimg} alt="edit" />
                </div>

                <form className="profile-image-form-cont" onSubmit={(e) => { handleuploadimage(); setimageedit(false); e.preventDefault() }}>
                    {imageedit && <input type="file" onChange={(e) => { setProfileimage(e.target.files[0]) }} />}
                    {
                        imageedit ?
                            <button className="herobutton" style={{ marginTop: "20px" }} onClick={() => { handleuploadimage(); setimageedit(false) }}>Save</button>
                            :
                            <img onClick={() => { setimageedit(true) }} className="editbtn" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739688082/dauvzwbng0zaxudckdgb.webp" alt="edit" />
                    }
                </form>

            </div>

            <div className="prof-details">

                <div className="prof-detail">
                    <h1>Name   {`  `} <sp /> </h1>
                    {
                        nameedit ?
                            <input id="dropdown" onChange={(e) => { setName(e.target.value) }} type="text" />
                            :
                            <h2>{user.name}</h2>
                    }
                    {
                        nameedit ?
                            <button className="herobutton" onClick={() => { setnameedit(false); HandleChange() }}>Save</button>
                            :
                            <button className="herobutton" onClick={() => { setnameedit(true) }}>Edit</button>
                    }
                </div>

                <div className="prof-detail">
                    <h1>Location </h1>
                    {
                        locationedit ? 
                            (<select
                                id="dropdown"
                                name="location"
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                            >
                                <option value="" disabled>Select Location</option>
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
                            </select>)

                            : 
                            
                            <h2>{user.location}</h2>
                    }
                    {
                        locationedit ?
                            <button className="herobutton" onClick={() => { setlocationedit(false); HandleChange(); }}>Save</button>
                            :
                            <button className="herobutton" onClick={() => { setlocationedit(true) }}>Edit</button>
                    }
                </div>

            </div>
            <PerformanceChart />
            <AttemptedMocktests />
        </div>
    )
}


export default Profile;