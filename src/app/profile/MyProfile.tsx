"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const MyProfile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Rogar Walker",
    phone: "+1 555 232 254",
    email: "roger@gmail.com",
    image: "images/inner-page/user-profile.svg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setProfileData({
        ...profileData,
        image: imageUrl,
      });
    }
  };

  const handleSave = () => {
    console.log(profileData);

    setIsEditing(false);
  }

  return (
    <main>
      <div className="container home-wraper my-profile">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="browse-wrp">
                  <div className="browse-ctg-head my-con-head">
                    <h2 className="sub-cate-page"> <Link href="/home"><img src="images/home/left-arrow.svg" alt="" /></Link>
                    {!isEditing ? "My Profile" : "Edit Profile"}
                    </h2>

                  </div>
                  <div className="my-profile-wrapper">
                    <div className="my-profile-page">
                      <img className="bg-img" src="images/inner-page/profile-bg-icon.svg" alt="" />
                    </div>

                    <div className="">
                      <form className="">
                        <div className="input-data-file">
                          <div className="user-img-circle">
                            <img src={profileData?.image || "images/inner-page/user-profile.svg"} alt="" />

                          </div>
                          <input type="file" id="fileInput" onChange={handleImageChange} />

                          <label htmlFor="fileInput" className="upload-icon">
                            <img src="images/inner-page/upload-file-icon.svg" alt="" />
                          </label>

                        </div>
                        <div className="roger-data">

                          <div className="input-group">
                            <img src="images/inner-page/roger-walker-img.svg" alt="" />
                            <input type="text" name="name" value={profileData.name} onChange={handleChange} readOnly={!isEditing} />
                          </div>

                          <div className="input-row">
                            <div className="input-group">
                              <img src="images/inner-page/contact-icon.svg" alt="" />
                              <input type="text" name="phone" value={profileData.phone} onChange={handleChange} readOnly={!isEditing} />
                            </div>

                            <div className="input-group">
                              <img src="images/inner-page/mail-icon.svg" alt="" />
                              <input type="email" name="email" value={profileData.email} onChange={handleChange} readOnly={!isEditing} />
                            </div>
                          </div>

                          {!isEditing && (
                            <div className="input-group">
                              <img src="images/home/profile-date-icon.svg" alt="" />
                              <input type="text" value="Oct 2026" readOnly />
                            </div>
                          )}

                          {!isEditing ? (

                            <button type="button" className="primary-cta edit-profile" onClick={() => setIsEditing(true)}><img src="images/inner-page/edit-icon.svg" alt="" />Edit Profile</button>
                          ) : (
                            <button type="button" className="primary-cta edit-profile" onClick={handleSave}>Save Changes</button>

                          )}

                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default MyProfile