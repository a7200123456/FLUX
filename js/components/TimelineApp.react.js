/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TimelineStore and passes the new data to its children.

 */

var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TimelineStore = require('../stores/TimelineStore');
var TimelineActions = require('../actions/TimelineActions');

var TimelineApp = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  getTimelineState:function () {
	var p_id = this.context.router.getCurrentParams().id;
	 //console.log("this is id : " + id);
	 
	//console.log("!!!!!!!!!!!!!!!set_state!!!!!!!!!!!!!!!!");
	return {
		allTimelines: TimelineStore.getTimeline(p_id)
	};
  },
  
  getInitialState: function() {
    return this.getTimelineState();
  },

  componentWillMount: function () {
	//var id = this.context.router.getCurrentParams().id;
    //TimelineActions.timeline_init(id);
	//console.log("timeline_app componentWillMount");
  },
  
  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
	//console.log("timeline_app componentDidMount");
  },

  componentWillUnmount: function() {
    TimelineStore.removeChangeListener(this._onChange);
	//console.log("timeline_app componentWillUnmount");
  },
  
  componentWillReceiveProps: function () {
    //TimelineActions.timeline_init(project_name);
    this.setState(this.getTimelineState());
	//console.log("timeline_app componentWillReceiveProps");
  },
  render: function() {
	//console.log(this.state.allTimelines);  
  	return (
      <div>
        <Header 
		 p_id={this.context.router.getCurrentParams().id}
		 allTimelines={this.state.allTimelines}
		/>
        <MainSection
          allTimelines={this.state.allTimelines}
        />
        
      </div>
  	);
  },

  _onChange: function() {
    this.setState(this.getTimelineState());
	//console.log("!!!!!!!!!!!!!!!_onChange!!!!!!!!!!!!!!!!");
  }

});

module.exports = TimelineApp;
