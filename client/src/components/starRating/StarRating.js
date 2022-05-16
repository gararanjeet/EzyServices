import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TiStarFullOutline } from "react-icons/ti";

const Rate = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <TiStarFullOutline
          key={idx}
          className="cursor-pointer"
          icon="star"
          onClick={rating > 0 ? null : () => onRating(idx)}
          style={{ color: getColor(idx), fontSize: "2rem", cursor: "pointer" }}
          onMouseEnter={rating > 0 ? null : () => setHoverRating(idx)}
          onMouseLeave={rating > 0 ? null : () => setHoverRating(0)}
        />
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

// Rate.propTypes = {
//   count: PropTypes.number,
//   rating: PropTypes.number,
//   onChange: PropTypes.func,
//   color: {
//     filled: PropTypes.string,
//     unfilled: PropTypes.string,
//   },
// };

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#D5D421",
    unfilled: "#DCDCDC",
  },
};

export default Rate;
