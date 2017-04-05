var ImageCounter = function (props) {
    return (
        <div className="image-counter">
            <div className="count">{props.count}</div>
            <img src={'img/' + props.logoUrl} onClick={props.onCount}/>
        </div>
    )
};

var Hero = React.createClass({
    getInitialState: function () {
      return {
          count: 0
      }
    },
    handleClick: function() {
        this.setState({ count: this.state.count + 1 });
    },
    render: function () {
        return (
            <div className="container">
                <ImageCounter logoUrl={this.props.logoUrl} count={this.state.count} onCount={this.handleClick}/>
                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>
            </div>
        )
    }
});

class NewItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            logoUrl: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        //this.onBtnClickHandler = this.onBtnClickHandler(this);
    }

    onFieldChange(fieldName, e) {
        var val = e.target.value;
             this.setState({[''+fieldName]: val});
    }
    

    handleSubmit(e) {
        e.preventDefault();
        alert("Название: "
            + this.state.title + "\b\r"
            + "Описание: "
            + this.state.subtitle + "\b\r"
            + "Изображение: "
            + this.state.logoUrl);

        let title = ReactDOM.findDOMNode(this.refs.title).value;
        console.log(title);
        let subtitle = ReactDOM.findDOMNode(this.refs.subtitle).value;
        console.log(subtitle);
        let logoUrl = ReactDOM.findDOMNode(this.refs.logoUrl).value;
        console.log(logoUrl);


        let item = [{
            title: title,
            subtitle: subtitle,
            logoUrl: logoUrl
        }];

        //console.log(item);


    }

    render() {
        return(
            <div>
                <div className="modal">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Название <br/>
                            <input
                                type="text"
                                value={this.state.title}
                                ref="title"
                                onChange={this.onFieldChange.bind(this, 'title')} />
                        </label>
                        <label>
                            Описание <br/>
                            <input
                                type="text"
                                value={this.state.subtitle}
                                ref="subtitle"
                                onChange={this.onFieldChange.bind(this, 'subtitle')} />
                        </label>
                        <label>
                            Url изображния <br/>
                            <input
                                type="text"
                                value={this.state.logoUrl}
                                ref="logoUrl"
                                onChange={this.onFieldChange.bind(this, 'logoUrl')} />
                        </label>
                        <br/>
                        <input
                            type="submit"
                            value="Добавить"

                            ref='alert_button'
                        />
                    </form>
                </div>
            </div>
        )
    }
};

window.ee = new EventEmitter();

var List = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <div>
                {this.props.data.map(function (hero) {
                    return <Hero   key={hero.id}
                                   title={hero.title}
                                   subtitle={hero.subtitle}
                                   logoUrl={hero.logoUrl}
                    />
                })}
            </div>
        )
    }
});

var App = React.createClass({
    componentDidMount: function() {
        /* Слушай событие "Создана новость"
         если событие произошло, обнови this.state.news
         */
    },
    componentWillUnmount: function() {
        /* Больше не слушай событие "Создана новость" */
    },
    render: function () {
        return (
            <div>
                <NewItem />
                <List data={this.props.heroes}/>
            </div>
        )
    }
});

var data = [
    {
        id: 1,
        title:"Место 1",
        subtitle:"Хорошо хорошо хорошо",
        logoUrl:"react.png"
    },
    {
        id: 2,
        title:"Second place",
        subtitle:"Отлично отлично отлично",
        logoUrl:"angular.png"
    },
    {
        id: 3,
        title:"Второе место",
        subtitle:"Великолепно Великолепно Великолепно",
        logoUrl:"ember.png"
    }
];

ReactDOM.render(
    <App heroes={data}/>,
    document.getElementById('root'));


