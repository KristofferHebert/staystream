var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')

// pass handleSubmit & handleChange from parent component
var AddStream = React.createClass({
    getDefaultProps() {
        return {
            stream: {
                "name": ""
            }
        }
    },
    render(){
        return(
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <Input type="text" name="name" placeholder="Stream Name" className="input input-text" value={this.props.stream.name} onChange={this.props.handleChange} />
                    <Submit value="Save" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})

export default AddStream
