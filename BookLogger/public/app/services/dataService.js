(function(){

    angular.module('app')
        .factory('dataService',['$q', '$timeout', '$http', 'constants', dataService]);

    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };

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
            return [
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
            ]
        }
    }

}());