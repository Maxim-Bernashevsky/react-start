import React, { Component } from 'react';
import ItemsForm from './ItemsForm';
import ItemImageCounter from './ItemImageCounter';

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return (
            <div className="container">
                <div className="btn-block">
                    <div className="delete-btn btn"
                        onClick={() => this.props.delete(this.props.id)}>X</div>
                </div>

                <ItemImageCounter
                    logoUrl={this.props.logoUrl}
                    like={this.props.like}
                    id={this.props.id}
                    onLike={this.props.onLike}/>

                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>

                <ItemsForm
                    id={this.props.id}
                    formType="edit"
                    logoUrl={this.props.logoUrl}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    editItem={this.props.edit}
                />
            </div>
        );
    }
};


