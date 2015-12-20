import Auth from '../utils/auth.jsx'

import StreamList from '../components/streamlist.jsx'

var IdeaHomepage = React.createClass({
    getInitialState(){
        return {
            streams: []
        }
    },
    fetchData(){
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
                self.setState({'streams': data})
            })
        }
    },
    componentDidMount() {

        // Get data to populate StreamsList
        this.fetchData()
    },
    render(){
        return (
            <div>
                <h2>Your Streams</h2>
                <StreamList streams={this.state.streams} />
            </div>
        )
    }
})

export default IdeaHomepage
