import { Component } from "react"
import axios from "axios"
import "./App.css"
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import Search from "./components/Search"
import Alert from "./components/Alert"


class App extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            loading: false,
            showClear: false,
            alert: null
        }
    }

    // async componentDidMount() {

    //     this.setState({ loading: true })

    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    //     this.setState({ users: res.data, loading: false })
    // }

    searchUsers = async text => {
        this.setState({ loading: true })

        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

            this.setState({ users: res.data.items, loading: false})
        } catch (error) {
            console.log(error);
        }
}

  clearUsers = () => this.setState({users: []})
  setAlert = ((msg, type) => {
      this.setState({alert : {
      msg, 
      type
  }})

  setTimeout(() => this.setState({alert: null}), 3000)
})



    render() {
        const { users, loading} = this.state

        return (
            <div>
                <Navbar />
                <div className="container">
                    <Alert alert = {this.state.alert} />
                    <Search searchUsers = {this.searchUsers} 
                    clearUsers = {this.clearUsers} 
                    showClear ={this.state.users.length > 0}
                    setAlert = {this.setAlert}/>
                    <Users users={users} loading={loading} />
                </div>

            </div>
        )
    }

}



export default App
