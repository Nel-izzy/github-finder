import { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Search from "./components/Search";
import Alert from "./components/Alert";
import About from "./components/About";
import User from "./components/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setUsers(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUsers = () => setUsers([]);
  const showAlert = (msg, type) => {
    setAlert(msg, type);

    setTimeout(() => setAlert(null), 3000);
  };

  const getUser = async (login) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRepos = async (login) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setRepos(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  loading={loading}
                  getUser={getUser}
                  user={user}
                  repos={repos}
                  getUserRepos={getUserRepos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
