(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService', '$q', '$cookies', '$log', 'BooksResource', 'currentUser', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $q, $cookies, $log, BooksResource, currentUser) {

        var vm = this;

        vm.appName = books.appName;
        
        dataService.getUserSummary()
            .then(getUserSummarySuccess);
        
        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        var booksPromise = dataService.getAllBooks();
        // BooksResource can be used to gather books data ! - less control
        // vm.allBooks = BooksResource.query();

        var readersPromise = dataService.getAllReaders();

        $q.all([booksPromise,readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
            $log.awesome('Books and readers received successfully.');
        }

        function getAllDataError(error) {
            console.log(error);
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.currentUser = currentUser;

    }


}());