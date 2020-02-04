import React from "react";

function SocialLink({ link, picture }) {
  return (
    <a href={link} target="_blank" rel="nofollow noopener noreferrer">
      <img
        src={picture}
        style={{
          width: "35px",
          padding: "0px 5px"
        }}
        alt="linkedin"
      />
    </a>
  );
}

export default SocialLink;
