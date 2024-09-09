// components/ProfileImage.js
import React from "react";
import Image from "react-bootstrap/Image";

const ProfileImage = ({ src }) => (
    <Image src={src} roundedCircle className="profile-picture" />
);

export default ProfileImage;
