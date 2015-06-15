/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  TIMELINE_CREATE: null,
  TIMELINE_COMPLETE: null,
  TIMELINE_DESTROY: null,
  TIMELINE_DESTROY_COMPLETED: null,
  TIMELINE_CREATE_TIMELINE: null,
  TIMELINE_UNDO_COMPLETE: null,
  TIMELINE_UPDATE_TEXT: null
});
