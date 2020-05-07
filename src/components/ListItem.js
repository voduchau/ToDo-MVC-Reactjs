import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { AddItem, Search, getItem, ChangeStatus,UpdateItem } from '../redux/action';
class ListItem extends Component {

    
    handleInputChange = (item) => {
         this.props.ChangeStatus(item)
        if(this.refs[item.id + 'x'].style.textDecoration == 'line-through')
        {
            this.refs[item.id + 'x'].style.textDecoration = 'none'
        }
        else
            this.refs[item.id + 'x'].style.textDecoration = 'line-through'
    }
    componentDidMount = () => {
        this.props.getItem();
    }
    componentDidUpdate = () => {
        // this.props.getItem();
        this.props.list.map(item => {
            if(item.status){
                this.refs[item.id+'x'].style.textDecoration = 'line-through'
            }
        })
    }
 

    handleClickEdit = (item) => {
        this.refs[item.id].style.display = 'inline-block'
        this.refs[item.id + 's'].style.display = 'none'
    }
    handleFocus = (e) => {
        // console.log(e.target.value,"focus")
    }
    handleBlur = (item,e) => {
        this.props.UpdateItem(item,e.target.value)
        this.refs[item.id].style.display = 'none'
        this.refs[item.id + 's'].style.display = 'inline-block'
    }

    renderItem = () => {
        return this.props.list.map( item => {
        return (
                <div className="ui huge checkbox" ref={item.id+"x"} key={item.id} style={{display:'block', height:60}}>
                    <input type="checkbox" onChange={() => this.handleInputChange(item)} checked={item.status} id = {item.id+"id"} />
                    <label>
                    <div className="ui raised segment" onDoubleClick={() => this.handleClickEdit(item)} >
                    <div className="ui transparent input" ref={item.id} style={{display: 'none'}}>
                        <form onSubmit={this.handleSubmitEdit}>
                            <div className="ui transparent input">
                                <input type="text" onFocus={this.handleFocus} onBlur={(e)=>this.handleBlur(item,e)} onChange = {this.handleEdit} defaultValue={item.title} placeholder="" />
                            </div>
                        </form>
                        </div>
                        <div className="ui transparent input" ref={item.id + 's'} >
                            {item.title}
                        </div>
                    </div>
                    </label>
                </div>
                )
        }
        )
    }
   
    
    render() {
        return (
            <div>
                    {this.renderItem()}
                <br />
                <button className="ui button" ref="xxx">Click Here</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: Object.values(state.getItem)
    }
}

export default connect(mapStateToProps,{Search, getItem, ChangeStatus, UpdateItem})(ListItem);