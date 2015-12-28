import Auth from '../utils/auth.jsx'
import { Link } from 'react-router'

import StreamDetails from '../components/streamdetails.jsx'
import AddIdea from '../components/addidea.jsx'

var StreamPage = React.createClass({
    getInitialState(){
        return {
            stream: [],
            name: '',
            ideasLength: 0,
            newIdea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": "",
            },
            streamId: "",
            currentStream: "",
            currentStreamName: "",
            streams: []
        }
    },
    handleStreamChange(event){

        // Set current Stream
        let newState = this.state
        newState.currentStream = event.target.value
        this.setState(newState)
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
            fetch('/api/v1/stream/' + streamId + '?sort=updatedAt%20DESC', settings)
            .then(function(response){
                if(response.ok){
                    return response.json()
                }
            })
            .then(function(data){
                console.log('currentStream',data)
                self.setState({'stream': data, 'ideasLength': data.ideas.length, 'currentStreamName': data.name})
            })
        }
    },
    componentDidMount(){
        var streamId = this.props.params.id
        if(streamId) this.fetchData(streamId)
        var userID = Auth.getId()
        this.getStreams(userID)
    },
    getTags(string){
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
    addHashtags(string){
        var updatedString = string.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span>$2</span>') || ""
        return updatedString
    },
    handleContentChange: function(event){
        var newTags = this.getTags(event.target.value)
        var newContent = this.addHashtags(event.target.value)

        var newIdea = this.state.newIdea
        // For version 2 adding tags
        // newIdea.tags = newTags

        newIdea.content = newContent
        console.log(newIdea)
        this.setState({idea: newIdea})
    },
    handleChange(event){

        // Updates state when changed in AddIdea input fields
        let newState = this.state
        newState.newIdea[event.target.name] = event.target.value
        this.setState(newState)
    },
    handleSubmit(event){
        event.preventDefault()
        var newIdea = this.state.newIdea
        newIdea.stream = this.props.params.id

        this.setState({newIdea: newIdea})
        this.saveData(this.state.newIdea)

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
    saveData(idea){
        var token = Auth.getToken()
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

        if(token){
            self.setState({message: 'Saving...'})
            fetch('/api/v1/idea/', settings)
            .then(function(response){
                if(response.status === 201){
                    self.setState({message: 'Idea Saved!'})
                    return response.json()
                } else {
                    self.setState({message: 'Saving Failed'})
                    return response
                }
            })
            .then(function(response){
                if(response.data.id){
                    var updatedStreams = self.state.stream.ideas.concat([response.data])
                    self.setState({
                            newIdea: {
                            "tags": [],
                            "stream": {},
                            "name": "",
                            "content": "",
                            },
                            'stream': {
                                ideas: updatedStreams
                            },
                            'ideasLength': self.state.ideasLength + 1
                        })

                    } else {
                        console.log('Save failed', data)
                    }
            })
        }
    },
    render(){
        return (
            <div>
                <h3>Add new idea to {this.state.stream.name}</h3>
                <AddIdea handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    idea={this.state.newIdea}
                    handleStreamChange={this.handleStreamChange}
                    streams={this.state.streams}
                    currentStreamName={this.state.currentStreamName}
                    handleContentChange={this.handleContentChange}
                    />
                {this.state.message}
                <hr />
                <StreamDetails stream={this.state.stream} ideasLength={this.state.ideasLength} />
            </div>
        )
    }
})

export default StreamPage
