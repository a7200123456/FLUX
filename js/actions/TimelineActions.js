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
  
  create_flickr: function(p_id, d_id,date, r_name, filess) {
	AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE_FLICKR,
      p_id:p_id,
	  d_id:d_id,
	  date:date,
	  r_name:r_name,
	  filess:filess
    });
  },
  create: function(p_id,d_id, date, date_dc,r_id, r_name, r_dc,source, info) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.TIMELINE_CREATE,
      p_id:p_id,
	  d_id:d_id,
	  date:date,
	  date_dc:date_dc,
	  r_id:r_id,
	  r_name:r_name,
    r_dc: r_dc,
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

  destroy_p: function(p_id) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.DESTROY_PROJECT,
      p_id:p_id
    });
  },
  
  destroy_d: function(p_id , d_id) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.DESTROY_DATE,
      p_id:p_id,
	  d_id:d_id
    });
  },
  
  destroy_r: function(p_id , d_id , r_id) {
    AppDispatcher.dispatch({
      actionType: TimelineConstants.DESTROY_RECORD,
      p_id:p_id,
	  d_id:d_id,
	  r_id:r_id
    });
  },

};

module.exports = TimelineActions;
