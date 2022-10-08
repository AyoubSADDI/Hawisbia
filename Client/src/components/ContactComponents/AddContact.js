import React, { Component } from 'react'

export default class AddContact extends Component {
    state={
        firstName: "",
        lastName: "",
        mail: "",
        message: "",
    };

    add =(e) =>{
        e.preventDefault();
        if (this.state.firstName === "" || this.state.lastName === "" ||this.state.mail === ""  ||this.state.message === ""  ){
            alert("there is an empty field(s) ...!");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({
            firstName: "",
            lastName: "",
            mail: "",
            message: ""  })
        console.log(this.state);
    }

    render() {
        return (
            <>
            <form onSubmit={this.add} class="row" id="form1" method="post" name="form1">
              <input id="name" 
              name="name" 
              placeholder="your first name" 
              type="text" 
              value ={this.state.firstName}
              onChange={ (e) => this.setState({firstName : e.target.value})}
              /> 

              <input id="lastName" 
              name="lastName" 
              placeholder="your last name" 
              type="text" 
              value ={this.state.lastName}
              onChange={ (e) => this.setState({lastName : e.target.value})}
              /> 

              <input id="email" 
              name="email" 
              placeholder="your e-mail" 
              type="text" 
              value ={this.state.mail}
              onChange={ (e) => this.setState({mail : e.target.value})}/>
              <div class="error" id="error_email">Please check your email</div>

              <textarea cols="50" 
              id="message" 
              name="message" 
              placeholder="your enquiry" 
              rows="4"
              value ={this.state.message}
              onChange={ (e) => this.setState({message : e.target.value})}>
              </textarea>
                <div class="error" id="error_message">Please check your message</div>
                <div class="success" id="mail_success">Thank you. Your message has been sent.</div>
                <div class="error" id="mail_failed">Error, email not sent</div>
              <button id="send" class="btn-content" type="submit">SEND</button>
            </form>
              
            </>
        )
    }
}
