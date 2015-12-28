import Auth from '../utils/auth.jsx'
import EditIdea from '../components/editidea.jsx'
import DeleteResource from '../components/deleteresource.jsx'

var IdeaHomepage = React.createClass({
    getInitialState(){
        return {
            idea: {
                "tags": [],
                "stream": "",
                "name": "",
                "content": "",
                "id": ""
            },
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
                    self.setState({streams: streams })
                } else {
                    console.log('Save failed', data)
                }
            })
        }
    },
    handleStreamChange(event){

        // Set current Stream
        let newState = this.state
        newState.idea.stream = event.target.value
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
                self.setState({'idea': data, streamId: data.stream.id, currentStreamName: data.stream.name })
                console.log(self.state)
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
    getTags: function(string){
        var tags = string.match(/#[\w]+(?=\s|$)/g)
        if(tags === null) {
            return []
        }
        tags.map(function(val){ return val.substring(1)})
        tags = tags.filter(function(item, pos, self) {
            return self.indexOf(item) == pos
        })
        return tags
    },
    addHashtags: function(string){
        var updatedString = string.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span>$2</span>') || ""

        return updatedString
    },
    handleContentChange: function(event){
        var newTags = this.getTags(event.target.value)
        var newContent = this.addHashtags(event.target.value)

        var newIdea = this.state.idea
        // For version 2 adding tags
        // newIdea.tags = newTags

        newIdea.content = newContent
        console.log(newIdea)
        this.setState({idea: newIdea})
    },
    render(){
        return (
            <div>
                <h2>Edit Idea</h2>
                <EditIdea idea={this.state.idea}
                    streamId={this.state.streamId}
                    handleChange={this.handleChange}
                    streams={this.state.streams}
                    currentStreamName={this.state.currentStreamName}
                    currentStream={this.state.currentStream}
                    handleStreamChange={this.handleStreamChange}
                    handleContentChange={this.handleContentChange}
                    handleSubmit={this.handleSubmit}
                    html={this.state.idea.content} />
                <DeleteResource resourceId={this.state.idea.id} endpoint="/api/v1/idea/" className="btn"/>
                {this.state.message}
            </div>
        )
    }
})

export default IdeaHomepage
