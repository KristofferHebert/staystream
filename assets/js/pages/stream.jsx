import Auth from '../utils/auth.jsx'
import { Link } from 'react-router'

import StreamDetails from '../components/streamdetails.jsx'

var StreamPage = React.createClass({
    getInitialState(){
        return {
            stream: [],
            name: '',
            ideasLength: 0
        }
    },
    fetchData(streamId){
        var token = Auth.getToken()
        var self = this

        var settings = {
            method: 'get',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Origin': '',
               'Authorization' : 'Bearer: ' + token
            }
        }

        if(token){
            fetch('/api/v1/stream/' + streamId, settings)
            .then(function(response){
                if(response.ok){
                    return response.json()
                }
            })
            .then(function(data){
                self.setState({'stream': data, 'ideasLength': data.ideas.length})
            })
        }
    },
    componentDidMount(){
        var streamId = this.props.params.id
        if(streamId) this.fetchData(streamId)
    },
    render(){
        return (
            <div>
                <StreamDetails stream={this.state.stream} ideasLength={this.state.ideasLength} />
            </div>
        )
    }
})

export default StreamPage
