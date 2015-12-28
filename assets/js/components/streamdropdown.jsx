import { Link } from 'react-router'


var StreamDropdown = React.createClass({
    getDefaultProps() {
        return {
            currentStream: "",
            currentStreamName: "",
            streams: [{
                name: '',
                id: '',
            }]
        }
    },
    render(){
        console.log("stream name",this.props.currentStreamName)

        var options = this.props.streams.map((stream, i) => {
            return (
                <option key={i} value={stream.id} selected={this.props.currentStreamName == stream.name}>{stream.name} </option>
            )
        })

        return (
            <select onChange={this.props.handleStreamChange}>
                {options}
            </select>
        )
    }
})

export default StreamDropdown
