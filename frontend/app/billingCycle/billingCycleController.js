(function(){
    angular.module('App').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'message',
        'tabs',
        BillingCycleCtrl
    ]);
    function BillingCycleCtrl($http, $location, message, tabs){
        const vm = this;
        const url = 'http://localhost:3003/api/billingCycles';

        vm.refresh = function(){
            const page = parseInt($location.search().page) || 1;

            $http.get(`${url}?skip=${(page - 1) * 12}&limit=12`).then( ({data}) => {
                vm.billingCycle = { credits: [{}], debts: [{}] };
                vm.billingCycles = data;
                vm.calculateValue();
                tabs.show(vm, {tabList: true, tabCreate: true});

                $http.get(`${url}/count`).then( ({data}) => {
                    vm.pages = Math.ceil(data.value / 12);
                });
            })
        };
        vm.create = function(){
            $http.post(url, vm.billingCycle).then( () => {
                vm.refresh();
                message.addSuccess("Operação realizada com sucesso!!");
            }).catch( ({data}) => {
                message.addError( data.errors );
            });
        };
        vm.delete = function(){
            const urlDelete = `${url}/${vm.billingCycle._id}`;
            $http.delete(urlDelete, vm.billingCycle).then( () => {
                vm.refresh();
                message.addSuccess("Operação realizada com sucesso!!");
            }).catch( ({data}) => {
                message.addError( data.errors );
            });
        };
        vm.update = function(){
            const urlUpdate = `${url}/${vm.billingCycle._id}`;
            $http.put(urlUpdate, vm.billingCycle).then( () => {
                vm.refresh();
                message.addSuccess("Operação realizada com sucesso!!");
            }).catch( ({data}) => {
                message.addError( data.errors );
            });
        };
        vm.showTabUpdate = function(billingCycle){
            vm.billingCycle = billingCycle;
            vm.calculateValue();
            tabs.show(vm, {tabUpdate: true});
        };
        vm.showTabDelete = function(billingCycle){
            vm.billingCycle = billingCycle;
            vm.calculateValue();
            tabs.show(vm, {tabDelete: true});
        };
        vm.addCredit = function(index){
            vm.billingCycle.credits.splice(index + 1, 0, {});
        };
        vm.cloneCredit = function(index, {name, value}){
            vm.billingCycle.credits.splice(index + 1, 0, {name, value});
            vm.calculateValue();
        };
        vm.deleteCredit = function(index){
            const {length} = vm.billingCycle.credits;
            if(length > 1){
                vm.billingCycle.credits.splice(index, 1);
                vm.calculateValue();
            }
        };
        vm.addDebt = function(index){
            vm.billingCycle.debts.splice(index + 1, 0, {});
        };
        vm.cloneDebt = function(index, {name, value, status}){
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status});
            vm.calculateValue();
        };
        vm.deleteDebt = function(index){
            const {length} = vm.billingCycle.debts;
            if(length > 1){
                vm.billingCycle.debts.splice(index, 1);
                vm.calculateValue();
            }
        };
        vm.calculateValue = function(){
            vm.credit = 0;
            vm.debt = 0;

            if(vm.billingCycle){
                vm.billingCycle.debts.forEach(({value}) => {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
                });
                vm.billingCycle.credits.forEach(({value}) => {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
                });
            }

            vm.total = vm.credit - vm.debt;
        }

        vm.refresh();
    }
})()