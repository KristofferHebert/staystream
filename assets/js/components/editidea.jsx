import Input from './input.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import StreamDropdown from './streamdropdown.jsx'
import ContentEditable from './contenteditable.jsx'


// pass handleSubmit & handleChange from parent component
var EditIdea = React.createClass({
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
            streams: [],
            currentStream: ""
        }
    },
    render(){
        return(
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <div className="row">
                        <div className="half">
                            <Input type="text" name="name" placeholder="Idea Name" className="input input-email" value={this.props.idea.name} onChange={this.props.handleChange} />
                        </div>
                        <div className="half last">
                            <StreamDropdown streams={this.props.streams}
                                currentStream={this.props.currentStream}
                                currentStreamName={this.props.currentStreamName}
                                handleStreamChange={this.props.handleStreamChange} />
                        </div>
                    </div>
                    <ContentEditable onChange={this.props.handleContentChange} name="content"
                   placeholder="Idea Content" minLength={this.props.minimum}
                   className="input input-content"
                   html={this.props.idea.content} />
                   <Submit value="Save" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})

export default EditIdea
