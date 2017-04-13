import React, { Component } from 'react';

export default class ImageCounter extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="image-counter">
                <div className="count">{this.props.like}</div>
                <img
                    src={this.props.logoUrl}
                    onClick={() => this.props.onLike(this.props.id, this.props.like)}/>
            </div>
        );
    }
};


