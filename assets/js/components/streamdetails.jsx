import IdeaList from './idealist.jsx'

var StreamDetails = React.createClass({
    getDefaultProps() {
        return {
            stream: {
                name: '',
                id: '',
                ideas: []
            },
            ideasLength: 0
        }
    },
   render(){
       return (
           <div clasName={this.props.className}>
               <h2>Stream: {this.props.stream.name} ({this.props.ideasLength})</h2>
               <IdeaList ideas={this.props.stream.ideas} />
           </div>
       )
   }
})

export default StreamDetails
