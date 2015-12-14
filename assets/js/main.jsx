var Login = require('./components/login.jsx')
React.render(<Login method="POST" action="/api/v1/auth" />, document.getElementById('main'))
