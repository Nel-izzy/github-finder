import PropTypes from 'prop-types'

import Spinner from "./Spinner.js"
import UserItem from './UserItem'

const Users = ({ loading, users, error }) => {

    return (
        <div style={userStyle}>
            {loading ? <Spinner /> : error ? <h1 className="text-warning">{error}</h1> : users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    )

}

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "1rem"
}

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
}



export default Users
