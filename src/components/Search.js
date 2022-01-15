import { useState, Fragment, useContext } from "react";
import AlertContext from "../context/alert/alertContext";

import GithubContext from "../context/github/githubContext";

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)

  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter a value", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search Users..."
          value={text}
          name="text"
          onChange={onChange}
        />
        <input
          type="submit"
          className="btn btn-dark btn-block"
          value="Search"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button className="btn btn-block btn-light" onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </Fragment>
  );
};



export default Search;
