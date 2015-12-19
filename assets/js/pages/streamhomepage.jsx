import Auth from '../utils/auth.jsx'

var StreamHomepage = React.createClass({
    getInitialState(){
        return {
            streams: []
        }
    },
    componentDidMount() {
        var user = Auth.getUser()
        var ownerId = user.id
        var self = this
        var settings = {
            method: 'get',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Origin': '',
               'Authorization' : 'Bearer: ' + user.token
            }
        }

        if(user){
            fetch('/api/v1/stream?owner=' + ownerId, settings)
            .then(function(response){
                if(response.ok){
                    return response.json()
                }
            })
            .then(function(data){
                var str = JSON.stringify(data)
                self.setState({'streams': str})
            })
        }
    },
    render: function(){
        return (
            <div>
                <h2>Streams</h2>
                {this.state.streams}
            </div>
        )
    }
})

export default StreamHomepage
