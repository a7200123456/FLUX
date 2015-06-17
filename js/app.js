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
	for (var project_name in this.state.timelines) {
      timelines_p.push(<li key={this.state.timelines[project_name]}>
						<Link to="timeline" params={{id : this.state.timelines[project_name]}} >
							{this.state.timelines[project_name]}
						</Link>
					</li>);
    }
    //var timelines = this.state.timelines.map(function (project) {
    //  return <li key={project_name}>
	//			<Link to="timeline" params={project_name} >
	//				{project_name}
	//			</Link>
	//		  </li>;
    //});
    return (
      <div className="App">
		<div className="TimelineList">
          <Link to="new">New Timeline</Link>
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
  }
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
    TimelineActions.create_timeline(
      this.refs.first.getDOMNode().value
    );
  },

  render: function () {
    return (
      <form onSubmit={this.createTimeline}>
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
    <Route name="new" path="timeline/new" handler={NewTimeline}/>
    <Route name="timeline" path="timeline/:id" handler={TimelineApp}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('timelineapp'));
});
