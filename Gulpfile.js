
"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const zip = require("gulp-zip");

gulp.task("zip", () => {
    const manifest = require("./extension/manifest.json");
    const version = manifest.version;

    gulp.src("build/*")
        .pipe(zip(`qshot-${version}.zip`))
        .pipe(gulp.dest("dist"));
});

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
