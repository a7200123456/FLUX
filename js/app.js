/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
*/

var React = require('react');
var TimelineApp = require('./components/TimelineApp.react');
var TimelineStore = require('./stores/TimelineStore');
var TimelineActions = require('./actions/TimelineActions');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute; 
var	RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

 
var App = React.createClass({
  getInitialState: function () {
    return {
      timelines: TimelineStore.getAll(),
      loading: true
    };
  },
  
  componentWillMount: function () {
    TimelineActions.init();
  },

  componentDidMount: function () {
    TimelineStore.addChangeListener(this.updateTimelines);
  },

  componentWillUnmount: function () {
    TimelineStore.removeChangeListener(this.updateTimelines);
  },

  updateTimelines: function () {
    if (!this.isMounted())
      return;

    this.setState({
      timelines: TimelineStore.getAll(),
      loading: false
    });
  },
  
  login_fn : function() {
  window.open("https://www.dropbox.com/1/oauth2/authorize?response_type=token&client_id=rj3c8z8y8m2vbou&redirect_uri=https://boiling-tor-1994.herokuapp.com","Ratting","width=550,height=500,toolbox=true");
  },
  
  render: function () {
	
	var timelines_p =[];
	var timeline_id = 1;
	for (var id in this.state.timelines) {
	  timeline_id = timeline_id+1;
      timelines_p.push(<li key={this.state.timelines[id].p_id}>
							    <Link to="timeline" params={{id : this.state.timelines[id].p_id}} >
									<button id="prjbtn" onClick={this._getserver_timeline.bind(null,this.state.timelines[id].p_id)}> 
										{this.state.timelines[id].p_name}
									</button>	
							    </Link>
								<button className="Destroy" onClick={this._destroy_p.bind(null,this.state.timelines[id].p_id)}>x</button>
					   </li>);
    }
    return (
      <div className="App">
        <div className="columnsmall">
          <div className="TimelineList">
            <h2>Project List</h2>
              <button className="btndefault">
                <Link to="new" params={{id: timeline_id}}>+ Add New Project</Link>
              </button>
            <ul>
             {timelines_p}
            </ul>
              <button className="btndropbox" onClick={this.login_fn}>Dropbox Login</button>
            <p></p>
            <div className="footer">
              <p>Copyright &copy;2015 Plan.net</p>
            </div>
          </div>
        </div>
        <div className="columnlarge">
          <div className="Content">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  },
  
  _getserver_timeline: function(p_id) {
	console.log("!!getserver_timeline p_id = " + p_id);
	TimelineActions.timeline_init(p_id);
  },
  
  _destroy_p: function(p_id) {
	  //console.log("_destroy_d");
    TimelineActions.destroy_p(p_id);

       $.ajax({
            type: "POST",
            url: "https://api.dropbox.com/1/fileops/delete?root=auto&path="+ p_id ,
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

        
var Index = React.createClass({
  render: function () {
    return <h2>  </h2>;
  }
});

var NewTimeline = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  createTimeline: function (event) {
    event.preventDefault();
	
	var p_id = this.context.router.getCurrentParams().id;
	//console.log(this.context.router.getCurrentParams())
    var p_name = this.refs.first.getDOMNode().value;
	var p_dc="";
    TimelineActions.create_timeline(p_id,p_name,p_dc);

  },

  render: function () {
     return (
      <form onSubmit={this.createTimeline}>
        <h2>PROJECT ID: 
      <div>{this.context.router.getCurrentParams().id}</div>
    </h2>
      <p>
        <h2>Add New Project </h2> 
        <input type="text" ref="first" placeholder="project name"/>
      </p>
        <p>
          <button className="btndefault" type="submit">Save</button> 
          <button className="btndefault" ><Link to="/">Cancel</Link></button>
        </p>
      </form>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="new" path="timeline/new/:id" handler={NewTimeline}/>
    <Route name="timeline" path="timeline/:id" handler={TimelineApp}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('timelineapp'));
});
