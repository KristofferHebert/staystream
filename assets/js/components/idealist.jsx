import { Link } from 'react-router'

var IdeaList = React.createClass({
    getDefaultProps() {
        return {
            ideas: [{
                name: '',
                id: '',
                content: ''
            }]
        }
    },
    render(){
        var ideaslist = this.props.ideas.map((idea, i) => {
        var ideaLink = "/u/idea/" + idea.id

            return (
                <div key={i} className="idea-item">
                    <h3>{idea.name} <Link to={ideaLink} className="fr">(edit)</Link></h3>
                    <p>{idea.content}</p>
                </div>
            )
        })

        return(
            <article>
                {ideaslist}
            </article>
        )
    }
})

export default IdeaList
