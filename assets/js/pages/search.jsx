import IdeaList from '../components/idealist.jsx'
import Auth from '../utils/auth.jsx'


var SearchPage = React.createClass({
    getInitialState(){
        return {
            ideas: [
              {
                "stream": "",
                "name": "",
                "content": "",
                "id": ""
              }
            ],
            ideasLength: 0,
            query: ""
        }
    },
    fetchData(query){
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

        if(token && query){
            fetch('/api/v1/idea/search?q=' + query, settings)
            .then(function(response){
                if(response.ok){
                    return response.json()
                }
            })
            .then(function(data){
                self.setState({'ideas': data, 'ideasLength': data.length})
            })
        }
    },
    componentDidMount(){
        var query = this.props.params.q
        this.setState({query: query})
        this.fetchData(query)
    },
    render(){
        return (
            <div>
                <h2>{this.state.ideasLength} Results for {this.state.query}</h2>
                <IdeaList ideas={this.state.ideas}/>
            </div>
        )
    }
})

export default SearchPage
