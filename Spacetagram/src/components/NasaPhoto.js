import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPhoto().catch((err) => console.log(err));

    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("isLiked");
    if (data) {
      setIsLiked(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLiked", JSON.stringify(isLiked));
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!photoData)
    return (
      <div className="loading">
        <div className="loader">
          <CircularProgress color="inherit" disableShrink={true} size="5em" />
        </div>
      </div>
    );

  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        {photoData.media_type === "image" ? (
          <img src={photoData.url} alt={photoData.title} className="photo" />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div className="like-container">
          Like
          <div className="like-button" onClick={handleLike}>
            {isLiked ? (
              <FavoriteOutlined fontSize="large" className="liked" />
            ) : (
              <FavoriteBorderOutlined fontSize="large" />
            )}
          </div>
        </div>
        <div>
          <h1>{photoData.title}</h1>
          <p className="date">{photoData.date}</p>
          <p className="explanation">{photoData.explanation}</p>
        </div>
      </div>
    </>
  );
}
