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
        var options = this.props.ideas.map((stream, i) => {

            return (
                <option key={i} value={stream.id}>{stream.name} </option>
            )
        })

        return (
            <select>
                {options}
            </select>
        )

})

export default StreamDropdown
