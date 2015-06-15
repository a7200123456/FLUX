/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

//var React = require('react');
//var ReactPropTypes = React.PropTypes;
var TimelineActions = require('../actions/TimelineActions');
var TimelineItem = require('./TimelineItem.react');

var MainSection = React.createClass({

  //propTypes: {
  //  allTimelines: ReactPropTypes.array.isRequired
  //  //,areAllComplete: ReactPropTypes.bool.isRequired
  //},

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are timelines.
    //if (Object.keys(this.props.allTimelines).length < 1) {
    //  return null;
    //}

    var allTimelines = this.props.allTimelines;
    var timelines = [];

    for (var d in allTimelines) {
      timelines.push(<TimelineItem date={d} timeline={allTimelines[d]} />);
    }

    return (
      <section id="main">{timelines}
      </section>
    );
  },

  /**
   * Event handler to mark all TimeLines as complete
   
  _onToggleCompleteAll: function() {
    TimelineActions.toggleCompleteAll();
  }
*/
});

module.exports = MainSection;
