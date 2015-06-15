/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

//var React = require('react');
var Router = require('react-router');
var TimelineApp = require('./components/TimelineApp.react');
var TimelineStore = require('./stores/TimelineStore');
var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var App = React.createClass({
  getInitialState: function () {
    return {
      contacts: TimelineStore.getContacts(),
      loading: true
    };
  },

  componentWillMount: function () {
    TimelineStore.init();
  },

  componentDidMount: function () {
    TimelineStore.addChangeListener(this.updateContacts);
  },

  componentWillUnmount: function () {
    TimelineStore.removeChangeListener(this.updateContacts);
  },

  updateContacts: function () {
    if (!this.isMounted())
      return;

    this.setState({
      contacts: TimelineStore.getContacts(),
      loading: false
    });
  },

  render: function () {
    var contacts = this.state.contacts.map(function (contact) {
      return <li key={contact.id}><Link to="contact" params={contact}>{contact.first}</Link></li>;
    });
    return (
      <div className="App">
        <div className="ContactList">
          <Link to="new">New Contact</Link>
          <ul>
            {contacts}
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
    return <h1>Address Book</h1>;
  }
});

var Contact = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getStateFromStore: function () {
    var id = this.context.router.getCurrentParams().id;
    return {
      contact: TimelineStore.getContact(id)
    };
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    TimelineStore.addChangeListener(this.updateContact);
  },

  componentWillUnmount: function () {
    TimelineStore.removeChangeListener(this.updateContact);
  },

  componentWillReceiveProps: function () {
    this.setState(this.getStateFromStore());
  },

  updateContact: function () {
    if (!this.isMounted())
      return;

    this.setState(this.getStateFromStore());
  },

  destroy: function () {
    var { router } = this.context;
    var id = router.getCurrentParams().id;
    TimelineStore.removeContact(id);
    router.transitionTo('/');
  },

  render: function () {
    var contact = this.state.contact || {};
    var name = contact.first + ' ' + contact.last;
    var avatar = contact.avatar || 'http://placecage.com/50/50';
    return (
      <div className="Contact">
        <img height="50" src={avatar} key={avatar}/>
        <h3>{name}</h3>
        <button onClick={this.destroy}>Delete</button>
      </div>
    );
  }
});

var NewContact = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  createContact: function (event) {
    event.preventDefault();
    TimelineStore.addContact({
      first: this.refs.first.getDOMNode().value,
      last: this.refs.last.getDOMNode().value
    }, function (contact) {
      this.context.router.transitionTo('contact', { id: contact.id });
    }.bind(this));
  },

  render: function () {
    return (
      <form onSubmit={this.createContact}>
        <p>
          <input type="text" ref="first" placeholder="First name"/>
          <input type="text" ref="last" placeholder="Last name"/>
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
    <Route name="new" path="contact/new" handler={NewContact}/>
    <Route name="contact" path="contact/:id" handler={Contact}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
	//React.render(<TimelineApp />,document.getElementById('timelineapp'));
	React.render(<Handler/>, document.getElementById('timelineapp'));
});
