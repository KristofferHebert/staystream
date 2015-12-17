function currentUser(){
    return JSON.parse(localStorage.user) || false
}

currentUser.prototype.id = function(){
    var user = JSON.parse(localStorage.user)
    return user.id || false
}

currentUser.prototype.token = function(){
    var user = JSON.parse(localStorage.user)
    return user.token || false
}

currentUser.prototype.set = function(json){
    var user = JSON.stringify(localStorage.user)
    localStorage.user = user
    return user
}

module.exports = currentUser
