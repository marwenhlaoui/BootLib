var app = require('gulp');
var pug = require('gulp-pug'); 
var cssmin = require('gulp-csso');
var rename = require('gulp-rename'); 
var jsmin = require('gulp-minify');
//var concat = require('gulp-concat');
var sass = require('gulp-sass');
// var app_watch = require('gulp-watch');

var options = require("minimist")(process.argv.slice(2));
  


app.task('run', [ 'html' , 'skins' ,'js']);

app.task( 'skins', [ 'skins-min' , 'skins-complate'  , 'assets' ] );
app.task( 'default', [ 'run' ] );

app.task( 'watch', function(){ 
  /* gulp watch */
  app.watch('build/**/*', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});



/* generate html files from pug files */
app.task('html', function(){
  return app.src(['build/pug/**/*.pug','!build/pug/layout/**/*'])
    .pipe(pug({
      "pretty":true
    }))
    .pipe(app.dest(''))
}); 


/* generate css and skin files from less files */

app.task("skins-min", function () {
    return app.src(['build/less/*.scss','build/less/themes/*.scss'])
      .pipe(sass())
      .pipe(cssmin())
      .pipe(rename({suffix:".min"}))
      .pipe(app.dest('dist/css'))
});
app.task("skins-complate", function () {
    return app.src(['build/less/*.scss','build/less/themes/*.scss'])
      .pipe(sass())
      .pipe(app.dest('dist/css'))
}); 

/* js files */
app.task('js', function() {
  app.src('build/js/*.js')
    .pipe(jsmin({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(app.dest('dist/js'))
});

/* copy assets images */
app.task('assets', function() {
  app.src('build/less/assets/**/*')
    .pipe(app.dest('dist/css/assets'))
});

app.task('new', function(){
  var name = options.name;
  if ((name != undefined)&&(name != "")) {
    //set themes folder & file
    app.src(['build/cmd/template.scss'])
       .pipe(rename({'basename':name}))
       .pipe(app.dest('build/less/themes/')); 
    console.log('[Create file ] : build/less/themes/'+name+'.scss');
    //set download page
    app.src(['build/cmd/download.pug'])
       .pipe(rename({'basename':name}))
       .pipe(app.dest('build/pug/download/'));
    console.log('[Create file ] : build/pug/download/'+name+'.pug');
    //set documentation page
    app.src(['build/cmd/documentation.pug'])
       .pipe(rename({'basename':name}))
       .pipe(app.dest('build/pug/themes/'));
    console.log('[Create file ] : build/pug/themes/'+name+'.pug');
    //set navbar page
    app.src(['build/cmd/navbar.pug'])
       .pipe(rename({'basename':name}))
       .pipe(app.dest('build/pug/layout/includes/navbar/'));
    console.log('[Create file ] : build/pug/layout/includes/navbar/'+name+'.pug');

  }else{
    console.log('[Error !] Template name undefined '); 
  } 
});

 