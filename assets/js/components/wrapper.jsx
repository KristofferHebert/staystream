import { Link } from 'react-router'

var Wrapper = React.createClass({
    getInitialState(){
        return {
            showMenu: false
        }
    },
    toggleMenu(event){
        var showMenu = !this.state.showMenu
        this.setState({showMenu: showMenu})
    },
    disableLink(event){
        event.preventDefault()
    },
    render: function(){
        return (
            <div>
                <aside className={this.state.showMenu ? 'sidebar hidden' : 'sidebar'}>
                    <nav>
                        <ul>
                          <li><Link to="/u/stream">Your Streams</Link></li>
                          <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </aside>
                <header className="main bg-dark tc">
                    <nav className="wrapper">
                        <ul className="list-inline">
                            <li className="fl"><a href="#" className="menu-item" onClick={this.toggleMenu}>Menu</a></li>
                            <li><a href="#" className="menu-item" onClick={this.disableLink}>Staystream</a></li>
                            <li className="fr"><Link to="/u/" className="menu-item">Add New Idea</Link></li>
                        </ul>
                    </nav>
                </header>
                <main className="wrapper">
                    {this.props.children}
                </main>
                <footer>
                    <section className="wrapper tc">
                        <p>2015 Staystream.com</p>
                    </section>
                </footer>
            </div>
        )
    }
})

export default Wrapper
