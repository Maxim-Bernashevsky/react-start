import React, { Component } from 'react';
import Item from './Item';


export default class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const self = this;
        return (
            <div>
                {this.props.data.map(function (item) {
                    return <Item
                        id =       { item.id }
                        key =      { item.id }
                        like =     { item.like }
                        title =    { item.title }
                        subtitle = { item.subtitle }
                        logoUrl =  { item.logoUrl }
                        onLike =   { self.props.likeItem }
                        delete =   { self.props.deleteItem }
                        edit =     { self.props.editItem } />;
                })}
            </div>
        );
    }
};

