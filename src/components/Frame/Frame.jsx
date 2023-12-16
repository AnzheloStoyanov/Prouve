import PropTypes from "prop-types";
import "./frame.css";

const Frame = ({ title, description }) => {
  return (
    <div className="frame">
      <div className="frameTitle">{title}</div>
      <div className="frameDescription">{description}</div>
    </div>
  );
};

export default Frame;

Frame.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
