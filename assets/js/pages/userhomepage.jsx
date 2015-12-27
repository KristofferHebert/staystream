import AddIdea from '../components/addidea.jsx'
import Auth from '../utils/auth.jsx'

var UserHomepage = React.createClass({
    getInitialState(){
        return {
            newIdea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": ""
            },
            streams: [],
            currentStream: "",
            message: ""
        }
    },
    componentDidMount(){
        var userID = Auth.getId()
        this.getStreams(userID)
    },
    handleStreamChange(event){

        // Set current Stream
        let newState = this.state
        newState.currentStream = event.target.value

        console.log(newState)

        this.setState(newState)
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
        if(newIdea.name === "" || newIdea.content === "") {
            this.setState({message: 'Please fill out all fields'})
            return false
        }
        newIdea.stream = this.state.currentStream
        console.log(newIdea)
        this.setState({newIdea: newIdea})
        this.saveData(this.state.newIdea)

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
                if(response){
                    self.setState({
                            newIdea: {
                            "tags": [],
                            "stream": {},
                            "name": "",
                            "content": ""
                            }
                        })

                    } else {
                        console.log('Save failed')
                    }
            })
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

        var newIdea = this.state.newIdea
        // For version 2 adding tags
        // newIdea.tags = newTags

        newIdea.content = newContent
        console.log(newIdea)
        this.setState({newIdea: newIdea})
    },
    render: function(){
        return (
            <div>
                <h2>Add new Idea</h2>
                <AddIdea handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    idea={this.state.newIdea}
                    streams={this.state.streams}
                    handleStreamChange={this.handleStreamChange}
                    handleContentChange={this.handleContentChange}/>
                {this.state.message}
                <hr />
            </div>
        )
    }
})

export default UserHomepage
