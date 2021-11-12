$(function(){

  new Swiper(".service-swiper .swiper-container",{
    effect:'coverflow',
    // autoplay: true,
    loop:true,
    slidesPerView:2.5,
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



  $(".main-nav .menu-link").click(function(){
    $("html,body").animate({
      scrollTop:$($(this).attr("href")).offset().top-75 + "px"
    },500)
  });


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

    $(".cntl").cntl({
      revealbefore: 300,
      anim_class: "cntl-animate",
      onreveal: function (e) {
        console.log(e);
      },
    });
  
})