import { Link } from 'react-router'


var StreamDropdown = React.createClass({
    getDefaultProps() {
        return {
            currentStream: "",
            streams: [{
                name: '',
                id: '',
            }]
        }
    },
    render(){
        console.log(this.props.currentStream)
        
        var options = this.props.streams.map((stream, i) => {
            return (
                <option key={i} value={stream.id} selected={this.props.currentStream == stream.name}>{stream.name} </option>
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
