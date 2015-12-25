var DeleteResource = React.createClass({
    getInitialState(){
        return {
            message: ""
        }
    },
    handleDelete(){
        var resourceId = this.props.resourceId

        var token = Auth.getUser()
        var self = this
        var settings = {
            method: 'delete',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            }
        }

        if(resourceId){
            fetch(this.props.endpoint + resourceId, settings)
            .then(function(response){
                if(response.status === 200){
                    self.setState({message: 'Idea Deleted!'})
                    return response.json()
                } else {
                    self.setState({message: 'Delete Failed'})
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
                <a onClick={this.handleDelete} className={this.props.className}> Delete </a>
                {this.state.message}
            </div>
        )
    }
})

export default DeleteResource
