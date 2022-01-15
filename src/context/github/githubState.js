import { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  CLEAR_USERS,
  SET_LOADING,
  GET_USER,
  GET_REPOS,
  
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };


const [state, dispatch] = useReducer(GithubReducer, initialState);

 const searchUsers = async (text) => {
   setLoading();

   try {
     const res = await axios.get(
       `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
     );

     dispatch({
       type: SEARCH_USERS,
       payload: res.data.items,
     });
     
   } catch (error) {
     console.log(error);
   }
 };

 const getUser = async (login) => {
   setLoading();

   try {
     const res = await axios.get(
       `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
     );

     dispatch({
         type: GET_USER,
         payload: res.data
     })

   } catch (error) {
     console.log(error);
   }
 };

 const getUserRepos = async (login) => {
   setLoading();

   try {
     const res = await axios.get(
       `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
     );
    dispatch({
        type:GET_REPOS,
        payload: res.data
    })
    //  setRepos(res.data);
    //  setLoading(false);
   } catch (error) {
     console.log(error);
   }
 };


 const setLoading = () => dispatch({type: SET_LOADING})

 const clearUsers = () => dispatch({type: CLEAR_USERS})

return (
  <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>
);
}

export default GithubState;
