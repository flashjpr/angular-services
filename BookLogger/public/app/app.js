(function() {

    var app = angular.module('app', ['ngRoute','ngCookies', 'ngResource']);

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

    app.config(['booksProvider', '$routeProvider', '$logProvider', '$httpProvider', '$provide', function (booksProvider, $routeProvider, $logProvider, $httpProvider, $provide) {

        $provide.decorator('$log', ['$delegate', 'books', logDecorator]);

        booksProvider.setIncludeVersionInTitle(true);

        $logProvider.debugEnabled(true);

        $httpProvider.interceptors.push('bookLoggerInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/addBook', {
                templateUrl: 'app/templates/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'bookAdder'
            })
            .when('/editBook/:bookID', {
                templateUrl: 'app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor'
            })
            .otherwise('/');

    }]);

    function logDecorator($delegate, books) {
        
        function log(message) {
            message += '-' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }
        function info(message) {
            $delegate.info(message);
        }
        function warn(message) {
            $delegate.warn(message);
        }
        function error(message) {
            $delegate.error(message);
        }
        function debug(message) {
            $delegate.debug(message);
        }
        function awesome(message) {
            message = 'Awesome !' + message;
            $delegate.debug(message);
        }

        return {
            log:log,
            info:info,
            warn:warn,
            error:error,
            debug:debug,
            awesome:awesome
        }
    }

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