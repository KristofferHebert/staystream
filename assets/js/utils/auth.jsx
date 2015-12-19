// Helper function to get current user after authenticating

var Auth = {}

// Fetch user id
Auth.getId = function(){
    var user = Auth.getUser()
    return (user.id) ? user.id : false
}

// Fetch user token
Auth.getToken = function(){
    var user = Auth.getUser()
    return (user.token) ? user.token : false
}

// Fetch user data from localStorage
Auth.getUser = function(){
    var user = localStorage.getItem(user)
    if(user) return JSON.parse(user)
    return false
}

// Used to populate localStorage.user with user data.
Auth.login = function(json){
    var user = JSON.stringify(json)
    localStorage.setItem('user', user)
    return user
}

// Check if user is logged in 
Auth.isLoggedIn = function(){
    return (Auth.get()) ? true : false
}


module.exports = Auth
