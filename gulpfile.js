//依赖
var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // 监听刷新
var reload = browserSync.reload;
var proxy = require('http-proxy-middleware'); // http请求代理
var cleancss = require('gulp-clean-css'); // CSS压缩
var postcss = require('gulp-postcss');
var comments = require('postcss-discard-comments');
var autoprefixer = require('autoprefixer'); // css自动前缀
var fileinclude = require('gulp-file-include'); // 文件引用
var uglify = require('gulp-uglify'); // js压缩
var stripDebug = require('gulp-strip-debug'); // 去除debug代码
var clean = require('gulp-clean'); // 清空文件夹
var imagemin = require('gulp-imagemin'); // 压缩图片
var rev = require('gulp-rev-append'); // 添加hash版本号
var htmlmin = require('gulp-htmlmin'); // 压缩html
var babel = require('gulp-babel'); // ES6转ES5
var replace = require('gulp-replace');
var plumber = require('gulp-plumber'); // 错误处理
var notify = require('gulp-notify'); // 消息提示

/* 开发构建流程 */

gulp.task('style:dev', () => {
  gulp.src('src/styles/**/*.css', { base: 'src' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({
      stream: true // 热替换
    }));
});

// 转译ES6并输出
gulp.task('script:dev', () => {
  gulp.src('src/scripts/**/*.js', { base: 'src' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(babel({
      presets: ['es2015']
    })) // ES6转ES5
    .pipe(gulp.dest('dist/'));
});

// 编译HTML文件并输出
gulp.task('html:dev', () => {
  gulp.src(['src/index.html'])
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(gulp.dest('dist/'));
  gulp.src(['src/views/*.html'])
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(fileinclude({
      prefix: '@@', // 引用文件前缀
      basepath: 'src/templates/' // 模板文件路径
    }))
    .pipe(rev()) // 添加版本号==>?rev=@@hash
    .pipe(gulp.dest('dist/views/'));
});

// 拷贝静态资源
gulp.task('static:dev', () => {
  gulp.src(['src/lib/**/*', 'src/fonts/**/*', 'src/images/*.{png,jpg,gif,ico}'], { base: 'src' })
  .pipe(plumber({
    errorHandler: errorAlert
  }))
  .pipe(gulp.dest('dist/'));
});

// 开发构建
var apiProxy = proxy('/api', {
  target: 'http://localhost:9090/otc-web/',
  changeOrigin: true,
});
gulp.task('dev', ['style:dev', 'script:dev', 'html:dev', 'static:dev'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      port: 3000,
      middleware: [apiProxy],
    },
    notify: false // 开启静默模式
  });
  // 使用gulp的文件监听功能，来实时编译修改过后的文件
  gulp.watch('src/styles/**/*.css', ['style:dev']);
  gulp.watch('src/scripts/**/*.js', ['script:dev']).on('change', reload);
  gulp.watch('src/**/*.html', ['html:dev']).on('change', reload);
  gulp.watch(['src/lib/**/*', 'src/fonts/**/*', 'src/images/**/*'], ['static:dev']).on('change', reload);
});

/* 生产构建流程 */
// 补全并压缩css
gulp.task('style', () => {
  gulp.src('src/styles/**/*.css', { base: 'src' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(postcss(
      [
        autoprefixer({
          browsers: ['cover 99% in SA'], // 浏览器兼容列表
          cascade: true, // 是否显示层级格式
          remove: true // 移除无用的样式
        }),
        comments() // 去除注释
      ]))
    .pipe(cleancss({ debug: true })) // 压缩css
    .pipe(gulp.dest('release'));
});

// 压缩javascript
gulp.task('script', () => {
  var ajaxProductionUrl = "API_URL = 'https://cnodejs.com'";
  gulp.src('src/scripts/**/*.js', { base: 'src' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    // 将axios中的请求地址替换为生产环境的地址并写入
    .pipe(replace("API_URL = '/'", ajaxProductionUrl))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(stripDebug()) // 删除调试信息
    .pipe(uglify()) // 压缩js
    .pipe(gulp.dest('release'));
  });

// 压缩HTML
gulp.task('html', () => {
  gulp.src('src/views/**/*.html', { base: 'src' })
    .pipe(fileinclude({
      prefix: '@@', // 引用文件前缀
      basepath: './src/templates/' // 模板文件路径
    }))
    .pipe(rev()) // 添加版本号==>?rev=@@hash
    .pipe(htmlmin({
      removeComments: true, // 清除HTML注释
      collapseWhitespace: true, // 压缩HTML
      collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
      minifyJS: true, // 压缩页面JS
      minifyCSS: true // 压缩页面CSS
    }))
    .pipe(gulp.dest('release/'));
});

// 压缩图片
gulp.task('image', () => {
  gulp.src('src/images/*.{png,jpg,gif,ico}', { base: 'src' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    // 图片压缩
    .pipe(imagemin({
      optimizationLevel: 5, // 类型：Number,默认：3,取值范围：0-7（优化等级）
      progressive: true, // 类型：Boolean,默认：false,无损压缩jpg图片
      interlaced: true, // 类型：Boolean,默认：false,隔行扫描gif进行渲染
      multipass: true // 类型：Boolean,默认：false,多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('release/'));
});

// 拷贝静态资源
gulp.task('static', () => {
  gulp.src(['src/lib/**/*', 'src/fonts/**/*'], { base: 'src' })
  .pipe(plumber({
    errorHandler: errorAlert
  }))
  .pipe(gulp.dest('release'));
});

// 生产构建
gulp.task('build', ['style', 'script', 'html', 'image', 'static']);

// 清空图片、样式、js
gulp.task('clean', () => {
  gulp.src(['./dist', './release'], {
      read: false // 不读取文件内容
    })
    .pipe(clean({
      force: true // 强制清除已build的文件
    }));
});

// 错误提示
function errorAlert(error) {
  notify.onError({
    title: 'Error in plugin "' + error.plugin + '"',
    message: 'Check your terminal',
    sound: 'Sosumi'
  })(error);
  console.log(error.toString());
}
