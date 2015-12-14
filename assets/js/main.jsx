var Login = require('./components/login.jsx')
ReactDOM.render(<Login method="POST" action="/api/v1/auth" />, document.getElementById('app'))
