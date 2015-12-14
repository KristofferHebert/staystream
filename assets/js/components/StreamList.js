var Stream = React.createClass({
    getDefaultProps: {
      return {
         handleClick: function(){}
      }
    }
    render: function(){
       return (
       <li key={this.props.key} id={this.props.streamId}><a href="#" onClick={this.props.handleClick}>{this.props.name}</a></li>
       )
    }

})

var StreamsList = React.createClass({
   render: function(){
     var streams = this.props.streams || []
     var Streams = streams.map(function(stream, index){
   return <Stream streamId={stream.id} name={stream.name} key={index}/>
})

Streams.push(<Stream streamId="addnewstream" name="Add new Stream" key={streams.length + 1} />)

     return (
          <ul className={this.props.className} >{Streams}</ul>
          )
   }
})
