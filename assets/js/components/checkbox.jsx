'use strict'

var Checkbox = React.createClass({
  render() {
    return (
        <div>
            <label htmlFor="sendNotifications" className="fl">{this.props.label}</label>
            <input
              type="checkbox"
              name={this.props.checkbox}
              className={this.props.className}
              checked={this.props.isChecked}
              onChange={this.props.onChange} />
        </div>
    )
  }
})

export default Checkbox
