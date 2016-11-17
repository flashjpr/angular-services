(function() {

    var app = angular.module('app', []);

    app.provider('books', function () {

        this.$get = function () {

            var appName = 'BookLogger';
            var appDescription = 'Guess what it does, it is not that hard!';
            var version = '1.0';

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
    });

    app.config(function (booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });

}());