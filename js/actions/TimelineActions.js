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
  timeline_init: function(p_id) {
	  
	//console.log("action timeline_init p_id = " + p_id);
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_TIMELINE_INIT,
	  p_id: p_id,
    });
  },
  create: function(p_id,d_id, date, date_dc,r_id, r_name, source, info) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE,
      p_id:p_id,
	  d_id:d_id,
	  date:date,
	  date_dc:date_dc,
	  r_id:r_id,
	  r_name:r_name,
	  source:source,
	  info:info
    });
  },
  create_timeline: function(p_id,p_name,p_dc) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE_TIMELINE,
	  p_id: p_id,
	  p_name: p_name,
	  p_dc: p_dc
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
