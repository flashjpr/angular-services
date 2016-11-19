(function(){
    
    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', EditBookController]);
    
    function EditBookController($routeParams, books, $cookies) {

        var vm = this;

        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookID;
        })[0];

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };

        $cookies.lastEdited = JSON.stringify(vm.currentBook);
        console.log('$cookies.lastEdited', vm.currentBook);
    }
}());




