(function(){
    
    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies','dataService','$log','$location','BooksResource', 'currentUser', EditBookController]);
    
    function EditBookController($routeParams, books, $cookies, dataService, $log, $location, BooksResource, currentUser) {

        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);

        // or use the BooksResource to get the book - less control
        // vm.currentBook = BooksResource.get({book_id: $routeParams.bookID});

        function getBookSuccess(book) {
            vm.currentBook = book;
            currentUser.lastBookEdited = vm.currentBook;
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError);

            // or using the $resource service

            // vm.currentBook.$update();
            // $location.path('/');
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




