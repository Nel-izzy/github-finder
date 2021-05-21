import { Component } from "react"
import axios from "axios"
import "./App.css"
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import Search from "./components/Search"


class App extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            loading: false,
            error: ""
        }
    }

    // async componentDidMount() {

    //     this.setState({ loading: true })

    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    //     this.setState({ users: res.data, loading: false })
    // }

    searchUsers = async text => {
        this.setState({ loading: true })

        if(!text){
            this.setState({loading: false, error: "Please enter a name!"})   
        }

        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

            this.setState({ users: res.data.items, loading: false, error: ""})
        } catch (error) {
            console.log(error);
        }

        
           
        

        
    }


    render() {
        const { users, loading, error } = this.state

        return (
            <div>
                <Navbar />
                <div className="container">
                    <Search searchUsers = {this.searchUsers}/>
                    <Users users={users} loading={loading} error={error}/>
                </div>

            </div>
        )
    }

}



export default App
