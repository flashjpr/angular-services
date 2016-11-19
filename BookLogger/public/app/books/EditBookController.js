(function(){
    
    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies','dataService','$log','$location', EditBookController]);
    
    function EditBookController($routeParams, books, $cookies, dataService, $log, $location) {

        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);
        
        function getBookSuccess(book) {
            vm.currentBook = book;
            $cookies.lastEdited = JSON.stringify(vm.currentBook);
            console.log('$cookies.lastEdited', vm.currentBook);
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError)
        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(reason) {
            $log.error(reason);
        }

        $log.info($routeParams.bookID);
        vm.deleteBook = function () {
            $log.info('in deletebook', vm.currentBook.book_id);
            dataService.deleteBook(vm.currentBook.book_id)
                .then(deleteBookSuccess)
                .catch(deleteBookError)
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function deleteBookError(reason) {
            $log.error(reason);
        }

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };

    }
}());




