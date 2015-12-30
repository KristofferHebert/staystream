import { Link } from 'react-router'
import Date from './date.jsx'

var IdeaList = React.createClass({
    getDefaultProps() {
        return {
            ideas: [{
                name: '',
                id: '',
                content: '',
                stream: {
                    id: '',
                    name: ''
                }
            }],

        }
    },
    render(){
        var ideaslist = this.props.ideas.map((idea, i) => {
        var ideaLink = "/u/idea/" + idea.id

            return (
                <div key={i} className="idea-item">
                    <h3 className="mb">{idea.name} <Link to={ideaLink} className="fr small">(edit)</Link></h3>
                    <Date date={idea.updatedAt} />
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
