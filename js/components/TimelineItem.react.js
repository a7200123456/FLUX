/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

//var React = require('react');
//var ReactPropTypes = React.PropTypes;
var TimelineActions = require('../actions/TimelineActions');
var TimelineTextInput = require('./TimelineTextInput.react');

var cx = require('react/lib/cx');

var TimelineItem = React.createClass({
 /**
  propTypes: {
   timeline: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },
*/
  /**
   * @return {object}
   */
  render: function() {
    var timeline = this.props.timeline;
 /**
    var input;
    if (this.state.isEditing) {
      input =
        <TimelineTextInput
          className="edit"
          onSave={this._onSave}
          value={timeline.text}
        />;
    }
*/
    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <div className="timeline">
            <button className="destroy" onClick={this._onDestroyClick}>delete all day</button>
			<Timeline_date date={this.props.date}></Timeline_date>
			<Timeline_text text={timeline}></Timeline_text>
	  </div>
	  );/*
	  <li
        className={cx({
          'completed': timeline.complete,
          'editing': this.state.isEditing
        })}
        date={timeline.date}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={timeline.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {timeline.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );*/
  },
/**
  _onToggleComplete: function() {
    TimelineActions.toggleComplete(this.props.timeline);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  
   * Event handler called within TimelineTextInput.
   * Defining this here allows TimelineTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   
  _onSave: function(text) {
    TimelineActions.updateText(this.props.timeline.date, text);
    this.setState({isEditing: false});
  },
*/
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
  render: function() {
	var timelinetext =[];
	for (var d in this.props.text) {
      timelinetext.push(
		<div >
			<img src="Bird_lonely.jpg" height="50" width="50" />
			<div  className="timelinetext_text">{this.props.text[d]}</div >
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
