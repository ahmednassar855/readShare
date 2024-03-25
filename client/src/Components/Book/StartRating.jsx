import React from "react";

function StartRating({ rating }) {
  console.log(rating);
  const renderStars = () => {
    const fullStars = Math.floor(rating); // Get the number of full stars
    const halfStar = rating - fullStars >= 0.5; // Check if there's a half star
    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      console.log(fullStars , 'kkkkkk');
      starElements.push(
        <span
          key={i}
          className="fa fa-star checked fs-3"
          style={{ color: "#FFE234" }}
        ></span>
      );
    }

    if (halfStar) {
      starElements.push(
        <span
          key="half"
          className="fa fa-star-half-alt checked fs-3"
          style={{ color: "#FFE234" }}
        ></span>
      );
    }

    while (starElements.length < 5) {
      starElements.push(
        <span
          key={`empty-${starElements.length}`}
          className="fa fa-star fs-3"
          style={{ color: "gray" }}
        ></span>
      );
    }

    return starElements;
  };

  return (
    <div style={{ padding: "2rem", display: "flex", gap: ".5rem" }}>
      {renderStars()}
    </div>
  );
}

export default StartRating;
