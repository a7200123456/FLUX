/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TimelineStore

*/
var TimelineConstants = require('../constants/TimelineConstants'); 
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _changeListeners = [];
var _timelines = [];

function getserver() {
	$.getJSON('http://140.112.175.38:3000/projects',function(data){
		for (var i = 0; i < data.length; i++) {
			create_timeline(data[i].id,data[i].name,data[i].description);
			//getserver_timeline(data[i].name);
		}
		TimelineStore.emitChange();
	})
}
function getserver_timeline(p_id) {
	//console.log("store function getserver_timeline p_id = " + p_id);
	//var url = 'http://140.112.175.39:4567/project/' + project;
	$.get('http://140.112.175.38:3000/project', { id: p_id })
	.done(function(data){
		//console.log(data.length);
		for (var i = 0; i < data.length; i++) {
			var d_id = data[i].id;
			var date = data[i].date;
			var date_dc   = data[i].description;
			_timelines[p_id][d_id] = [];
			_timelines[p_id][d_id].push({d_id,date,date_dc});
			console.log("d_id : "+d_id);
			$.get('http://140.112.175.38:3000/record_date', { id: d_id })
			.done(function(data_r){
				//var data_r = JSON.parse(data_r);
				//console.log(data_r.length);
				//console.log(data_r);
				console.log(d_id, data_r[0].record_date_id);
				for (var j = 0; j < data_r.length; j++) {
					if (data_r[j].source == "flickr") {
						var r_id = data_r[j].id;
						var r_name = data_r[j].name;
						var source = data_r[j].source;
						var info = data_r[j].photoset_id;
						
						_timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
						//_timelines[project][data_r[i].date].push({text,source,info});
					}
					else {//data_r[j].source == "dropbox"
						var r_id = data_r[j].id;
						var r_name = data_r[j].name;
						var source = data_r[j].source;
						var info = data_r[j].path;

						_timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
						//create(project, data_record[i].date, data_record[i].records[j].name, data_record[i].records[j].source, 0);
					}
				}
			})
		}
		console.log("action: getserver_timeline  project_name : " + p_id);
		//TimelineStore.emitChange();
	})
}
function create(p_id,d_id, date, date_dc,r_id, r_name, source, info) {
   if (_timelines[p_id][d_id])
	  _timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
  else{
		_timelines[p_id][d_id] = [];
		_timelines[p_id][d_id].push({d_id,date,date_dc});
		_timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
	  }
}
function create_timeline(p_id,p_name,p_dc) {
	_timelines[p_id] = [];
	_timelines[p_id].push({p_id,p_name,p_dc});
}

function destroy(id,date) {
  delete _timelines[id][date];
}

var TimelineStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
	var array = [];

    for (var p_id in _timelines)
      array.push(_timelines[p_id][0]);
    //console.log(array);
    return array;
	},

  getTimeline: function (p_id) {
    return _timelines[p_id];
  },

  emitChange: function() {
    _changeListeners.forEach(function (callback) {
      callback(); 
    });
	//this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    _changeListeners.push(callback);
	//this.on(CHANGE_EVENT, callback);
  },
 
  removeChangeListener: function(callback) {
    _changeListeners = _changeListeners.filter(function (l) {
      return callback !== l;
    });
	//this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
	case TimelineConstants.TIMELINE_INIT:
        getserver();
		//TimelineStore.emitChange();
      break;
	
	case TimelineConstants.TIMELINE_TIMELINE_INIT:
        
		//console.log("store getserver_timeline p_id = " + action.p_id);
		getserver_timeline(action.p_id);
		//TimelineStore.emitChange();
      break;
	  
    case TimelineConstants.TIMELINE_CREATE:
      if (text !== '') {
        //create(action.project, action.date, action.text);
		create(action.p_id,action.d_id, action.date, action.date_dc,action.r_id, action.r_name, action.source, action.info)
        TimelineStore.emitChange();
      }
      break;

    case TimelineConstants.TIMELINE_CREATE_TIMELINE:
      //create_timeline(action.id,action.name,action.description);
	  create_timeline(action.p_id,action.p_name,action.p_dc);
      TimelineStore.emitChange();
      break;

    case TimelineConstants.TIMELINE_DESTROY:
      destroy(action.project, action.date);
      TimelineStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TimelineStore;
