import React from 'react';
import {connect} from 'react-redux';
import { AddItem, Search } from '../redux/action';
class SearchBar extends React.Component {

    handleChange = (e) => {
        this.props.Search(e.target.value);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.AddItem(this.props.name);
        this.props.Search("");
    }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                <div className="ui category search" style={{textAlign: "center"}}>
                    <div className="ui icon input">
                        <input className="prompt" value={this.props.name} onChange={this.handleChange} type="text" placeholder="Add to do" style={{width: 500, margin:10}}/>
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
            </form>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        name: state.Search
    }
}

export default connect(mapStateToProps,{AddItem, Search})(SearchBar);