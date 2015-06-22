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

    var allTimelines = this.props.allTimelines;
    var timelines = [];

    for (var d_id in allTimelines) {
		if(d_id != 0)
		timelines.push(<TimelineItem date={allTimelines[d_id][0].date} timeline={allTimelines[d_id]} />);
    }

    return (
      <section id="main">{timelines}
      </section>
    );
  },

});

module.exports = MainSection;
