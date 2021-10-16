$(function(){

  new Swiper(".service-swiper .swiper-container",{
    effect:'coverflow',
    loop:true,
    slidesPerView:4.5,
    centeredSlides:true,
    coverflowEffect:{
      rotate:0,
      stretch:0,
      depth:65,
      modifier:1,
      slideShadows:false
    },
    navigation:{
      prevEl:".service-swiper .swiper-button-prev",
      nextEl:".service-swiper .swiper-button-next"
    }
  });

  var showcaseGallerySwiper = new Swiper(".showcase-gallery .swiper-container",{
    direction:"vertical",
    loop:true,
    allowTouchMove:false,
  });

  var showcaseThumbsSwiper = new Swiper(".showcase-thumbs .swiper-container",{
    direction:"vertical",
    loop:true,
    centeredSlides:true,
    spaceBetween:13,
    slidesPerView:3,
    watchSlidesVisibility:true,
    watchSlidesProgress:true,
    allowTouchMove:false,
    thumbs:{
      swiper:showcaseGallerySwiper
    },
    navigation:{
      prevEl:".showcase-thumbs .swiper-button-prev",
      nextEl:".showcase-thumbs .swiper-button-next"
    }
  });

  $(".menu-box .menu-link").click(function(){
    $("html,body").animate({
      scrollTop:$($(this).attr("href")).offset().top-75 + "px"
    },500)
  });

  function StrengthsCount(){
    var isplay = true;
    var boxTop = $(".strengths-num").offset().top;
    var id, decimals, startval, endval, duration;
    $(window).scroll(function(){
      var sT = $(window).scrollTop();
      // console.log($(window).height()/2)
      if(sT > (boxTop-($(window).height()/1.5)) && sT < boxTop && isplay){
        $(".strengths-num .num").each(function(){
          id = $(this).attr("id");
          decimals = $(this).data("decimals");
          startval = $(this).data("startval");
          endval = $(this).data("endval");
          duration = $(this).data("duration");
          
          new CountUp(id, startval, endval, decimals, duration, {
            useEasing:true,
            separator:''
          }).start();
          isplay = false;
        })
      }
    })
  }

  setTimeout(function(){
    StrengthsCount();
  },1000);
  function scrollDis(){
    if($(window).scrollTop()>40){
      $(".header-box").addClass("fixed");
    } else {
      $(".header-box").removeClass("fixed");
    }
  }
  scrollDis();
  $(window).scroll(function(){
    scrollDis();
  });

  new Vue({
    el: '#partner-list',
    data: {
      list: [
        {
          src: "https://bkimg.cdn.bcebos.com/pic/e850352ac65c1038f34249cbbd119313b07e89ff?x-bce-process=image/resize,m_lfit,w_536,limit_1/format,f_jpg",
          alt: "合作伙伴"
        },
        {
          src: "https://pic2.zhimg.com/v2-cadc4d4dc0690e996b679064cd5e972f_1440w.jpg?source=172ae18b",
          alt: "合作伙伴"
        }
      ]
    }
  })
})