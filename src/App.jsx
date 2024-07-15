import React, { useState } from 'react';
import './styles.css'; // Import CSS file for styling

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Mason Parker');
  const [jobDetails, setJobDetails] = useState('Graphics & UI/UX Designer - Denver, United States');
  const [bio, setBio] = useState(`I am a visionary Graphics and UI/UX Designer, 
    seamlessly blending artistic flair with technical expertise. With a degree in Graphic Design, I consistently
    deliver visually stunning and user-centric solutions, leaving an indelible mark on the digital landscape. As a
    trusted collaborator, I am dedicated to crafting pixel-perfect UIs and captivating graphics that elevate user
    experiences.`);
  
  const [profilePicture, setProfilePicture] = useState(''); // State to store profile picture URL
  const [projectScreenshots, setProjectScreenshots] = useState([]); // State to store project screenshots URLs

  // Function to handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
  };

  // Function to handle project screenshots upload
  const handleProjectScreenshotsUpload = (event) => {
    const files = event.target.files;
    const newScreenshots = [...projectScreenshots];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        newScreenshots.push(reader.result);
        setProjectScreenshots(newScreenshots);
      };
    }
  };

  return (
    <div className={`container ${editMode ? 'edit-mode' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">Schedule</a></li>
          <li><a href="#">Recommendation</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Inbox</a></li>
          <li><a href="#">Themes</a></li>
          <li><a href="#">Setting</a></li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="content-box">
          <div className="resume">
            <p className="section">
              <span className="small">
                Apply a skin to your profile{' '}
                {editMode ? (
                  <button className="button-small" onClick={() => setEditMode(false)}>
                    Save
                  </button>
                ) : (
                  <button className="button-small" onClick={() => setEditMode(true)}>
                    Edit
                  </button>
                )}
              </span>
            </p>
          </div>
          
          {/* Main content sections */}
          <p className="section-heading">Profile</p>
          <div className="profile-section">
            <div className="profile-picture">
              {editMode ? (
                <div className="file-input">
                  <input type="file" onChange={handleProfilePictureUpload} accept="image/*" />
                </div>
              ) : (
                <img src={profilePicture} alt="Profile" />
              )}
            </div>
            <div className="profile-details">
              <p className={`name ${editMode ? 'editable' : ''}`}>
                {editMode ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  name
                )}
              </p>
              <p className={`job-details ${editMode ? 'editable' : ''}`}>
                {editMode ? (
                  <input
                    type="text"
                    value={jobDetails}
                    onChange={(e) => setJobDetails(e.target.value)}
                  />
                ) : (
                  jobDetails
                )}
              </p>
            </div>
          </div>

          <p className="section-heading">Projects</p>
          <div className="projects-section">
            {editMode ? (
              <div className="file-input">
                <input type="file" onChange={handleProjectScreenshotsUpload} multiple accept="image/*" />
              </div>
            ) : (
              <div className="screenshots">
                {projectScreenshots.map((screenshot, index) => (
                  <img key={index} src={screenshot} alt={`Screenshot ${index}`} />
                ))}
              </div>
            )}
          </div>

          <p className="section-heading">Bio</p>
          <div className="bio-section">
            <p className={`bio ${editMode ? 'editable' : ''}`}>
              <span className={`bold ${editMode ? 'editable' : ''}`}>
                {editMode ? (
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  'I am a visionary Graphics and UI/UX Designer,'
                )}
              </span>
              <span className={`description ${editMode ? 'editable' : ''}`}>
                {editMode ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  'seamlessly blending artistic flair with technical expertise. With a degree in Graphic Design, I consistently deliver visually stunning and user-centric solutions, leaving an indelible mark on the digital landscape. As a trusted collaborator, I am dedicated to crafting pixel-perfect UIs and captivating graphics that elevate user experiences.'
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
