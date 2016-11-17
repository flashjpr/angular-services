(function(){

    angular.module('app')
        .factory('dataService', dataService);

    function dataService() {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
        
        function getAllBooks() {
            return [
                {
                    book_id: 1,
                    title: 'John Papa The Great',
                    pages: 221
                },
                {
                    book_id: 2,
                    title: 'Alex The Impaler',
                    pages: 661
                },
                {
                    book_id: 3,
                    title: 'Why we love javaScript?',
                    pages: 100
                }
            ];
        }

        function getAllReaders() {
            return [
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
        }
    }


}());