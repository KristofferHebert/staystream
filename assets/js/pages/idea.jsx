import Auth from '../utils/auth.jsx'
import EditIdea from '../components/editidea.jsx'
import DeleteResource from '../components/deleteresource.jsx'

var IdeaHomepage = React.createClass({
    getInitialState(){
        return {
            idea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": "",
                "id": ""
            },
            currentStream: "",
            streamId: "",
            message: ""
        }
    },
    getStreams(userID){
        var token = Auth.getToken()
        var self = this
        var settings = {
            method: 'get',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            }
        }

        if(token && userID){
            fetch('/api/v1/stream?owner=' + userID, settings)
            .then(function(response){
                if(response.status === 200){
                    return response.json()
                }
            })
            .then(function(streams){
                if(streams){
                    self.setState({streams: streams, currentStream: streams[0].id})
                } else {
                    console.log('Save failed', data)
                }
            })
        }
    },
    handleStreamChange(event){

        // Set current Stream
        let newState = this.state
        newState.currentStream = event.target.value

        console.log(newState)

        this.setState(newState)
    },
    fetchData(ideaId){
        var token = Auth.getUser()
        var self = this
        var settings = {
            method: 'get',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            }
        }

        if(token){
            fetch('/api/v1/idea/' + ideaId, settings)
            .then(function(response){
                if(response.ok){
                    return response.json()
                }
            })
            .then(function(data){
                self.setState({'idea': data, streamId: data.stream.id, currentStream: data.stream.name})
            })
        }
    },
    componentDidMount() {

        // Get data to populate Idea
        var ideaId = this.props.params.id
        var userID = Auth.getId()

        this.getStreams(userID)
        this.fetchData(ideaId)
    },
    handleChange(event){

        // Updates state when changed in EditIdea input fields
        let newState = this.state
        newState.idea[event.target.name] = event.target.value
        this.setState(newState)
    },
    handleSubmit(event){
        event.preventDefault()

        delete this.state.idea.updatedAt
        delete this.state.idea.createAt
        this.saveData(this.state.idea)

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
            fetch('/api/v1/idea/' + idea.id, settings)
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
                    return self.setState({'idea': data, streamId: data.stream.id})
                }
                return console.log('Save failed', data)
            })
        }
    },
    render(){
        return (
            <div>
                <h2>Edit Idea</h2>
                <EditIdea idea={this.state.idea} streamId={this.state.streamId} handleChange={this.handleChange} streams= {this.state.streams} currentStream={this.state.currentStream} handleSubmit={this.handleSubmit} />
                <DeleteResource resourceId={this.state.idea.id} endpoint="/api/v1/idea/" className="btn"/>
                {this.state.message}
            </div>
        )
    }
})

export default IdeaHomepage
