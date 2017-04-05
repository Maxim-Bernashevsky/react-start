var logo = React.createElement('img', { src: 'https://facebook.github.io/react/img/logo.svg' })
var title = React.createElement('h1', null, 'React');
var subTitle = React.createElement('p', null, 'Библиотека для создания пользовательских интерфейсов');
var container = React.createElement('div', { className: 'container' }, logo, title, subTitle );

ReactDOM.render(container, document.getElementById('root'));


