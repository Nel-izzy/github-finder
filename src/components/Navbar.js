import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
    return (
        <nav className="navbar bg-primary">
            <h1 ><i className={icon} /> {title}</h1>
        </nav>
    )

}

Navbar.defaultProps = {
    icon: "fab fa-github",
    title: "Github Lookup"
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
