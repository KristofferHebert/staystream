var ResourceProvider = React.createClass({
    getDefaultProps(){
        return {
            resource: '',
            endpoint: '',
            method: 'POST'
        }
    },
    getInitialState(){
        return {
            data: ''
        }
    },
    handleChange(event){
        event.preventDefault()
        console.log('change happened')
    },
    makeRequest(data){

    },
    handleSubmit(event){
        event.preventDefault()
        console.log('submit happened')
    },
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})



export default ResourceProvider
