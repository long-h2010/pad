import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const RouterLink: React.FC<any> = forwardRef(({ href, ...other }, ref) => (
  <Link ref={ref} to={href} {...other} />
));

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;

