'use strict';

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'SOM House Party',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: 'http://media.giphy.com/media/wtVljL9rUURW0/giphy.gif',
    location: 'Kyle \'s house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 1,
    title: 'BBQ party for hackers and nerds',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://img0.joyreactor.com/pics/comment/comics-nathan-bulmer-Teenage-Mutant-Ninja-Turtles-food-283789.gif',
    location: 'Miles\' house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 2,
    title: 'BBQ for managers',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: 'http://25.media.tumblr.com/ab2d6a86d8d567417d415c5eb06870e3/tumblr_mke42eF2f11qm1a00o1_500.gif',
    location: 'Barry Nalebuff\'s house',
    attending: ['kim.kardashian@yale.edu'],
  },
  {
    id: 4,
    title: 'Cooking lessons for the busy business student',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    attending: ['homer.simpson@yale.edu'],
  }
];


/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
  for (var i = allEvents.length - 1; i >= 0; i--) {
    if (id === allEvents[i].id){
      return allEvents[i];
    }
  }
  return null;
}

module.exports = exports = {
  all: allEvents,
  getById: getById
};