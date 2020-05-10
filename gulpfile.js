const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');

// 生成px
const pxSprite = () => {
  return gulp.src('images/**/*.png')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      })
    ).pipe(gulp.dest('./'));
};
// 生成 rem  px / 2 / 16
const remSprite = () => {
  return gulp.src('images/**/*.png')
    .pipe(spritesmith({
      imgName: 'rem_sprite.png',
      cssName: 'rem_sprite.scss',
      cssTemplate: (data) => {
        let arr = []
        // let url = (img) => `url('${img}')`
        let url = (img) => `background-image('/flashSale/list/${img}')`
        let process_url = url
        let px2rem = (px, base = 16, retio = 2) => `${parseFloat(px) / retio / base}rem`
        let rem = (px) => `px2rem(${parseFloat(px)})`
        let process = rem
        data.sprites.forEach((sprite) => {
          arr.push(`
          .icon-${sprite.name} {
            background-image: ${process_url(sprite.escaped_image)};
            background-size: ${process(sprite.px.total_width)} ${process(sprite.px.total_height)};
            background-position: ${process(sprite.px.offset_x)} ${process(sprite.px.offset_y)};
            width: ${process(sprite.px.width)};
            height: ${process(sprite.px.height)};
          }
          `)
        })
        return arr.join("")
      }
    }))
    .pipe(gulp.dest('./'));
}

exports.px = pxSprite
exports.rem = remSprite
exports.default = remSprite
