var scrollingAnimations = $('body').data("scrolling-animations");
	if(scrollingAnimations){
		new WOW().init();
	}
$('.morepage_carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});			



