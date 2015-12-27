
"use strict";

const gulp    = require("gulp");
const gutil   = require("gulp-util");
const webpack = require("webpack");
const zip     = require("gulp-zip");

const webpackBuild = (config, cb) => {

    return webpack(config, (err, stats) => {
        if (err) {
            return cb(new gutil.PluginError("webpack", err));
        }

        gutil.log("[webpack]", stats.toString({
            colors: true
        }));

        return cb(null);
    });
}

gulp.task("zip", () => {
    const manifest = require("./extension/manifest.json");
    const version = manifest.version;

    return gulp.src("build/*")
        .pipe(zip(`qshot-${version}.zip`))
        .pipe(gulp.dest("dist"));
});

gulp.task("copy", () => {

     // Copy files
    return gulp.src("./extension/**")
        .pipe(gulp.dest("build"));
});

gulp.task("webpack:prod", (done) => {
    const config = require("./webpack/prod.config.js");

    return webpackBuild(config, done);
});

gulp.task("webpack:dev", () => {
    const config = require("./webpack/dev.config.js");

    return webpackBuild(config, done);
});

gulp.task("build:dev", () => {
    return gulp.watch(["app/**/*", "extension"], ["webpack:dev", "copy"]);
});

gulp.task("build:prod", ["webpack:prod", "copy", "zip"]);
