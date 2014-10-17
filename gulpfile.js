var gulp = require('gulp');
var git = require('gulp-git');


gulp.task('git', function(){
  return gulp.src('.')
    .pipe(git.add({args: '-A'}))
    .pipe(git.commit('gulp-git'))
    .on('end', function(){
      git.push('origin', 'master', function(err){
        if (err){
          console.log(err);
        }
      });
    });
});


gulp.task('default', ['git']);
