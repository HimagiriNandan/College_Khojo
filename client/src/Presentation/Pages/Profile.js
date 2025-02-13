import Navbar from '../Components/Navbar';
import '../Styles/Profile.css';
import profileimg from  '../Assests/profile.svg';
import editbtn from '../Assests/edit.svg';
import { useState } from 'react';


const Profile = () =>{
    const [name,setName]= useState('SUDHARSAN B');
    const [location,setLocation] = useState("");

    const [nameedit,setnameedit] = useState(false);
    const [locationedit,setlocationedit] = useState(false);


    return (
        <div className="profile-page">
            <Navbar/>
            <div className="profile-header">
                <div className="profile-image">
                    <img src={profileimg} alt="edit" />
                </div>
                <img className="editbtn" src={editbtn} alt="edit" />
            </div>
            <div className="prof-details">
                <div className="prof-detail">
                    <h1>Name   {`  `} <sp/> </h1>
                    {
                        nameedit ? 
                        <input id="dropdown" type="text" />
                        : 
                        <h2>SUDHARSAN B</h2>
                    }
                    {
                        nameedit ?
                        <button className="herobutton" onClick={()=>{setnameedit(false)}}>Save</button>
                        :
                        <button className="herobutton"  onClick={()=>{setnameedit(true)}}>Edit</button>


                    }
                
                </div>
                <div className="prof-detail">
                    <h1>Location </h1>
                    {
                        locationedit ? 

                        <select
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
                </select>
                        :  <h2>Tamil Nadu</h2>

                    }
                    {
                        locationedit ?            
                        <button className="herobutton"  onClick={()=>{setlocationedit(false)}}>Save</button>

                        :
                        <button className="herobutton" onClick={()=>{setlocationedit(true)}}>Edit</button>

                    }
                </div>
                
            </div>
        </div>
    )
}


export default Profile;