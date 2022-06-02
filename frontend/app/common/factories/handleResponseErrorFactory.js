(function(){
    angular.module('App').factory('handleResponseError', [
        '$q',
        '$window',
        'consts',
        handleResponseErrorFactory
    ]);
    function handleResponseErrorFactory($q, $window, consts){
        return { responseError }
        
        function responseError(errorResponse){
            if(errorResponse.status === 403){
                localStorage.removeItem(consts.userKey);
                $window.location.href = '/';
            }
            return $q.reject(errorResponse);
        }
    }
})()