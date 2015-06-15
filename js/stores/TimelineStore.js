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

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TimelineConstants = require('../constants/TimelineConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _timelines = [];

/**
 * Create a Timeline item.
 * @param  {string} text The content of the Timeline
 */
function create(project,date, text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real date.
  if (_timelines[project][date])
	  _timelines[project][date].push(text);
  else{
	  _timelines[project][date] = [];
	  _timelines[project][date].push(text);
	  //console.log(this.props.data[d].date);
	  }
  //_timelines[date] = {
  //  date: date,
  //  complete: false,
  //  text: text
  //};
}
function create_timeline(project) {
	_timelines[project] = [];
}

/**
 * Update a Timeline item.
 * @param  {string} date
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 
function update(date, updates) {
  _timelines[date] = assign({}, _timelines[date], updates);
}
*/
/**
 * Update all of the Timeline items with the same object.
 *     the data to be updated.  Used to mark all Timelines as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.


function updateAll(updates) {
  for (var date in _timelines) {
    update(date, updates);
  }
}
 */
/**
 * Delete a Timeline item.
 * @param  {string} date
 */
function destroy(date) {
  delete _timelines[date];
}

/**
 * Delete all the completed Timeline items.

function destroyCompleted() {
  for (var date in _timelines) {
    if (_timelines[date].complete) {
      destroy(date);
    }
  }
}
 */
var TimelineStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining Timeline items are marked as completed.
   * @return {boolean}
   
  areAllComplete: function() {
    for (var date in _timelines) {
      if (!_timelines[date].complete) {
        return false;
      }
    }
    return true;
  },
*/
  /**
   * Get the entire collection of Timelines.
   * @return {object}
   */
  getAll: function() {
    return _timelines;
  },

  getTimeline: function (id) {
    return _timelines[id];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TimelineConstants.TIMELINE_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(action.project, action.date, action.text);
        TimelineStore.emitChange();
      }
      break;

    case TimelineConstants.TIMELINE_CREATE_TIMELINE:
      create_timeline(action.project);
      TimelineStore.emitChange();
      break;
/*
    case TimelineConstants.TIMELINE_UNDO_COMPLETE:
      update(action.date, {complete: false});
      TimelineStore.emitChange();
      break;

    case TimelineConstants.TIMELINE_COMPLETE:
      update(action.date, {complete: true});
      TimelineStore.emitChange();
      break;

    case TimelineConstants.TIMELINE_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.date, {text: text});
        TimelineStore.emitChange();
      }
      break;
*/
    case TimelineConstants.TIMELINE_DESTROY:
      destroy(action.project, action.date);
      TimelineStore.emitChange();
      break;
/*
    case TimelineConstants.TIMELINE_DESTROY_COMPLETED:
      destroyCompleted();
      TimelineStore.emitChange();
      break;
*/
    default:
      // no op
  }
});

module.exports = TimelineStore;
