import { Component, Fragment } from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import axios from "axios"
import "./App.css"
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import Search from "./components/Search"
import Alert from "./components/Alert"
import About from "./components/About"
import User from "./components/User"


class App extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            loading: false,
            showClear: false,
            alert: null,
            user: {}
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

getUser = async login => {
    this.setState({ loading: true })

        try {
            const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

            this.setState({ user: res.data, loading: false})
        } catch (error) {
            console.log(error);
        }
}



    render() {
        const { users, loading, user} = this.state

        return (
            <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Alert alert = {this.state.alert} />
                    <Switch>
                        <Route exact path="/" render = {() => (
                            <Fragment>
                         <Search searchUsers = {this.searchUsers} 
                         clearUsers = {this.clearUsers} 
                         showClear ={users.length > 0}
                         setAlert = {this.setAlert}/>
                         <Users users={users} loading={loading} />
                         </Fragment>
                        )}
                        
                        />
                        <Route exact path="/about" component={About}/>
                        <Route path ="/user/:login" render = {(props) => (
                            <User {...props} loading={loading} getUser = {this.getUser} user={user}/>
                        )} />
                    
                    </Switch>
                </div>

            </div>
            </Router>
        )
    }

}



export default App
