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
    render: function(){
        return (
            <div>
                <h2>Add new Idea</h2>
                <AddIdea handleSubmit={this.handleSubmit} handleChange={this.handleChange} idea={this.state.newIdea} streams={this.state.streams} handleStreamChange={this.handleStreamChange}/>
                {this.state.message}
                <hr />
            </div>
        )
    }
})

export default UserHomepage
