(function() {

    var app = angular.module('app', ['ngRoute']);

    app.provider('books', ['constants',function (constants) {

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var appDescription = constants.APP_DESC;
            var version = constants.VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            return {
                appName: appName,
                appDescription: appDescription
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        }
    }]);

    app.config(['booksProvider', '$routeProvider', function (booksProvider, $routeProvider) {

        booksProvider.setIncludeVersionInTitle(true);

        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/addBook', {
                templateUrl: 'app/templates/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'addBook'
            })
            .when('/editBook/:bookID', {
                templateUrl: 'app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor',
                resolve: {
                    books: function(dataService) {
                        return dataService.getAllBooks();
                    }
                }
            })
            .otherwise('/');

    }]);

    app.run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            console.log('successfully changes routes');
        });

        $rootScope.$on('$rooteChangeError', function (event, current, previous, rejection) {
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        })

    }]);

}());