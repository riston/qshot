
"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let webpack = require("webpack");

gulp.task("copy:dev", () => {

     // Copy files
    gulp.src("./extension/**")
        .pipe(gulp.dest("build"));
});

gulp.task("build:dev", () => {
    gulp.watch(["app/**/*", "extension"], ["webpack:dev", "copy:dev"]);
});

gulp.task("webpack:dev", () => {
    const config = require("./webpack/dev.config.js");

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
    });
});
