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
			<Timeline_text date={this.props.date} text={timeline}></Timeline_text>
	  </div>
	  );
  },

  _onDestroyClick: function() {
	  console.log("_onDestroyClick");
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
  var date= this.props.date;
  var timelinetext =[];

  for (var r_id in this.props.text) {
      var reg = /\.[a-zA-Z]*$/;
      //console.log(this.props.text[d]);
      var filename = this.props.text[r_id].r_name;
      var url = "https://www.dropbox.com/home/應用程式/LSCFirsApp/"+ date +"?preview=" + filename;
      var getfiletype = reg.exec(this.props.text[r_id].r_name);
  if (getfiletype == ".pdf" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-PDF-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }
  else if (getfiletype == ".doc" || getfiletype == ".docx" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-DOC-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    } 
  else if (getfiletype == ".png" || getfiletype == ".jpg" || getfiletype == ".gif"  ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-JPG-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }
  else if (getfiletype == ".ppt" || getfiletype == ".pptx"  ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-PPT-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }
  else if (getfiletype == ".txt" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-TXT-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }
  else if (getfiletype == ".rar"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-RAR-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }  
  else if (getfiletype == ".zip"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-IP-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    }  
  else if (getfiletype == ".mov" ||  getfiletype == ".zip"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-MOV-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    } 
  else if (r_id == "0" || r_id == 0 ){
    }   
  else {
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-BLANK-icon.png" height="80" width="80" /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
    </div>
    )
    } 
  }
    return (
    <div className="timeline_text">
    {timelinetext}
    </div>
    );
  }
});

module.exports = TimelineItem;
