import dateFormat from 'dateFormat'

var Date = React.createClass({
    getIntialProps(){
        return {
            date: ""
        }
    },
    render(){
        var FormatedDate =  dateFormat(this.props.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        return (
            <small className="date">
                {FormatedDate}
            </small>
        )
    }
})

export default Date
