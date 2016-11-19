(function(){

    angular.module('app')
        .factory('dataService',['$q', '$timeout', '$http', 'constants', dataService]);

    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook
        };
        
        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'BookLogger-Version': constants.VERSION
                }
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

        function getBookByID(bookID) {

            return $http({
                method: 'GET',
                url: 'api/books/' + bookID
            })
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

        function getAllReaders() {

        }
    }

}());