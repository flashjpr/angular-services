(function(){

    angular.module('app')
        .value('badgeService', {
            retrieveBadge: retrieveBadge
        });

    function retrieveBadge(minutesRead) {

        var badge = null;

        switch (true) {

            case (minutesRead > 100):
                badge = 'Glasses';
                break;
            case (minutesRead > 500):
                badge = 'Harry Potter';
                break;
            default:
                badge = 'Getting Started';
        }

        return badge;
    }

}());