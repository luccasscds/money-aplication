(function(){
    angular.module('App').factory('auth', [
        '$http',
        'consts',
        authFactory
    ]);

    function authFactory($http, consts){
        let user = null;
        function getUser(){
            if(!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey));
            }
            return user;
        }
        function signup(user, callback){
            submit('signup', user, callback);
        };
        function login(user, callback){
            submit('login', user, callback);
        };
        function submit(url, user, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, user).then(resp => {
                localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                $http.defaults.headers.common.Authorization = resp.data.token
                if (callback) callback(null, resp.data)
            }).catch(function (resp) {
                if (callback) callback(resp.data.errors, null)
            })
        };
        function logout(callback){
            user = null;
            localStorage.removeItem(consts.userKey);
            $http.defaults.headers.common.Authorization = '';
            if(callback) callback(null);
        };
        function validateToken(token, callback){
            if(token){
                $http.post(`${consts.oapiUrl}/validateToken`, {token}).then( res => {
                    if(!res.data.valid){
                        logout();
                    } else {
                        $http.defaults.headers.common.Authorization = getUser().token;
                    }
                    if(callback) callback(null, res.data.valid);
                }).catch( function(res) {
                    if(callback) callback(res.data.errors);
                });
            } else {
                if(callback) callback('Token inválido.')
            }
        }

        return { signup, login, logout, getUser, validateToken };
    }
})()