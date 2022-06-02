(function(){
    angular.module('App').controller('AuthCtrl', [
        '$location',
        'message',
        'auth',
        AuthCtrl
    ]);
    function AuthCtrl($location, message, auth){
        const vm = this;
        
        vm.loginMode = true;

        vm.changeMode = () => vm.loginMode = !vm.loginMode;

        vm.login = () => {
            auth.login(vm.user, err => err ? message.addError(err) : $location.path('/'));
        }
        
        vm.signup = () => {
            auth.signup(vm.user, err => err ? message.addError(err) : $location.path('/'));
        }
        vm.getUser = () => auth.getUser();

        vm.logout = () => {
            auth.logout( () => $location.path('/'));
        }
    }
})()