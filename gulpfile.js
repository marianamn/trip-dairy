const gulp = require("gulp"),
    gulpsync = require("gulp-sync")(gulp),
    clean = require("gulp-clean"),
    browserSync = require("browser-sync").create(),
    scsslint = require("gulp-scss-lint"),
    eslint = require("gulp-eslint");


gulp.task("clean", () => {
    return gulp.src("build", { read: false })
        .pipe(clean({ force: true }));
});

//  Lint
gulp.task("lint:scss", () => {
    return gulp.src("./public/styles/*.scss")
        .pipe(scsslint());
});

gulp.task("lint:js", () => {
    return gulp.src(["./public/scripts/**/*.js", "!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("lint", ["lint:js"]);

//  Compile
const sass = require("gulp-sass"),
    babel = require("gulp-babel");

gulp.task("compile:sass", () => {
    return gulp.src("./public/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./public/build/css"));
});

gulp.task("compile:js", () => {
    return gulp.src("./public/scripts/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("./public/build/js"));
});

gulp.task("compile", gulpsync.sync(["compile:sass", "compile:js"]));

// Uglify
const uglify = require("gulp-uglify"),
    uglifycss = require("gulp-uglifycss");


gulp.task("uglify:js", () => {
    return gulp.src("./public/build/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./public/build"));
});

gulp.task("uglify:css", () => {
    gulp.src("./public/build/**/*.css")
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest("./public/build"));
});

gulp.task("uglify", gulpsync.sync(["uglify:css", "uglify:js"]));

// Minify
const minify = require("gulp-minifier");

gulp.task("minify", () => {
    gulp.src("./public/build").pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            getKeptComment: function(content) {
                let m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join("\n") + "\n" || "";
            }
        }))
        .pipe(gulp.dest("./public/build"));
});

// Rename
const rename = require("gulp-rename");

gulp.task("rename:css", () => {
    gulp.src("./public/build/css/**/*.css")
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./public/build/css"));
});

gulp.task("rename:js", () => {
    gulp.src("./public/build/js/**/*.js")
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./public/build/js"));
});

gulp.task("rename", gulpsync.sync(["rename:css", "rename:js"]));

// Watch
gulp.task("watch", () => {
    gulp.watch("./public/styles/*.scss", ["build"]);
    gulp.watch("./public/scripts/**/*.js", ["build"]);
    gulp.watch("./public/templates/**/*.handlebars", ["build"]);
    // gulp.watch("./", ["build"]);
});

// Reload
gulp.task("reload", browserSync.reload);

//  Build
gulp.task("build", gulpsync.sync(["clean", "compile", "uglify", "rename"]));

// Serve
gulp.task("browserSync", () => {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

});

gulp.task("serve", ["build", "watch", "browserSync"]);