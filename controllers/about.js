'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var people = [
    {
      id: 'poised mallard',
      image: 'http://icons-search.com/img/yellowicon/TMNT_lin.zip/lin-png-256x256-Rafael_256x256.png-256x256.png',
      nick: 'Ninja 1 - Raphael'
    },
    {
       id: 'busy cheetah',
      image: 'http://www.officialpsds.com/images/thumbs/Teenage-Mutant-Ninja-Turtles-psd66529.png',
      nick: 'Ninja 2 - Leonardo'
    },
    {
       id: 'excited sandpiper',
      image: 'http://img2.wikia.nocookie.net/__cb20140212044737/teenage-mutant-ninja-turtles-2012-series/images/0/0b/TMNT_2012_Michelangelo-13-.png',
      nick: 'Ninja 3 - Michelangelo'
    },
    {
       id: 'adorable mallard',
      image: 'http://www.uneshddarann.com/wp-content/uploads/2014/08/Donatello.png',
      nick: 'Ninja 4 - Donatello'
    }];
 
  var contextData = {
    'people': people
  };
  response.render('about.html', contextData);
}

module.exports = {
  about: about
};