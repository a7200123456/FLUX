/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.

*/
var React = require('react');
//var ReactPropTypes = React.PropTypes;
var TimelineActions = require('../actions/TimelineActions');
 
var cx = require('react/lib/cx');

var TimelineItem = React.createClass({
 
  render: function() {
    var timeline = this.props.timeline;
	return (
      <div className="timeline">
            <button className="destroy" onClick={this._onDestroyClick}>delete all day</button>
			<Timeline_date date={this.props.date}></Timeline_date>
			<Timeline_text text={timeline}></Timeline_text>
	  </div>
	  );
  },

  _onDestroyClick: function() {
    TimelineActions.destroy(this.props.date);
  }

});

var Timeline_date = React.createClass({
  render: function() {
    //var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="timeline_date">
        {this.props.date}      
        <svg className="timeline_bar">
          <rect fill="#5B4F35" width="17" height="107"/>
        </svg>
      </div>
    );
  }
});
var Timeline_text = React.createClass({
	showdetail: function() {
		console.log("showdetail");
	},
	
  render: function() {
	var timelinetext =[];
	for (var d in this.props.text) {
      timelinetext.push(
		<div >
			<div  className="timelinetext_text" onclick={this.showdetail}>{this.props.text[d]}</div >
		</div>
		)
    }
    return (
    <div className="timeline_text">
		{timelinetext}
    </div>
    );
  }
});

module.exports = TimelineItem;
