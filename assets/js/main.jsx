var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link


var HelloWorld = React.createClass({
    render: function(){
        return <h1>Hello World</h1>
    }
})

ReactDOM.render(<HelloWorld />, document.getElementById('app'))
