// ContactIcon.jsx
import PropTypes from "prop-types";

const ContactIcon = ({ to, icon }) => {
  return (
    <>
      <a href={to} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </>
  );
};

ContactIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default ContactIcon;
