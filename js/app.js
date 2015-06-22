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
  render: function () {
	
	var timelines_p =[];
	var timeline_id = 1;
	for (var id in this.state.timelines) {
	  timeline_id = timeline_id+1;
      timelines_p.push(<li key={this.state.timelines[id].p_id}>
							    <Link to="timeline" params={{id : this.state.timelines[id].p_id}} >
									<button onClick={this._getserver_timeline.bind(null,this.state.timelines[id].p_id)}> 
										{this.state.timelines[id].p_name}
									</button>	
							    </Link>
					   </li>);
    }
    return (
      <div className="App">
		<div className="TimelineList">
          <Link to="new" params={{id: timeline_id}}>New Timeline</Link>
			<ul>
			{timelines_p}
			</ul>
          <Link to="/nothing-here">Invalid Link (not found)</Link>
        </div>
        <div className="Content">
          <RouteHandler/>
        </div>
		
      </div>
    );
  },
  
  _getserver_timeline: function(p_id) {
	console.log("!!getserver_timeline p_id = " + p_id);
	TimelineActions.timeline_init(p_id);
  },
  
		//<button onClick={this._getserver_timeline(1)}>
		//		fuck_you
		//	</button>
});

        
var Index = React.createClass({
  render: function () {
    return <h1>Timeline Project</h1>;
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
          <input type="text" ref="first" placeholder="project name"/>
        </p>
        <p>
          <button type="submit">Save</button> <Link to="/">Cancel</Link>
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
