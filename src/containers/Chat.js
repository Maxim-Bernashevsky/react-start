import React, { Component } from 'react';

export default class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: "",
            chatDisplay: 'none',
            messages: [
                'qweqweqweqwe asdasdasdasd poipoipipoip uiyiuyiuyuyi',
                'asdasdasdasd qweqweqweqwe poipoipipoip uiyiuyiuyuyi',
                'poipoipipoip asdasdasdasd qweqweqweqwe uiyiuyiuyuyi',
                'uiyiuyiuyuyi asdasdasdasd qweqweqweqwe poipoipipoip'
            ]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    onFieldChange(fieldName, e) {
        const val = e.target.value;
        this.setState({
            [''+fieldName]: val
        });
    }

    toggleForm(){
        this.setState({
            message: "",
            chatDisplay: (this.state.chatDisplay === 'none' ? 'inherit' : 'none')
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.messages.push(this.state.message);
        this.setState(this.state.messages);

    }

    render(){
        return (

            <div>
                <div className="btnFormToggle btn btnChat" onClick={this.toggleForm}>#</div>

                <div
                    className="chatBlock"
                    style={{ display: this.state.chatDisplay }}>

                    <ul>
                        {this.state.messages.map(function (text, i) {
                            return <li key={i}>{text}</li>
                        })}
                    </ul>
                    <form
                        onSubmit={this.handleSubmit}>

                        <label htmlFor="message">Chat</label>
                        <input
                            id="message"
                            type="text"
                            onChange={this.onFieldChange.bind(this, 'message')}
                            value={this.state.message}
                            placeholder="text message" />
                        <input
                            type="submit"
                            value=">>"/>
                    </form>
                    
                </div>
            </div>
        );
    }
}

