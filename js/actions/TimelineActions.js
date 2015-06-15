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

  /**
   * @param  {string} date The DATE of the TimeLine item
   * @param  {string} text
   
  updateText: function(date, text) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_UPDATE_TEXT,
      date: date,
      text: text
    });
  },
  */
  /**
   * Toggle whether a single TimeLine is complete
   * @param  {object} timeline
   
  toggleComplete: function(timeline) {
    var date = timeline.date;
    var actionType = timeline.complete ?
        TimelineConstants.TIMELINE_UNDO_COMPLETE :
        TimelineConstants.TIMELINE_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      date: date
    });
  },*/

  /**
   * Mark all TimeLines as complete
   
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_TOGGLE_COMPLETE_ALL
    });
  },
	*/
  /**
   * @param  {string} date
   */
  destroy: function(project,date) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_DESTROY,
      project:project,
      date: date
    });
  },

  /**
   * Delete all the completed TIMELINEs
   
  destroyCompleted: function(date) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_DESTROY_COMPLETED,
	  date: date
    });
  }*/

};

module.exports = TimelineActions;
