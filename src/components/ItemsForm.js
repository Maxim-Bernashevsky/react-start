import React, { Component } from 'react';
import { render } from 'react-dom';

let config = {
    form: {
        type: {
            edit: {
                titleForm: 'Редактировать место',
                titleSubmit: 'Сохранить',
                btnValue: '//'
            },
            add: {
                titleForm: 'Добавить новое место',
                titleSubmit: 'Добавить',
                btnValue: '+'
            }
        }
    }
};

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            subtitle: "",
            logoUrl: "",
            formDisplay: 'none'
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

    handleSubmit(e) {
        e.preventDefault();
        let item = {};

        if(this.props.editItem){
            item.id =  this.props.id;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl ? this.props.logoUrl : "http://placehold.it/200x130";
            this.props.editItem(item);
        }else{
            item.id = false;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl ? this.props.logoUrl : "http://placehold.it/200x130";
            this.props.addItem(item);
        }
        this.toggleForm();
    }

    toggleForm(){
        this.setState({
            id: this.props.id,
            title: this.props.title,
            subtitle: this.props.subtitle,
            logoUrl: this.props.logoUrl,
            formDisplay: (this.state.formDisplay === 'none' ? 'inherit' : 'none')
        });
    }

    render() {
        return (
            <div>
                <div className="modal">
                    <div
                        className="btnFormToggle btn"
                        onClick={this.toggleForm}>{config.form.type[this.props.formType].btnValue}</div>
                    <form
                        onSubmit={this.handleSubmit}
                        style={{ display: this.state.formDisplay }}>

                        <fieldset>
                            <legend>{config.form.type[this.props.formType].titleForm}</legend>
                            <label>
                                Название <br/>
                                <input
                                    type="text"
                                    value={this.state.title}
                                    ref="title"
                                    onChange={this.onFieldChange.bind(this, 'title')} />
                            </label>
                            <label>
                                Url изображния <br/>
                                <input
                                    type="text"
                                    value={this.state.logoUrl}
                                    ref="logoUrl"
                                    onChange={this.onFieldChange.bind(this, 'logoUrl')} />
                            </label>
                            <label>
                                Описание <br/>
                                <textarea
                                    rows="4"
                                    type="text"
                                    value={this.state.subtitle}
                                    ref="subtitle"
                                    onChange={this.onFieldChange.bind(this, 'subtitle')} />
                            </label>

                            <br/>
                            <input
                                type="submit"
                                value={config.form.type[this.props.formType].titleSubmit}
                                ref='alert_button' />
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
};

