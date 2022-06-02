(function(){
    angular.module('App').controller('dashboardCtrl', [
        '$http',
        DashboardController
    ]);
    
    function DashboardController($http){
        const vm = this;
        vm.credit = 0;
        vm.debt = 0;
        vm.total = 0;

        vm.getSummary = function(){
            const url = 'http://localhost:3003/api/billingSummary';
            $http.get(url).then( function(res) {
                const {credit = 0, debt = 0} = res.data;
                vm.credit = credit;
                vm.debt = debt;
                vm.total = credit - debt;
            });
        };
        vm.getSummary();
    }
})();