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

export default ContentEditable
