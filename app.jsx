
class Form extends React.Component{

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

        let title = ReactDOM.findDOMNode(this.refs.title).value;
        let subtitle = ReactDOM.findDOMNode(this.refs.subtitle).value;
        let logoUrl = ReactDOM.findDOMNode(this.refs.logoUrl).value;
        let item = [{
            title: title,
            subtitle: subtitle,
            logoUrl: logoUrl ? logoUrl : "http://placehold.it/200x130"
        }];

        if(this.props.formType === 'new'){
            this.props.addItem(item);
        }else{
            this.props.redactItem(item);
        }
        this.toggleForm();
    }

    toggleForm(){
        this.setState({
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
                                onChange={this.onFieldChange.bind(this, 'title')}/>
                        </label>
                        <label>
                            Url изображния <br/>
                            <input
                                type="text"
                                value={this.state.logoUrl}
                                ref="logoUrl"
                                onChange={this.onFieldChange.bind(this, 'logoUrl')}/>
                        </label>
                        <label>
                            Описание <br/>
                            <textarea
                                rows="4"
                                type="text"
                                value={this.state.subtitle}
                                ref="subtitle"
                                onChange={this.onFieldChange.bind(this, 'subtitle')}></textarea>
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
        )
    }
};

let ImageCounter = function (props) {
    return (
        <div className="image-counter">
            <div className="count">{props.count}</div>
            <img
                src={props.logoUrl}
                onClick={props.onCount}/>
        </div>
    )
};

let Item = React.createClass({
    getInitialState: function () {
        return {
            count: 0
        }
    },

    deleteClick() {
        this.props.delete(this.props.id);
    },
    redactClick: function (item) {
        item[0].id = this.props.id;
        this.props.redact(item);
    },
    handleClick: function() {
        this.setState({ count: this.state.count + 1 });
    },
    render: function () {
        return (
            <div className="container">
                <div className="btn-block">
                    <div className="delete-btn btn"
                         onClick={this.deleteClick}>X</div>
                </div>

                <ImageCounter
                    logoUrl={this.props.logoUrl}
                    count={this.state.count}
                    onCount={this.handleClick}/>
                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>

                <Form
                    formType="redact"
                    logoUrl={this.props.logoUrl}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    redactItem={this.redactClick}
                />
            </div>
        )
    }
});

let List = React.createClass({

    deleteItem: function (key) {
        // this.props.deleteItem(key);
    },
    redactItem: function (item) {
        // this.props.redactItem(item);
    },

    render: function () {
        const self = this;
        return (
            <div>
                {this.props.data.map(function (item) {

                    return <Item
                         id =       { item.id }
                         key =      { item.id }
                         title =    { item.title }
                         subtitle = { item.subtitle }
                         logoUrl =  { item.logoUrl }
                         delete =   { self.props.deleteItem }
                         redact =   { self.props.redactItem }
                    />
                })}
            </div>
        )
    }
});

let App = React.createClass({
    getInitialState: function () {
        return {
            data: data
        }
    },
    delete: function (id) {
        let afterDeleteData = this.state.data.filter(function(el) {
            return el.id !== id
        });
        this.setState({
            data: afterDeleteData
        })
    },
    add: function(data){
      function uniqueId(data) {
          let newId = Math.floor(Math.random() * 100);
          let lengthData = data.filter((el)=>{
              return el.id === newId;
          });
          return lengthData.length === 0 ? newId : uniqueId();
      }
      data[0].id = uniqueId(this.state.data);


      this.setState({
          data: this.state.data.concat(data)
      })
    },
    redact: function (item) {
        let newData = this.state.data;

        for(let i = 0; i < this.state.data.length; i++){

            if(this.state.data[i].id === item[0].id){
                newData[i].title = item[0].title;
                newData[i].subtitle = item[0].subtitle;
                newData[i].logoUrl = item[0].logoUrl;
                break;
            }
        }

        this.setState({
            data: newData
        });

    },
    render: function () {
        return (
            <div>

                <List
                    data={this.state.data}
                    deleteItem={this.delete}
                    redactItem={this.redact}/>
                <Form
                    addItem={this.add}
                    formType="new"
                />
            </div>
        )
    }
});

let data = [
    {
        id: 1,
        title:"Место 1",
        subtitle:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        logoUrl:"https://media-cdn.tripadvisor.com/media/photo-s/05/47/21/54/percorso.jpg"
    },
    {
        id: 2,
        title:"Second title",
        subtitle:"Ut eget sagittis nulla. Phasellus id egestas dui.",
        logoUrl:"https://media-cdn.tripadvisor.com/media/photo-s/08/9b/96/02/getlstd-property-photo.jpg"
    },
    {
        id: 3,
        title:"Третье место",
        subtitle:"Sed a maximus orci. Duis hendrerit mattis interdum.",
        logoUrl:"https://media-cdn.tripadvisor.com/media/photo-s/0b/e7/2e/b8/caption.jpg"
    },
    {
        id: 4,
        title:"Local Kebab",
        subtitle:"Sed a maximus orci. Duis hendrerit mattis interdum.",
        logoUrl:"http://www.fiesta.city/uploads/slider_image/image/90838/v880_6.jpg"
    },

];

let config = {
    form: {
        type: {
            redact: {
                titleForm: 'Редактировать место',
                titleSubmit: 'Сохранить',
                btnValue: '//'
            },
            new: {
                titleForm: 'Добавить новое место',
                titleSubmit: 'Добавить',
                btnValue: '+'
            }
        }
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root'));


