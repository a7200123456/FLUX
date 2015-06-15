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
//var React = require('react');
var TimelineStore = require('../stores/TimelineStore');

/**
 * Retrieve the current Timeline data from the TimelineStore
 */
function getTimelineState() {
  return {
    allTimelines: TimelineStore.getAll(),
  };
}

var TimelineApp = React.createClass({

  getInitialState: function() {
    return getTimelineState();
  },

  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimelineStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
	  
	console.log(this.state.allTimelines);
  	return (
      <div>
        <Header />
        <MainSection
          allTimelines={this.state.allTimelines}
        />
        
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TimelineStore
   */
  _onChange: function() {
    this.setState(getTimelineState());
  }

});

module.exports = TimelineApp;
