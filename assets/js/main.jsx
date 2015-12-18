var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

var HomePage = require('./pages/homepage.jsx')


var App = React.createClass({
    render: function(){
        return (
            <HomePage />
        )
    }
})

ReactDOM.render(<App />, document.getElementById('app'))
