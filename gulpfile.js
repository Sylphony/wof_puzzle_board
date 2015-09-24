// Include gulp
var gulp = require("gulp");
// Include plugins
var sass = require("gulp-sass");

gulp.task("scssCompile", function() {
	gulp.src("src/scss/**/*.scss")
		.pipe(sass({
			outputStyle: "expanded"
		}))
        .pipe(gulp.dest("./css/"));
});

gulp.task("scssWatch", function() {
	gulp.watch("src/scss/**/*.scss");
});

gulp.task("default", ["scssCompile"]);