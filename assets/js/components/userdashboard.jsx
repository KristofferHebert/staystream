import Input from './input.jsx'
import Checkbox from './Checkbox.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'

var UserDashBoard = React.createClass({
    getDefaultProps: function() {
        return {
            user: {
                email: '',
                sendNotifications: true
            }
        }
    },
    render(){
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit} className={this.props.className}>
                    <div className="row mb">
                        <div className="half last">
                            <Input type="text" name="name" placeholder="Email" className="input input-email" value={this.props.user.email} onChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row mb">
                        <label for="sendNotifications">Send daily email reminders?
                            <Checkbox name="sendNotifications" checked={this.props.checked} handleChange={this.props.handleChange} className="fl"/>
                        </label>
                    </div>
                <Submit value="Update Settings" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})


export default UserDashBoard
