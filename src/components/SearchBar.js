import React from 'react';
import {connect} from 'react-redux';
import { AddItem, Search } from '../redux/action';
import { setLogin } from '../redux/action';
class SearchBar extends React.Component {

    handleChange = (e) => {
        this.props.Search(e.target.value);

    }

    handleSubmit = (e) => {
        console.log(this.props.isLogin,'vc')
        if(this.props.isLogin){
            console.log(this.props.currentUser,'ac')
            this.props.AddItem(this.props.name,this.props.currentUser);
        }
        else {
            this.props.AddItem(this.props.name);
        }
        
        this.props.Search("");
        e.preventDefault();
    }
    componentDidMount = () => {
        
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
    console.log(state.currentUser,'is login')
    return {
        currentUser: state.currentUser,
        isLogin: state.isLogin,
        name: state.Search
    }
}

export default connect(mapStateToProps,{AddItem, Search})(SearchBar);