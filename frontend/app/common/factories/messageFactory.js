(function(){
    angular.module('App').factory('message', [
        'toastr',
        messageFactory
    ]);
    function messageFactory(toastr){
        function addMessage(messages, title, method){
            if(messages instanceof Array){
                messages.forEach( message => toastr[method](message, title));
            } else {
                toastr[method](messages, title);
            }
        };
        function addSuccess(messages){
            addMessage(messages, 'Sucesso', 'success');
        };
        function addError(messages){
            addMessage(messages, 'Erro', 'error');
        };
        
        return { addSuccess, addError };
    }
})()