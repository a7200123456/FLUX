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
			//console.log("d_id : "+d_id);
		
			$.get('http://140.112.175.38:3000/record_date', { id: d_id })
			.done(function(data_r){
				//var data_r = JSON.parse(data_r);
				//console.log(data_r.length);
				//console.log(data_r);
				//console.log(d_id, data_r[0].record_date_id);
				for (var j = 0; j < data_r.length; j++) {
					if (data_r[j].source == "flickr") {
						var r_id = data_r[j].id;
						var r_name = data_r[j].name;
						var r_dc = data_r[j].description;
						var source = data_r[j].source;
						var info = data_r[j].photoset_id;
						var miniature = data_r[j].miniature;
						
						_timelines[p_id][data_r[0].record_date_id][r_id]={r_id,r_name,r_dc ,source, info, miniature};
						//_timelines[project][data_r[i].date].push({text,source,info});
					}
					else {//data_r[j].source == "dropbox"
						var r_id = data_r[j].id;
						var r_name = data_r[j].name;
						var r_dc = data_r[j].description;
						var source = data_r[j].source;
						var info = data_r[j].path;
	
						_timelines[p_id][data_r[0].record_date_id][r_id]={r_id,r_name, r_dc, source, info};
						//create(project, data_record[i].date, data_record[i].records[j].name, data_record[i].records[j].source, 0);
					}
				}
				console.log("_getserver_timeline p_id : " + p_id +" d_id : "+ d_id);
				TimelineStore.emitChange();
			})
		}
	})
}

function create_flickr(p_id, d_id,date, r_name, filess) {
	console.log("create_flickr");
	
	/// loading window ///
      	var w_width=500;                                                                               
      	var w_height=300;                                                             
      	var x=(screen.width-w_width)/2;                                                  
      	var y=(screen.height-w_height)/2;                                     
      	var ww='width='+w_width+',height='+w_height+',top='+y+',left='+x;   
      	//var mywindow=window.open(url,name,ww); 
       	var mywindow=window.open("loading.html","Ratting",ww);
		
	if (_timelines[p_id][d_id]){
		console.log("if");
		$.post('http://140.112.175.38:3000/flickr_record/create', { date_id: d_id, name: r_name, description: "" })
            .done(function(data){
                console.log(data);
				flickr_record_id = data.id;

				var reader = new FileReader();
				//console.log($('#file')[0]);
				//console.log($('#file')[0].files[1]);
				reader.readAsDataURL(filess);
				//console.log(filess);
				//var reader = new FileReader({'blob': true});
				//reader.readAsArrayBuffer($('#file')[0].files[0])
				//reader.readAsArrayBuffer(filess)

				reader.onloadend = function(){
					$.ajax('http://140.112.175.38:3000/photo_record/create', {
							data: { name: filess.name, data: reader.result, flickr_record_id: flickr_record_id },
							type: 'POST'
						})
						.done(function(res){
							mywindow.close();
							alert("success");
							console.log(res);
							
							var r_id	= data.id;
							var r_name	= data.name; 
							var source	= data.source;
							var	info	= data.photoset_id;
							//var miniature = data.miniature;
							_timelines[p_id][d_id][data.id]={r_id,r_name, source, info}; 
							
							getserver_timeline(p_id);
							//TimelineStore.emitChange();
							console.log("here!!!");
							
						})
				}
            })
	}
	else {
		console.log("else");
		$.post('http://140.112.175.38:3000/record_date/create', { project_id: p_id, date: date, description: "" })
		.done(function(data){
			var d_id = data.id;
			var d_dc = "";
			_timelines[data.project_id][data.id] = [];
			_timelines[data.project_id][data.id].push({d_id,date,d_dc}); 
			$.post('http://140.112.175.38:3000/flickr_record/create', { date_id: d_id, name: r_name, description: "" })
            .done(function(data_r){
                console.log(data_r);
				flickr_record_id = data_r.id;

				var reader = new FileReader();
				//console.log($('#file')[0]);
				//console.log($('#file')[0].files[1]);
				reader.readAsDataURL(filess);
				//console.log(filess);
				//var reader = new FileReader({'blob': true});
				//reader.readAsArrayBuffer($('#file')[0].files[0])
				//reader.readAsArrayBuffer(filess)

				reader.onloadend = function(){
					$.ajax('http://140.112.175.38:3000/photo_record/create', {
							data: { name: filess.name, data: reader.result, flickr_record_id: flickr_record_id },
							type: 'POST'
						})
						.done(function(res){
							mywindow.close();
							alert("success");
							console.log(res);
							
							var r_id	= data_r.id;
							var r_name	= data_r.name; 
							var source	= data_r.source;
							var	info	= data_r.photoset_id;
							//var miniature = data.miniature;
							console.log(_timelines[p_id][d_id]);
							_timelines[p_id][d_id][data_r.id]={r_id,r_name, source, info}; 
							//_timelines[data.project_id][data.id][data_r.id]={r_id,r_name, source, info};
							
							getserver_timeline(p_id);
							//TimelineStore.emitChange();
							console.log("here!!!");
							
						})
				}
			})
		})
	}
}

function create(p_id,d_id, date, date_dc,r_id, r_name, r_dc, source, info) {
	console.log("outside:"+r_dc);
   // get project record dates
    if (_timelines[p_id][d_id]){
		$.post('http://140.112.175.38:3000/dropbox_record/create', { date_id: d_id, name: r_name, description: r_dc, path: "" })
            .done(function(data_r){
				var r_id	= data_r.id;
				var r_name	= data_r.name; 
				var r_dc    = data_r.description;
				console.log("has timeline:"+r_dc);
				var source	= data_r.source;
				var	info	= data_r.path;
				_timelines[p_id][d_id][data_r.id]={r_id,r_name, r_dc, source, info}; 
				TimelineStore.emitChange();
            })
	}
    else{
		$.post('http://140.112.175.38:3000/record_date/create', { project_id: p_id, date: date, description: date_dc })
           .done(function(data){
			var d_id = data.id;
            _timelines[data.project_id][data.id] = [];
			_timelines[data.project_id][data.id].push({d_id,date,date_dc}); 
			//if(source == "dropbox"){
			$.post('http://140.112.175.38:3000/dropbox_record/create', { date_id: data.id, name: r_name, description: r_dc, path: "" })
            .done(function(data_r){
				var r_id	= data_r.id;
				var r_name	= data_r.name; 
				var r_dc    = data_r.description;
				console.log("no timeline:"+r_dc);
				var source	= data_r.source;
				var	info	= data_r.path;
				_timelines[data.project_id][data.id][data_r.id]={r_id,r_name,r_dc, source, info};
				TimelineStore.emitChange();
            }) 
			//}else{//source == flicker}
        })
	  
	}
   // create a record date
    //if (_timelines[p_id][d_id])
	//  _timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
	//else{
	//	_timelines[p_id][d_id] = [];
	//	_timelines[p_id][d_id].push({d_id,date,date_dc});
	//	_timelines[p_id][d_id][r_id]={r_id,r_name, source, info};
	//  }
}
function create_timeline(p_id,p_name,p_dc) {
	_timelines[p_id] = [];
	_timelines[p_id].push({p_id,p_name,p_dc});
}
function create_timeline_set_server(p_id,p_name,p_dc){
	$.post('http://140.112.175.38:3000/project/create', { "name": p_name, "description": p_dc })
            .done(function(data){
                create_timeline(data.id,data.name,data.description);
				TimelineStore.emitChange();
            })
}
function destroy_p(p_id) {
	$.ajax('http://140.112.175.38:3000/project/delete',{
                data: { id: p_id},
                method: "GET",
            })
            .done(function(res){
                //if(res.success == "success"){
					delete _timelines[p_id];
					console.log("!!delete project success");
				//}
				//else 
				//	console.log("!!delete project fail p_id = "+ p_id);
				TimelineStore.emitChange();
            })   
}

function destroy_d(p_id,d_id) {
	$.ajax('http://140.112.175.38:3000/record_date/delete', {
                data: { id: d_id },
                method: "GET"
            })
            .done(function(res){
                //if(res.success == "success"){
					delete _timelines[p_id][d_id];
					console.log("!!delete date success");
				//}
				//else 
				//	console.log("!!delete date fail p_id = "+ p_id+", d_id = "+ d_id);
				TimelineStore.emitChange();
            })
  //delete _timelines[id][date];
}

function destroy_r(p_id, d_id, r_id) {
	$.ajax('http://140.112.175.38:3000/dropbox_record/delete', {
                data: { id: r_id },
                method: "GET"
            })
            .done(function(res){
				//if(res.success == "success"){
					delete _timelines[p_id][d_id][r_id];
					console.log("!!delete record success");
				//}
				//else 
				//	console.log("!!delete date fail p_id = "+ p_id+", d_id = "+ d_id +", r_id = "+ r_id);
				TimelineStore.emitChange();
            })
}

var TimelineStore = assign({}, EventEmitter.prototype, {
  
  get_p_name: function(p_id){
  	return _timelines[p_id][0].p_name;
  },
  
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
	  
	case TimelineConstants.TIMELINE_CREATE_FLICKR:
		if (text !== '') {
			create_flickr(action.p_id,action.d_id, action.date, action.r_name, action.filess);
		}
		break;  
	  
    case TimelineConstants.TIMELINE_CREATE:
      if (text !== '') {
        //create(action.project, action.date, action.text);
		create(action.p_id,action.d_id, action.date, action.date_dc,action.r_id, action.r_name, action.r_dc, action.source, action.info)
      }
      break;

    case TimelineConstants.TIMELINE_CREATE_TIMELINE:
      //create_timeline(action.id,action.name,action.description);
	  create_timeline_set_server(action.p_id,action.p_name,action.p_dc);
      
      break;

    case TimelineConstants.DESTROY_PROJECT:
      destroy_p(action.p_id);
      break;

    case TimelineConstants.DESTROY_DATE:
      destroy_d(action.p_id, action.d_id);
      break;

    case TimelineConstants.DESTROY_RECORD:
      destroy_r(action.p_id, action.d_id, action.r_id);
      break;	  

    default:
      // no op
  }
});

module.exports = TimelineStore;
