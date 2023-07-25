
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  var topBtn = $('.pagetop');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  //ドロワーメニュー
  $("#MenuButton").click(function () {
    // $(".l-drawer-menu").toggleClass("is-show");
    // $(".p-drawer-menu").toggleClass("is-show");
    $(".js-drawer-open").toggleClass("open");
    $(".drawer-menu").toggleClass("open");
    $("html").toggleClass("is-fixed");
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });
});

document.addEventListener('DOMContentLoaded',function() {
  var c = document.querySelectorAll('.js-target-btn');
  var common_btn = document.querySelectorAll('.btn');

  common_btn.forEach(btn => {
    btn.addEventListener('mouseenter',function(event) {
      var target_btn_arrow = event.target.querySelector('.btn__arrow');
      target_btn_arrow.classList.add('is-hover');
      });
    });

  common_btn.forEach(btn => {
    btn.addEventListener('mouseleave',function(event) {
      var target_btn_arrow = event.target.querySelector('.btn__arrow');
      target_btn_arrow.classList.remove('is-hover');
    });
  });

  var hamburger_btn = document.querySelector('.hamburger');
  var hamburger_bars = document.querySelector('.hamburger span');
  var drawer_menu = document.querySelector('.drawer-nav');

  hamburger_btn.addEventListener('click',function(){
    if(hamburger_btn.classList.contains('is-click')) {
      this.classList.remove('is-click');
      hamburger_bars.classList.remove('is-click');
      drawer_menu.classList.remove('js-drawer');
      document.body.classList.remove('js-fixed');
    } else {
      this.classList.add('is-click');
      hamburger_bars.classList.add('is-click');
      drawer_menu.classList.add('js-drawer');
      document.body.classList.add('js-fixed');
    }
  });

  const openingTargetLeft = document.querySelector('.js-opening-left');
  const openingTargetRight = document.querySelector('.js-opening-right');
  const openingTargetTitle = document.querySelector('.js-opening-title');
  const mvTargetTitle = document.querySelector('.js-mv-title');
  const slideheader = document.querySelector('.js-slide-down');

  let openingAnimeTL = gsap.timeline({
    onComplete: function() {
      var swiper = new Swiper(".js-mv-swiper", {
        autoplay: {
          delay: 3000,
        },
        loop: true,
        clickable: true,
        effect: 'fade',
        speed: 2000
      });
      document.body.classList.remove('js-fixed');
    }
  });

  openingAnimeTL
  .fromTo(openingTargetTitle,{autoAlpha:1},{autoAlpha:0,delay:.7,duration:.7})
  .to(openingTargetLeft,{y:'-100%',duration:1.2,ease:'power2.out'})
  .to(openingTargetRight,{y:'-100%',duration:1.2,ease:'power2.out'},"<=")
  .fromTo(mvTargetTitle,{autoAlpha:0},{autoAlpha:1,duration:1,},'<=.8')
  .fromTo(slideheader,{y:'-100%'},{y:"0%",duration:1,ease:'power2.out'},"<")


  let textEffectTrigger = document.querySelectorAll('.js-target');
  let textEffectTL = gsap.timeline();
  textEffectTrigger.forEach((trigger)=>{
    let textEffectTL = gsap.timeline();
    let target = trigger.querySelectorAll('.js-effect');
    textEffectTL
    .to(target,{clipPath:'inset(0% 0% 0% 0%)',duration:.5})
    .to(target,{'--effect-clip-path':'inset(0% 100% 0% 0%)',duration:.5})
    ScrollTrigger.create({
        trigger:trigger,
        start:'center bottom',
        animation:textEffectTL,
    })
  });

  const swiper_campaign = new Swiper(".js-swiper-campaign", {
    spaceBetween: 20,
    slidesPerView: 1.25,
    autoplay: true,
    loop: true,
    loopAdditionalSlides: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        spaceBetween: 25,
        slidesPerView: 3.2
      },
      1024: {
        spaceBetween: 33,
        slidesPerView: 3.47
      }
    }
  });
});

// スクロールバー表示時の崩れを防止する
// window.addEventListener('load',function(){
//   setTimeout(function() {
//     const target = document.querySelector('.campaign__wrap');
//     const inner_Width = window.innerWidth;
//     const client_Width = document.body.clientWidth;
//     console.log(client_Width);
//     console.log(inner_Width);
//     if (inner_Width !== client_Width) {
//       target.style.setProperty('--scroll-bar-width', `${inner_Width - client_Width}px`);
//     }
//   }, 4000);
// });

window.addEventListener("scroll", function(){
  const scrollTop = window.pageYOffset;
  if(scrollTop > 80) {
    gsap.to('.scroll-btn',{autoAlpha:1,duration:.5});
  } else {
    gsap.to('.scroll-btn',{autoAlpha:0,duration:.5});
  }
});