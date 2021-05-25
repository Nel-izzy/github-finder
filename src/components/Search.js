import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


class Search extends Component {
    state = { text: "" }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

   

    onSubmit = e => {
        e.preventDefault()
        if(this.state.text === ""){
            this.props.setAlert("Please enter a value", "warning")
        }else{
            this.props.searchUsers(this.state.text); 
            this.setState({text: ""})
        }
        
    }
    render() {
       
        return (
            <Fragment>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Search Users..." value={this.state.text} name="text" onChange={this.onChange} />
                    <input type="submit" className="btn btn-dark btn-block" value="Search" />
                </form>
                {this.props.showClear && <button className="btn btn-block btn-light" onClick={this.props.clearUsers}>Clear</button>}
            </Fragment>
        )
    }
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search
