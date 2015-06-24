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


//      <div className="timeline">
//      </div>
//      <button className="Destroyday" onClick={this._destroy_d}>x</button>
 
  render: function() {
    var timeline = this.props.timeline;
	var p_id = this.props.p_id;
	var d_id = this.props.d_id;
  var deldate = this.props.date;
	return (
    <div className="timeline">
      <button className="Destroyday" onClick={this._destroy_d.bind(null,deldate)}>Delete Day</button>
			<Timeline_date  date={this.props.date}></Timeline_date>
			<Timeline_text  p_id={this.props.p_id} d_id={this.props.d_id} date={this.props.date} text={timeline}></Timeline_text>
    </div>
	  );
  },

   _destroy_d: function(p_id,deldate) {
	  //console.log("_destroy_d");
    TimelineActions.destroy_d(this.props.p_id, this.props.d_id);

   $.ajax({
            type: "POST",
            url: "https://api.dropbox.com/1/fileops/delete?root=auto&path="+ p_id +"/" + deldate,
            headers: { "Authorization": "Bearer " + "cylJKvSb2aAAAAAAAAAACiaNzW-K63KK3UYUh_4XQungz1abmzBWpthPn-f0emue" },
            dataType: "json",
            contentType: "application/octet-stream",
        }).done(function(res) {
            alert("Delete success");
            })
         .fail(function(err){
            console.log(err);
       })

  }


});

var Timeline_date = React.createClass({
  render: function() {
    //var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="timeline_date">
        {this.props.date}      
        <svg className="timeline_bar">
          <rect fill="#B0C4DE" width="17" height="140"/>
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
      var url = "https://www.dropbox.com/home/應用程式/LSCFirsApp/"+ this.props.p_id +"/"+ date +"?preview=" + filename;
      var getfiletype = reg.exec(this.props.text[r_id].r_name);
      var description = this.props.text[r_id].r_dc;
	  
	  var photosetID = this.props.text[r_id].info;
	  var url_photo = "https://www.flickr.com/photos/133500003/sets/" + photosetID;


  if (getfiletype == ".pdf" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-PDF-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
	</div>
    )
    }
  else if (getfiletype == ".doc" || getfiletype == ".docx" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-DOC-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    } 
  else if (getfiletype == ".jpg" || getfiletype == ".gif" ||getfiletype == ".png"){
		var miniature = this.props.text[r_id].miniature;
		console.log(this.props.text[r_id]);
		var farm = miniature.farm;
		var server = miniature.server;
		var id = miniature.photo_id;
		var secret = miniature.secret;
		var picURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg"; 
		console.log(picURL)
		timelinetext.push(
		<div className="timelinebox">
		<a href={url_photo} target="_blank"><img src={picURL} height="80" width="80" /></a>
		<div className="timelinetext_text">{filename}</div >
		</div>
		)
    }
  else if (getfiletype == ".ppt" || getfiletype == ".pptx"  ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-PPT-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    }
  else if (getfiletype == ".txt" ){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-TXT-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    }
  else if (getfiletype == ".rar"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-RAR-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    }  
  else if (getfiletype == ".zip"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-IP-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    }  
  else if (getfiletype == ".mov"){
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-MOV-icon.png" height="80" width="80" title={description}/></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    } 
  else if (r_id == "0" || r_id == 0 ){
    }   
  else {
      timelinetext.push(
    <div className="timelinebox">
      <a href={url} target="_blank"><img src="icon/File-BLANK-icon.png" height="80" width="80" title={description} /></a>
      <div className="timelinetext_text">{this.props.text[r_id].r_name}</div >
	  <button className="Destroybtn" onClick={this._destroy_r.bind(null,this.props.p_id,r_id,filename,date)}>x</button>
    </div>
    )
    } 
  }
    return (
    <div className="timeline_text">
    {timelinetext}
    </div>
    );
  },

  _destroy_r: function(p_id,r_id,filename,date) {
	  //console.log("_destroy_d");
    TimelineActions.destroy_r(this.props.p_id, this.props.d_id, r_id);

    $.ajax({
            type: "POST",
            url: "https://api.dropbox.com/1/fileops/delete?root=auto&path="+ p_id + "/" + date + "/" + filename,
            headers: { "Authorization": "Bearer " + "cylJKvSb2aAAAAAAAAAACiaNzW-K63KK3UYUh_4XQungz1abmzBWpthPn-f0emue" },
            dataType: "json",
            contentType: "application/octet-stream",
        }).done(function(res) {
            alert("Delete success");
            })
         .fail(function(err){
            console.log(err);
       })

     },

});

module.exports = TimelineItem;
