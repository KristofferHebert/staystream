// Helper function to get current user after authenticating

function CurrentUser(){
    if(localStorage.user) return JSON.parse(localStorage.user)
    return false
}

CurrentUser.prototype.id = function(){
    if(localStorage.user) {
        var user = JSON.parse(localStorage.user)
        return user.id
    }
    return false
}

CurrentUser.prototype.token = function(){
    if(localStorage.user) {
        var user = JSON.parse(localStorage.user)
        return user.token
    }
    return false
}

CurrentUser.prototype.set = function(json){
    var user = JSON.stringify(json)
    localStorage.setItem('user', user)
    return user
}

CurrentUser.prototype.get = function(){
    var user = localStorage.getItem(user)
    if(user) return JSON.parse(user)
    return false
}


module.exports = CurrentUser
