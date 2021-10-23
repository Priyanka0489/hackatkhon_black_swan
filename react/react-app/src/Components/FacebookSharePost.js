import React, { Component } from "react";
import { FacebookProvider, Share } from "react-facebook";

const FacebookSharePost = () => {
  return (
    <FacebookProvider appId="3061416894094509">
      <Share href="http://www.facebook.com">
        {({ handleClick, loading }) => (
          <button
            type="button"
            className="button"
            disabled={loading}
            onClick={handleClick}
          >
            Share
          </button>
        )}
      </Share>
    </FacebookProvider>
  );
};

export default FacebookSharePost;
