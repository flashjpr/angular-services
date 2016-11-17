(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService', '$q', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $q) {

        var vm = this;

        vm.appName = books.appName;

        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();
        
        $q.all([booksPromise,readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);
        
        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(error) {
            console.log(error);
        }
        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getBooksNotifications)
        //     .catch(errorCallback)
        //     .finally(getAllBooksComplete);
        //
        // function getBooksSuccess(books) {
        //     vm.allBooks = books;
        // }
        //
        // // function getBooksError(error) {
        // //     console.log(error);
        // // }
        //
        // function errorCallback(error) {
        //     console.log('Error: ' + error);
        // }
        //
        // function getBooksNotifications(notification) {
        //     console.log(notification);
        // }
        //
        // function getAllBooksComplete() {
        //     console.log('getAllBooks has completed');
        // }
        //
        // dataService.getAllReaders()
        //     .then(getReadersSuccess)
        //     .catch(getReadersError)
        //     .finally(getReadersComplete);
        //
        // function getReadersSuccess(readers) {
        //     vm.allReaders = readers;
        // }
        //
        // function getReadersError(error) {
        //     console.log('Error: '+ error);
        // }
        //
        // function getReadersComplete() {
        //     console.log('getAllReaders has completed');
        // }

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController was created');
    }


}());