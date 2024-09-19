import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Button({ to, children, className }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  )
}

Button.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Button