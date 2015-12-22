import Auth from '../utils/auth.jsx'

import StreamList from '../components/streamlist.jsx'
import AddStream from '../components/addstream.jsx'

var StreamHomepage = React.createClass({
    getInitialState(){
        return {
            streams: [],
            newIdea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": "",
            },
            streamId: "",
            newStream: {
                name: "",
                owner: Auth.getId()
            }
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
            fetch('/api/v1/stream?owner=' + ownerId + '&sort=updatedAt%20DESC', settings)
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
    handleChange(event){

        // Updates state when changed in AddStream input fields
        let newState = this.state
        newState.newStream[event.target.name] = event.target.value
        this.setState(newState)
    },
    handleSubmit(event){
        event.preventDefault()
        this.saveData(this.state.newStream)

    },
    saveData(stream){
        var token = Auth.getUser()
        var self = this
        var settings = {
            method: 'post',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            },
            body: JSON.stringify(stream)
        }

        if(token && stream.name){
            self.setState({message: 'Saving...'})
            fetch('/api/v1/stream/', settings)
            .then(function(response){
                if(response.status === 201){
                    self.setState({message: 'Stream Saved!'})
                    return response.json()
                } else {
                    self.setState({message: 'Saving Failed'})
                    return response
                }
            })
            .then(function(data){
                if(data.id){
                    this.state.streams.concat([data])
                    return self.setState({'newStream': {}})
                }
                return console.log('Save failed', data)
            })
        }
    },
    render(){
        return (
            <div>
                <h2>Your Streams</h2>
                <StreamList streams={this.state.streams} />
                <hr />
                <h3>Add new Stream</h3>
                <AddStream handleSubmit={this.handleSubmit} handleChange={this.handleChange} stream={this.state.newStream}/>
                {this.state.message}
            </div>
        )
    }
})

export default StreamHomepage
