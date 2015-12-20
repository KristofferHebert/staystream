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
            streamId: ""
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
            fetch('/api/v1/stream/' + streamId + '?sort=updatedAt%20DESC', settings)
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
                            'ideasLength': self.ideasLength + 1
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
                <StreamDetails stream={this.state.stream} ideasLength={this.state.ideasLength} />
                <hr />
                <h3>Add new Idea</h3>
                <AddIdea handleSubmit={this.handleSubmit} handleChange={this.handleChange} idea={this.state.newIdea}/>
                {this.state.message}
            </div>
        )
    }
})

export default StreamPage
