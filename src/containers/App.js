import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemsForm from '../components/ItemsForm';
import ItemsList from '../components/ItemsList';
import Chat from './Chat';
import * as ItemActions from '../actions/ItemActions';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Chat />

                <ItemsForm
                     addItem={this.props.ItemActions.addItem}
                     formType="add"
                 />
                <div>{this.props.user.test}</div>

                <ItemsList
                    data={this.props.list.data}
                    likeItem={this.props.ItemActions.likeItem}
                    deleteItem={this.props.ItemActions.deleteItem}
                    editItem={this.props.ItemActions.editItem}
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        list: state.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators(ItemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

