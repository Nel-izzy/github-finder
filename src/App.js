import { Component } from "react"
import axios from "axios"
import "./App.css"
import Navbar from "./components/Navbar"
import Users from "./components/Users"


class App extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            loading: false
        }
    }

    async componentDidMount() {
        console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
        this.setState({ loading: true })

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        this.setState({ users: res.data, loading: false })
    }


    render() {
        const { users, loading } = this.state

        return (
            <div>
                <Navbar />
                <div className="container">
                    <Users users={users} loading={loading} />
                </div>

            </div>
        )
    }

}



export default App
