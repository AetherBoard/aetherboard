// file: main entry point for webpack
var _ = require('highland');

// require my services
var ui = require('./ui');
var input = require('./input');
var prop = require('./property');
var invoke = require('./invoke');
var spline = require('./spline');
var map = require('through2-map');
var normPoints = require('./lib/normalize-points');

// set up graft, websockets and return channel streams.
var graft = require('graft')();

//var client = require('graft/ws').client();
var drawInput = graft.ReadChannel();
var drawSync = graft.WriteChannel();
var pngStream = graft.WriteChannel();

graft.write({
  topic: 'subscribe',
  drawInput: drawInput,
  drawSync: drawSync,
  pngStream: pngStream
});

// initial image loaded into the canvas
//pngStream.pipe(ui.image);

// normalize mouse input into strokes+segments
var inputStream = input(ui.sync);
function drawStroke(s) {
  return s.pluck('segments').

// send my strokes to the server
//inputStream.pipe(drawInput);

inputStream
  .pipe(prop('segments')
    .pipe(spline())
    .pipe(invoke(ui.ctx)));
