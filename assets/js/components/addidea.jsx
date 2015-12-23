import Input from './input.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import StreamDropdown from './StreamDropdown.jsx'

// pass handleSubmit & handleChange from parent component
var AddIdea = React.createClass({
    getDefaultProps() {
        return {
            idea: {
                "tags": [],
                "stream": {},
                "name": "",
                "content": "",
                "id": ""
            },
            streamId: "",
            streams: [{
                name: '',
                id: ''
            }]
        }
    },
    render(){
        return(
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <Input type="text" name="name" placeholder="Idea Name" className="input input-email" value={this.props.idea.name} onChange={this.props.handleChange} />
                    <Input type="text" name="content" placeholder="Content" className="input input-content" value={this.props.idea.content} onChange={this.props.handleChange} />
                    <StreamDropdown streams={this.props.streams} currentStream={this.props.currentStream} handleStreamChange={this.props.handleStreamChange} />
                    <Submit value="Save" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})

export default AddIdea
