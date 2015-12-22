import AddIdea from '../components/addidea.jsx'

var UserHomepage = React.createClass({
    getInitialState(){
        return {
            newIdea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": "",
                "id": ""
            }
        }
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
    render: function(){
        return (
            <div>
                <h2>Add new Idea</h2>
                <AddIdea handleSubmit={this.handleSubmit} handleChange={this.handleChange} idea={this.state.newIdea}/>
                <hr />
            </div>
        )
    }
})

export default UserHomepage
