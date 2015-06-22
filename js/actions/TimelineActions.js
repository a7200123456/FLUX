/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TimelineActions
 
*/
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TimelineConstants = require('../constants/TimelineConstants');

var TimelineActions = {

  /**
   * @param  {string} text
   */
  init: function() {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_INIT,
    });
  },
  timeline_init: function(project) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_TIMELINE_INIT,
	  project:project
    });
  },
  create: function(project,date,text) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE,
      project:project,
	  text: text,
	  date: date
    });
  },
  create_timeline: function(project) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE_TIMELINE,
      project:project
    });
  },

  destroy: function(project,date) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_DESTROY,
      project:project,
      date: date
    });
  },

};

module.exports = TimelineActions;
