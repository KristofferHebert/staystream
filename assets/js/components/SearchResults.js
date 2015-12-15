var SearchResult = React.createClass({
    getDefaultProps: {
      return {
          handleClick: function(){}
        }
    },
    render: function(){
       return (
       <li key={this.props.key} id={this.props.resultId}><a href="#" onClick={this.props.handleClick}>{this.props.name}</a></li>
       )
    }

})

var SearchList = React.createClass({
   render: function(){
     var results = this.props.results || []
     var Results = results.map(function(result, index){
   return <SearchResult resultId={result.id} name={result.name} key={index}/>
})

     return (
          <ul className={this.props.className} >{Results}</ul>
          )
   }
})
