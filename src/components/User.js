import React, { Component } from 'react'
import PropTypes from 'prop-types'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.login)
    }
    
    render() {
        const {
          login,
          location, 
          html_url,
          name,
          following,
          followers,
          avatar_url,
          public_repos,
          public_gists
        } = this.props.user
        return (
            <div>
                {name}
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
}

export default User
