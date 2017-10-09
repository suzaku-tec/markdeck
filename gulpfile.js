var requireDir = require('require-dir');
var del = require("del")
var gulp = require("gulp");

requireDir('./build', {
  recurse: true
});

gulp.task("clean", function (cb) {
  del(["src/main/**/*.js"], cb);
});