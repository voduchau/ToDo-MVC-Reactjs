import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Search, getItem, ChangeStatus, UpdateItem, DeleteItem, setLogin } from '../redux/action';
class ListItem extends Component {
    handleInputChange = (item) => {
         this.props.ChangeStatus(item)
        if(this.refs[item.id + 'x'].style.textDecoration === 'line-through')
        {
            this.refs[item.id + 'x'].style.textDecoration = 'none'
        }
        else
            this.refs[item.id + 'x'].style.textDecoration = 'line-through'
    }
    componentDidUpdate = () => {
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
    }
    handleBlur = (item,e) => {
        this.props.UpdateItem(item,e.target.value)
        this.refs[item.id].style.display = 'none'
        this.refs[item.id + 's'].style.display = 'inline-block'
    }
    handleDelete = (item) => {
        this.props.DeleteItem(item);
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
                            <div style={{marginLeft:10}}>
                                <i className="angle double left icon" onClick={()=>this.handleDelete(item)} >delete</i>
                                <p>{this.renderEmail}</p>
                            </div>
                        </div>
                    </div>
                    </label>
                </div>
                )
        }
        )
    }
    handleLogin = async () =>{
       await this.GoogleAPI.signIn();
        this.props.setLogin(this.GoogleAPI.isSignedIn.get());
    }
    handleLogout = async () =>{
        await this.GoogleAPI.signOut();
        this.props.setLogin(this.GoogleAPI.isSignedIn.get());
    }
  

    componentDidMount = async () => {
        // config google api
            await window.gapi.load('client:auth2', ()=>{
                 window.gapi.auth2.init({
                            clientId: '94088473979-iumbu96ofgk0ekhkerockjbprfco86k5.apps.googleusercontent.com',
                            scope: 'email'
                        }).then(()=>{
                            this.GoogleAPI = window.gapi.auth2.getAuthInstance();
                            this.props.setLogin(this.GoogleAPI.isSignedIn.get());
                        })
            })
            this.props.getItem();
    }
   renderButton =  () =>{
       if(this.props.isLogin){
           return (
                <>
                    <p>BAN DA DANG NHAP</p>
                    <button className="ui button" onClick={() =>this.handleLogout()} ref="logout">Logout</button>
                </>
           )
       }
       else
            return (
                <>
                    <p>BAN CHUA DANG NHAP</p>
                    <button className="ui button" onClick={() =>this.handleLogin()}  ref="login">Login</button>
                </>
            )
   }
  
    render() {
        return (
            <div>
                {this.renderItem()}
                <br />
                <div>
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        list: Object.values(state.getItem)
    }
}

export default connect(mapStateToProps,{Search, getItem, ChangeStatus, UpdateItem, DeleteItem, setLogin})(ListItem);