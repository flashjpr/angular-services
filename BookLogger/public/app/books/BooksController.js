(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService', '$q', '$cookies', '$log', 'BooksResource', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $q, $cookies, $log, BooksResource) {

        var vm = this;

        vm.appName = books.appName;
        
        dataService.getUserSummary()
            .then(getUserSummarySuccess);
        
        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        // var booksPromise = dataService.getAllBooks();
        // var readersPromise = dataService.getAllReaders();
        //
        // $q.all([booksPromise,readersPromise])
        //     .then(getAllDataSuccess)
        //     .catch(getAllDataError);

        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(error) {
            console.log(error);
        }

        vm.allBooks = BooksResource.query();

        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getBooksNotifications)
        //     .catch(errorCallback)
        //     .finally(getAllBooksComplete);

        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

        function getBooksError(error) {
            console.log(error);
        }

        function errorCallback(error) {
            console.log('Error: ' + error);
        }

        function getBooksNotifications(notification) {
            console.log(notification);
        }

        function getAllBooksComplete() {
            console.log('getAllBooks has completed');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(getReadersError)
            .finally(getReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }

        function getReadersError(error) {
            console.log('Error: '+ error);
        }

        function getReadersComplete() {
            console.log('getAllReaders has completed');
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = JSON.parse($cookies.lastEdited);

        // different types of loggers available in the $log service
        // $log.log('Logged with log');
        // $log.info('Logged with info');
        // $log.warn('Logged with warn');
        // $log.error('Logged with error');
        // $log.debug('Logged with debug');

    }


}());