import React, { Component, Fragment } from 'react'

class Search extends Component {
    state = { text: "" }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault()
        this.props.searchUsers(this.state.text); 
        this.setState({text: ""})
    }
    render() {
        return (
            <Fragment>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Search Users..." value={this.state.text} name="text" onChange={this.onChange} />
                    <input type="submit" className="btn btn-dark btn-block" value="Search" />
                </form>
            </Fragment>
        )
    }
}

export default Search
