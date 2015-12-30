import { Link } from 'react-router'
import Auth from '../utils/auth.jsx'

var Wrapper = React.createClass({
    getInitialState(){
        return {
            showMenu: false
        }
    },
    toggleMenu(event){
        event.preventDefault()
        var showMenu = !this.state.showMenu
        this.setState({showMenu: showMenu})
    },
    disableLink(event){
        event.preventDefault()
    },
    render: function(){
        var isLoggedIn = Auth.isLoggedIn()
        var Home = (isLoggedIn) ? '/u/' : '/'

        return (
            <div>
                <aside className={this.state.showMenu ? 'sidebar' : 'sidebar hidden'}>
                    <nav>
                        <ul className="list-nostyle">
                          <li><Link className="menu-item-vertical" to="/u/stream">Streams</Link></li>
                          <li><Link className="menu-item-vertical" to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </aside>
                <div className={this.state.showMenu ? 'addSpacingForMenu' : ''}>
                    <header className="main bg-dark tc">
                        <nav className="wrapper">
                            <ul className="list-inline">
                                <li className={ (isLoggedIn) ? 'fl' : 'hidden'}><a href="#" className="fa fa-bars menu-item" onClick={this.toggleMenu}>Menu</a></li>
                                <li><Link to={Home} className="menu-item">Staystream</Link></li>
                                <li className={ (isLoggedIn) ? 'fr' : 'hidden'}><Link to="/u/" className="fa fa-pencil-square-o fa-3 menu-item">Add New Idea</Link></li>
                            </ul>
                        </nav>
                    </header>
                    <main className="wrapper container">
                        {this.props.children}
                    </main>
                    <footer>
                        <section className="wrapper tc">
                            <p>2015 Staystream.com</p>
                        </section>
                    </footer>
                </div>
            </div>
        )
    }
})

export default Wrapper
