'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
  months: {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },
  minutes: [0, 30],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
};

/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var currentTime = new Date();
  var now = new Date();
  var contextData = {
    'events': [],
    'time': currentTime
  };

  for(var i = 0; i<events.all.length; i++){
  var event = events.all[i];
  if(event.date > now){
    contextData.events.push(event);
  }
  }
  
  response.render('event.html', contextData);
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {};
  response.render('create-event.html', contextData);
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {errors: []};

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }

  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be between 1 and 50 characters.');
  }
  
  if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('Your image is invalid.');
  }

  if (request.body.image.substring(request.body.image.length-3) !== 'gif' && request.body.image.substring(request.body.image.length-3) !== 'png') {
    contextData.errors.push('Your image should either be gif or png');
  }
  
  if (validator.isInt(request.body.year) === false) {
    contextData.errors.push('Your year should be an integer');
  }

  if (request.body.year <2015 || request.body.year > 2016 ) {
    contextData.errors.push('Your year should either be 2015 or 2016');
  }
  
  if (validator.isInt(request.body.month) === false) {
    contextData.errors.push('Your month should be an integer');
  }
  
  if (request.body.month < 0 || request.body.month > 11) {
    contextData.errors.push('Your month is invalid');
  }
  
  if (validator.isInt(request.body.day) === false) {
    contextData.errors.push('Your day should be an integer');
  }
  
  if (request.body.day < 1 || request.body.day > 31) {
    contextData.errors.push('Your day is invalid');
  }

  if (validator.isInt(request.body.hour) === false) {
    contextData.errors.push('Your hour should be an integer');
  }
  
  if (request.body.hour < 0 || request.body.hour > 23) {
    contextData.errors.push('Your hour is invalid');
  }

  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.all.length,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(request.body.year, request.body.month, request.body.day, request.body.hour, request.body.minute, 0),
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events/' + newEvent.id);
  }else{
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
 var contextData = {event: ev};
  if (Math.random() < 0.5) {
      contextData.donate = true;    
    }else{
      contextData.donate = false;
    }
   contextData.experiment = false; 
  response.render('event-detail.html', contextData);
}

function rsvp (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email) === true && request.body.email.toLowerCase().indexOf('yale.edu') !== -1) {
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }

}

function api(request, response){
  var output = {events: []};
  var search = request.query.search;
  
  if (search){
    for(var i=0; i < events.all.length; i++){
      if(events.all[i].title.indexOf(search) !== -1){
        output.events.push(events.all[i]);
      }
    }
  }
  else { 
    output.events = events.all;
  }
  response.json(output);
}

function donate(request, response) {
          var contextData = {};
          response.render('donate.html', contextData); 
}

function report1(request, response) {
          var contextData = {};
          response.render('report1.html', contextData); 
}

function report2(request, response) {
          var contextData = {};
          response.render('report2.html', contextData); 
}

function report3(request, response) {
          var contextData = {};
          response.render('report3.html', contextData); 
}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'listEvents': listEvents,
  'eventDetail': eventDetail,
  'newEvent': newEvent,
  'saveEvent': saveEvent,
  'rsvp': rsvp,
  'api': api,
  'donate': donate,
  'report1': report1,
  'report2': report2,
  'report3': report3
};