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
		var r_name = React.findDOMNode(this.refs.text).value.trim();
		var source = "";
		var info = "";
		if (!r_name || !date) {
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
		//console.log(new_d_id,new_r_id)
		TimelineActions.create(this.props.p_id,new_d_id, date, "",new_r_id, r_name, source, info)
		//TimelineActions.create(this.props.p_id,date,text);
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
