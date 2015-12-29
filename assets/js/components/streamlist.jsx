import { Link } from 'react-router'

var StreamList = React.createClass({
    getDefaultProps() {
        return {
            streams: []
        }
    },
    render(){
        var Streams = this.props.streams.map((stream, i)=>{
            var streamlink = "/u/stream/" + stream.id
            return (
                <li>
                    <Link to={streamlink} key={i}>{stream.name} ({stream.ideas.length})</Link>
                    <Link to={streamlink} className="fr"> add new idea</Link>
                </li>
            )
        })

        return (
            <ul className={this.props.className}>
                {Streams}
            </ul>
        )
    }
})

export default StreamList
