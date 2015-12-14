var ContentEditable = React.createClass({
    render: function(){
        return <div
            className={this.props.className}
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.html !== this.getDOMNode().innerHTML
    },
    emitChange: function(){
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


var AddIdeaForm = React.createClass({
    getDefaultProps: function() {
        return {
            endpoint: "idea",
            base: "/api/v1/"

        }
    },
    handleSubmission: function(event){
        console.log(this.state)
    },
    getTags: function(string){
        var tags = string.match(/#[\w]+(?=\s|$)/g).map(function(val){ return val.substring(1)})
        tags = tags.filter(function(item, pos, self) {
            return self.indexOf(item) == pos
        })
        return tags
    },
    addHashtags: function(string){
        var updatedString = string.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span>$2</span>')
        return updatedString
    },
    handleContentChange: function(event){
        var newTags = this.getTags(event.target.value)
        var newContent = this.addHashtags(event.target.value)
        this.setState({content: newContent, tags: newTags})
    },
    handleChange: function(event){
        var newState = this.state
        newState[event.target.name] = event.target.value
        console.log(newState)
        this.setState(newState)
    },
    getDefaults: function(){
        return {
            name: '',
            content: '',
            tags: []
        }
    },
    getInitialState: function(){
        return this.state = this.getDefaults()
    },
    render: function(){
        return (
                <form className="form idea-form add-idea-form">
                    <label htmlFor="name" hidden>Name</label>
                    <input type="text" name="name" onChange={this.handleChange} placeholder="Name"/>
                    <label htmlFor="content" hidden>Content</label>
                     <ContentEditable onChange={this.handleContentChange} name="content"
                    placeholder="Add idea here" minLength={this.props.minimum} className="idea-form-textarea" />
                    <input type="button" value="Add Idea" onClick={this.handleSubmission}/>
                </form>

        )
    }
})

ReactDOM.render(<AddIdeaForm minimum="20" streamId="566cd43adf0e37fb6fb166fe" endpoint="idea" base="/api/v1/" />, document.getElementById('app'))
