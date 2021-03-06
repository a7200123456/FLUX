/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TimelineActions = require('../actions/TimelineActions');
var TimelineItem = require('./TimelineItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTimelines: ReactPropTypes.array.isRequired
    //,areAllComplete: ReactPropTypes.bool.isRequired
  },

  render: function() {

    var projet_id = this.props.p_id;
	  var allTimelines = this.props.allTimelines;
    var timelines = [];

    for (var date_id in allTimelines) {
		if(date_id != 0)
		timelines.push(<TimelineItem p_id={projet_id} d_id={date_id} date={allTimelines[date_id][0].date} timeline={allTimelines[date_id]} />);
    }

    return (
      <section id="main">{timelines}
      </section>
    );
  },

});

module.exports = MainSection;
