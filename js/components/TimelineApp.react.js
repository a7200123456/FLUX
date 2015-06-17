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
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TimelineStore = require('../stores/TimelineStore');

var TimelineApp = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  getTimelineState:function () {
	var id = this.context.router.getCurrentParams().id;
	 console.log("this is id : " + id);
	return {
		allTimelines: TimelineStore.getTimeline(id)
	};
  },
  
  getInitialState: function() {
    return this.getTimelineState();
  },

  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimelineStore.removeChangeListener(this._onChange);
  },
  
  componentWillReceiveProps: function () {
    this.setState(this.getTimelineState());
  },

  render: function() {
	  
  	return (
      <div>
        <Header 
		 project_name={this.context.router.getCurrentParams().id}
		/>
        <MainSection
          allTimelines={this.state.allTimelines}
        />
        
      </div>
  	);
  },

  _onChange: function() {
    this.setState(this.getTimelineState());
	console.log(this.state.allTimelines);
  }

});

module.exports = TimelineApp;
