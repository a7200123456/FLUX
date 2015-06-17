/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TimelineStore

*/
var TimelineConstants = require('../constants/TimelineConstants'); 
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _timelines = [];

function create(project,date, text) {
   if (_timelines[project][date])
	  _timelines[project][date].push(text);
  else{
	  _timelines[project][date] = [];
	  _timelines[project][date].push(text);
	  }
}
function create_timeline(project) {
	_timelines[project] = [];
	_timelines[project].push(project);
}

function destroy(project,date) {
  delete _timelines[project][date];
}

var TimelineStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
	var array = [];

    for (var id in _timelines)
      array.push(_timelines[id][0]);
    //console.log(array);
    return array;
	},

  getTimeline: function (id) {
    return _timelines[id];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
 
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
	case TimelineConstants.TIMELINE_INIT:
        TimelineStore.emitChange();
      break;

    case TimelineConstants.TIMELINE_CREATE:
      if (text !== '') {
        create(action.project, action.date, action.text);
        TimelineStore.emitChange();
      }
      break;

    case TimelineConstants.TIMELINE_CREATE_TIMELINE:
      create_timeline(action.project);
      TimelineStore.emitChange();
      break;

    case TimelineConstants.TIMELINE_DESTROY:
      destroy(action.project, action.date);
      TimelineStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TimelineStore;
