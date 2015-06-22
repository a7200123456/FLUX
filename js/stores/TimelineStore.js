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
			create_timeline(data[i].name);
			//getserver_timeline(data[i].name);
		}
		TimelineStore.emitChange();
	})
}
function getserver_timeline(project) {
	//var url = 'http://140.112.175.39:4567/project/' + project;
	$.get('http://140.112.175.38:3000/project', { id: 1 })
	.done(function(data){
		var raw_json = JSON.parse(data);
		for (var i = 0; i < raw_json.length; i++) {
			_timelines[project][raw_json[i].date] = [];
				//console.log(raw_json[i].records[j].source);
				//console.log(raw_json[i].records[j].photoset_id);
		}
		$.get('http://140.112.175.38:3000/record_date', { id: 1 })
			.done(function(data_r){
			var raw_json_r = JSON.parse(data_r);
			for (var j = 0; j < raw_json_r[i].records.length; j++) {
				if (raw_json_r[i].records[j].source == "flickr") {
					var text = raw_json_r[i].records[j].name;
					var source = raw_json_r[i].records[j].source;
					var info = raw_json_r[i].records[j].photoset_id;
					_timelines[project][raw_json_r[i].date].push({text,source,info});
				}
				else {
					var text = raw_json_r[i].records[j].name;
					var source = raw_json_r[i].records[j].source;
					var info = 0;
					_timelines[project][raw_json_r[i].date].push({text,source,info});
					//create(project, raw_json_record[i].date, raw_json_record[i].records[j].name, raw_json_record[i].records[j].source, 0);
				}
			}
			
			console.log("action: getserver_timeline  project_name : " + project);
			TimelineStore.emitChange();
			})
	})
}
function create(project,date, text, source, info) {
   if (_timelines[project][date])
	  _timelines[project][date].push({text,source,info});
  else{
	  _timelines[project][date] = [];
	  _timelines[project][date].push({text,source,info});
	  }
}
function create_timeline(project) {
	_timelines[project] = [];
	_timelines[project].push(project);
}

function destroy(project,date) {
  delete _timelines[project][date];
}

var TimelineStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
	var array = [];

    for (var id in _timelines)
      array.push(_timelines[id][0]);
    //console.log(array);
    return array;
	},

  getTimeline: function (id) {
    return _timelines[id];
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
        getserver_timeline(action.project);
		//TimelineStore.emitChange();
      break;
	  
    case TimelineConstants.TIMELINE_CREATE:
      if (text !== '') {
        create(action.project, action.date, action.text);
        TimelineStore.emitChange();
      }
      break;

    case TimelineConstants.TIMELINE_CREATE_TIMELINE:
      create_timeline(action.project);
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
