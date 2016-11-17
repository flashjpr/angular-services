(function() {

    var app = angular.module('app', []);

    app.provider('books', function (constants) {

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
    });

    app.config(function (booksProvider, constants, dataServiceProvider) {
        booksProvider.setIncludeVersionInTitle(true);
        console.log(constants.APP_TITLE)
        console.log(dataServiceProvider.$get)
    });

}());