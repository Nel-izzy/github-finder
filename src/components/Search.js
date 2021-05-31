import { useState, Fragment } from "react";
import PropTypes from "prop-types";

const Search = ({ setAlert, searchUsers, clearUsers, showClear }) => {
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a value", "warning");
    } else {
      searchUsers(text);
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
      {showClear && (
        <button className="btn btn-block btn-light" onClick={clearUsers}>
          Clear
        </button>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
