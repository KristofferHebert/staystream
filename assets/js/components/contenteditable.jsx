var ContentEditable = React.createClass({
    render(){
        return <div
            className={this.props.className}
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>

    },
    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.getDOMNode().innerHTML
    },
    emitChange(){
        var html = this.getDOMNode().innerHTML
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
