import Input from './input.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import StreamDropdown from './StreamDropdown.jsx'


var ContentEditable = React.createClass({
    render: function(){
        return <div
            className={this.props.className}
            onInput={this.emitChange}
            onBlur={this.emitChange}
            placeholder={this.props.placeholder}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML
    },
    emitChange: function(){
        var html = ReactDOM.findDOMNode(this).innerHTML
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            })
        }
        this.lastHtml = html
    }
})

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
            }],
            currentStream: ""
        }
    },
    render(){
        return(
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <Input type="text" name="name" placeholder="Idea Name" className="input input-email" value={this.props.idea.name} onChange={this.props.handleChange} />
                    <ContentEditable onChange={this.props.handleContentChange} name="content"
                   placeholder="Idea Content" minLength={this.props.minimum} className="input input-content" />
                    <StreamDropdown streams={this.props.streams} currentStream={this.props.currentStream} handleStreamChange={this.props.handleStreamChange} currentStream={this.props.currentStream}/>
                    <Submit value="Save" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})

export default AddIdea
