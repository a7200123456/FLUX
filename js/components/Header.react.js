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

var Header = React.createClass({

	_onSave: function(e) {
		e.preventDefault();
		var allTimelines = this.props.allTimelines;
		var new_d_id = 0;
		var new_r_id = 0;
		var match = 0;
		var date = React.findDOMNode(this.refs.date).value.trim();
		var r_dc = React.findDOMNode(this.refs.description).value.trim();
		var r_name  = $('#file')[0].files[0].name;
		var source = "";
		var info = "";
		if (!r_name || !date || !r_dc ) {
			return;
		};
		//console.log(allTimelines);
		for (var d_id in allTimelines){
			//console.log(d_id);
			if(d_id == 0){
				new_d_id = 1;
				new_r_id = 1;
				match = 0;
			}
			else if(date == allTimelines[d_id][0].date && match == 0){
				//console.log("match: "+allTimelines[d_id][0].date);
				new_d_id = d_id;
				new_r_id = 0;
				for (var r_id in allTimelines[d_id]){
					new_r_id = new_r_id+1;
				}
				match = 1;
			}
			else if(match == 0){
				//console.log("not match: "+allTimelines[d_id][0].date);
				new_d_id = new_d_id + 1;
				new_r_id = 1;
			}		
		}
		
		var reg = /\.[a-zA-Z]*$/;
		var getfiletype = reg.exec(r_name);
		if (getfiletype == ".jpg" || getfiletype == ".png" || getfiletype == ".gif") {
			//console.log("call uploadphoto");
			//this.uploadfile(r_name,date);
			//
			//this.uploadphoto(r_name,date);
			var filess = $('#file')[0].files[0];
			TimelineActions.create_flickr(this.props.p_id,new_d_id, date, r_name, filess)
		}
		else {
			this.uploadfile(r_name,date);
			TimelineActions.create(this.props.p_id,new_d_id, date, "",new_r_id, r_name, r_dc, source, info)
		}
			
		//console.log(new_d_id,new_r_id)
		
		//TimelineActions.create(this.props.p_id,date,text);
		React.findDOMNode(this.refs.date).value = '';
		React.findDOMNode(this.refs.description).value = '';
		React.findDOMNode(this.refs.text).value = '';
    return;
  },
  
  
  uploadfile : function(p_id,r_name,date){
  	   var reader = new FileReader({'blob': true});
       reader.readAsArrayBuffer($('#file')[0].files[0]);

       /// loading window ///
      	var w_width=500;                                                                               
      	var w_height=300;                                                             
      	var x=(screen.width-w_width)/2;                                                  
      	var y=(screen.height-w_height)/2;                                     
      	var ww='width='+w_width+',height='+w_height+',top='+y+',left='+x;   
      	//var mywindow=window.open(url,name,ww); 
       	var mywindow=window.open("loading.html","Ratting",ww);


       reader.onload = function(){
       $.ajax({
            type: "PUT",
            url: "https://api-content.dropbox.com/1/files_put/auto/"+ p_id +"/" + date + "/" + r_name + "?access_token=" + "cylJKvSb2aAAAAAAAAAACiaNzW-K63KK3UYUh_4XQungz1abmzBWpthPn-f0emue",
            data: reader.result,
            headers: { 'Content-Type': 'text/plain'},
            dataType: "json",
            contentType: false,
            processData: false,
        }).done(function(res) {
            uploadpath = res.path;
			mywindow.close();
            alert("success");
            })
         .fail(function(err){
            console.log(err);
            })
        }
	},
	
  render: function() {
  	var idname= this.props.p_id;
    var prjname =  this.props.p_name;
    
		//console.log('this.refs.date: '+date);
	return (
      <header id="header">
        <h1>timelines</h1>
        <h3 className="prjname" >♠   {prjname}</h3>
        <form className="timelineHeader" onSubmit={this._onSave}>
			<input type="text" placeholder="date" ref="date" />
			<p></p>
			<input type="text" placeholder="description/tag" ref="description" id="description"/>
			<p></p>
    		<input type="file" placeholder="file_name" ref="text" id="file"/>
    		<p></p>
    		<input type="submit" className="btndefault" value="Upload A File"/>
      		<p></p>
		</form>
      </header>
    );
  }
});

module.exports = Header;
