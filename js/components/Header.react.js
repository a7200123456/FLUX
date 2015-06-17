/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var TimelineActions = require('../actions/TimelineActions');
var TimelineTextInput = require('./TimelineTextInput.react');

var Header = React.createClass({

	_onSave: function(e) {
	
    e.preventDefault();
    var date = React.findDOMNode(this.refs.date).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !date) {
      return;
    };
	
	TimelineActions.create(this.props.project_name,date,text);
    React.findDOMNode(this.refs.date).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  
  render: function() {
    
		//console.log('this.refs.date: '+date);
	return (
      <header id="header">
        <h1>timelines</h1>
        <form className="timelineHeader" onSubmit={this._onSave}>
			<input type="text" placeholder="date" ref="date" />
			<input type="text" placeholder="file_name" ref="text" />
			<input type="submit" value="Post" />
		</form>
      </header>
    );
  }
});

module.exports = Header;
