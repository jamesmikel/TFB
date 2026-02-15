import React, { useState } from "react";
import Heading from "./Header";
import Footer from "./Footer";
import { useAuth } from "./Authcontent";

import { useNavigate } from "react-router-dom";
const api_url = process.env.api_url;

function ProfilePicUploader() {
  const [profilePic, setProfilePic] = useState(null); // URL for preview
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    // Preview instantly
    const previewUrl = URL.createObjectURL(file);
    setProfilePic(previewUrl);

    // Upload to backend
    setLoading(true);
    const formData = new FormData();

    formData.append("profilePic", file);
    try {
      const res = await fetch(`${api_url}/api/upload-profile-pic`, {
        method: "POST",
        body: formData,
        credentials: "include", // if using cookies
      });

      const data = await res.json();
      if (data.success) {
        setProfilePic(data.imageUrl);
        alert("Profile picture updated!");
        navigate("/login");
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Upload failed due to network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading />
      <div className="Profile">
        {/* Welcoming Title */}
        <h1 className="text-3xl font-bold text-white text-center flex items-center gap-2">
          Welcome to TrustedFinance.biz{" "}
          <span role="img" aria-label="welcome emoji">
            🎉
          </span>
        </h1>
        {/* Friendly Message */}
        <p className="text-pgraph">
          Join our vibrant trading community and personalize your profile!
          Upload your picture to connect with fellow traders and make your
          experience even better.{" "}
          <span role="img" aria-label="smile emoji">
            😊
          </span>
        </p>
        {/* Profile Picture Display - Circle with Smiling Emoji as Fallback */}
        <label htmlFor="profile-upload" className="upload-wrapper">
          <div className="circle-upload">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl" role="img" aria-label="smiling emoji">
                😊
              </span>
            )}
          </div>
          {loading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <span className="text-white">Uploading...</span>
            </div>
          )}
          <div style={{ marginRight: "-70px" }}>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </label>
        {/* Upload Info */}
        <p className="text-sm text-gray-400 text-center">
          JPG, PNG up to 5MB. Click the circle to upload! 📸
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePicUploader;

