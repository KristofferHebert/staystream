var Submit = React.createClass({
    render: function(){
        return (
            <input
                type='submit'
                className={this.props.className}
                value={this.props.value}
            />
        )
    }
})

module.exports = Submit
