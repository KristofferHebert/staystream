import Auth from '../utils/auth.jsx'

import StreamList from '../components/streamlist.jsx'
import AddIdea from '../components/addidea.jsx'

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
            streamId: ""
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

        // Updates state when changed in AddIdea input fields
        let newState = this.state
        newState.newIdea[event.target.name] = event.target.value
        this.setState(newState)
    },
    handleSubmit(event){
        event.preventDefault()
        this.saveData(this.state.newIdea)

    },
    saveData(idea){
        var token = Auth.getUser()
        var self = this
        var settings = {
            method: 'post',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            },
            body: JSON.stringify(idea)
        }

        if(token && idea.id){
            self.setState({message: 'Saving...'})
            fetch('/api/v1/idea/', settings)
            .then(function(response){
                if(response.status === 200){
                    self.setState({message: 'Idea Saved!'})
                    return response.json()
                } else {
                    self.setState({message: 'Saving Failed'})
                    return response
                }
            })
            .then(function(data){
                if(data.id){
                    this.state.streams.ideas.concat([data])
                    return self.setState({'newIdea': {}, streamId: {}})
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
                <AddIdea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                {this.state.message}
            </div>
        )
    }
})

export default StreamHomepage
