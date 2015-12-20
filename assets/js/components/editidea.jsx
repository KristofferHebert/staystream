var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')

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
            streamId: ""
        }
    },
    render(){
        return(
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <Input type="text" name="name" placeholder="Idea Name" className="input input-email" value={this.props.idea.name} onChange={this.props.handleChange} />
                    <Input type="text" name="content" placeholder="Content" className="input input-content" value={this.props.idea.content} onChange={this.props.handleChange} />
                    <Submit value="Save" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})

export default EditIdea
