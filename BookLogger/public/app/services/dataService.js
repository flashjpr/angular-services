(function(){

    angular.module('app')
        .factory('dataService',['$q', '$timeout', '$http', 'constants', '$cacheFactory', dataService]);

    function dataService($q, $timeout, $http, constants, $cacheFactory) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getUserSummary: getUserSummary
        };

        function getUserSummary() {

            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('bookLoggerCache');

            if(!dataCache) {
                dataCache = $cacheFactory('bookLoggerCache');
            }

            var summaryFromCache = dataCache.get('summary');

            if (summaryFromCache) {
                console.log('returning summary from cache');
                deferred.resolve(summaryFromCache);
            } else {

                console.log('gathering new summary data');

                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all([booksPromise,readersPromise])
                    .then(function (bookLoggerData) {

                        var allBooks = bookLoggerData[0];
                        var allReaders = bookLoggerData[1];

                        var grandTotalHours = 0;

                        allReaders.forEach(function (currentReader, index, array) {
                            grandTotalHours += currentReader.totalHoursRead;
                        });

                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalHours: grandTotalHours
                        };

                        dataCache.put('summary', summaryData);
                        deferred.resolve(summaryData);
                    });
            }

            return deferred.promise;
        }

        function deteleSummaryFromCache() {
            var dataCache = $cacheFactory.get('bookLoggerCache');
            dataCache.remove('summary');
        }
        
        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'BookLogger-Version': constants.VERSION
                },
                transformResponse: transformGetAllBooks
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetBooksError(response) {
            return $q.reject('Error retrievign book(s). (HTTP status: ' + response.status + ')');
        }
        
        function transformGetAllBooks(data, headersGetter) {
            
            var transformed = angular.fromJson(data); //serialize the JSON into an array of objects
            
            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });
            console.log(transformed);

            return transformed;
        }

        function getBookByID(bookID) {

            return $http.get('api/books/' + bookID)
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function updateBook(book) {
            deteleSummaryFromCache();
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError)
        }

        function updateBookSuccess(response) {
            return 'Book updated: ' +  response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book. (HTTP status code:' + response.status + ')');
        }

        function addBook(newBook) {

            deteleSummaryFromCache();

            return $http.post('api/books', newBook, {
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            $q.reject('Error adding book. (HTTP status: ' + response.status + ')');
        }
        
        function transformPostRequest(data, headersGetter) {

            data.newBook = true;

            console.log(data);

            return JSON.stringify(data);
        }

        function deleteBook(bookID) {

            deteleSummaryFromCache();

            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID,
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess(response) {
            return 'Book deleted: ';
        }

        function deleteBookError (response) {
            $q.reject('Error deleting book. (HTTP status: ' +  response.status + ')');
        }

        function getAllReaders() {
            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Simon',
                    weeklyReadingGoal: 213,
                    totalHoursRead: 9
                },
                {
                    reader_id: 2,
                    name: 'Andrea',
                    weeklyReadingGoal: 92,
                    totalHoursRead: 61
                },
                {
                    reader_id: 1,
                    name: 'Larisa',
                    weeklyReadingGoal: 19,
                    totalHoursRead: 192
                }
            ];
            var deferred = $q.defer();

            deferred.resolve(readersArray);

            return deferred.promise;
        }
    }

}());