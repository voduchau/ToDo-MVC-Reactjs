import React, { Component } from 'react';
import {connect} from 'react-redux';
import { AddItem, Search, getItem, ChangeStatus } from '../redux/action';
class ListItem extends Component {
    componentDidMount = () => {
        this.props.getItem();
    }
    handleInputChange =  (item) => {
        console.log(item,'checked')
        // const value = e.target.name === e.target.checked? e.target.checked: e.target.value;

        this.props.ChangeStatus(item)
    }
    renderItem = () => {
        if (!this.props.list[0]) {
            return <div></div>
        }
        return this.props.list.map( item => {
        return (<div className="0ui checkbox">
                    <input type="checkbox" onChange={() => this.handleInputChange(item)} checked={item.status} id = {item.id} />
                    <label>
                        <div className="ui raised segment">
                            {item.title}
                        </div>
                    </label>
                </div>)
        }
        )
    }
    render() {
        return (
            <div>
                    {this.renderItem()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state.getItem,'this is state')
    return {
        list: Object.values(state.getItem)
    }
}

export default connect(mapStateToProps,{Search, getItem, ChangeStatus})(ListItem);