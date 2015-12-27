import { Link } from 'react-router'

var Wrapper = React.createClass({
    render: function(){
        return (
            <div>
                <header>
                <nav className="wrapper">
                    <h1><Link to="/u/">Staystream</Link></h1>
                    <ul>
                      <li><Link to="/u/stream">Your Streams</Link></li>
                      <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
                </header>
                <main className="wrapper">
                    {this.props.children}
                </main>
                <footer>
                    <section className="wrapper tc">
                        2015 Staystream.com
                    </section>
                </footer>
            </div>
        )
    }
})

export default Wrapper
