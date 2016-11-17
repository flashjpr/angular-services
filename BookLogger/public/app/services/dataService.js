(function(){

    angular.module('app')
        .factory('dataService',['$q', '$timeout', dataService]);

    function dataService($q, $timeout) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
        
        function getAllBooks() {
            var booksArray = [
                {
                    book_id: 1,
                    title: 'John Papa The Great',
                    pages: 221,
                    yearPublished: 2000,
                    author: 'Steve Jobs'
                },
                {
                    book_id: 2,
                    title: 'Alex The Impaler',
                    pages: 661,
                    yearPublished: 2010,
                    author: 'Gods'
                },
                {
                    book_id: 3,
                    title: 'Why we love javaScript?',
                    pages: 100,
                    yearPublished: 1999,
                    author: 'William S.'
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {

                var successful = true;
                if (successful) {
                    deferred.notify('Just getting started grabbing books');
                    deferred.notify('I am still up, performing my job.');
                    deferred.resolve(booksArray);
                } else {
                    deferred.reject('Error retrieving books');
                }

            }, 1000);

            return deferred.promise;
        }

        function getAllReaders() {
            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Simon',
                    weeklyReadingGoal: 213,
                    totalMinutesRead: 129
                },
                {
                    reader_id: 2,
                    name: 'Andrea',
                    weeklyReadingGoal: 92,
                    totalMinutesRead: 20
                },
                {
                    reader_id: 1,
                    name: 'Larisa',
                    weeklyReadingGoal: 19,
                    totalMinutesRead: 1992
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {
                var successful = true;
                if (successful) {
                    deferred.resolve(readersArray);
                } else {
                    deferred.reject('Error retrieving readers');
                }
            }, 1500);

            return deferred.promise;
        }
    }

}());