import Auth from '../utils/auth.jsx'
import EditIdea from '../components/editidea.jsx'

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
            streamId: "",
            message: ""
        }
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
                self.setState({'idea': data, streamId: data.stream.id})
            })
        }
    },
    componentDidMount() {

        // Get data to populate Idea
        var ideaId = this.props.params.id
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
                <EditIdea idea={this.state.idea} streamId={this.state.streamId} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                {this.state.message}
            </div>
        )
    }
})

export default IdeaHomepage
