import { useContext } from 'react'
import GithubContext from '../context/github/githubContext.js'

import Spinner from "./Spinner.js"
import UserItem from './UserItem'

const Users = () => {
    const githubContext = useContext(GithubContext)

    const { loading, users } = githubContext

    return (
        <div style={userStyle}>
            {loading ? <Spinner /> : users.map(user => (
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



export default Users
