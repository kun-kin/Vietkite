$('#slider, #sliderm').owlCarousel({
    loop: true,
    dots: false,
    nav: false,
    margin: 10,
    navText: ['', ''],
    autoplay: true,
    // center:true,
    responsive: {
        100: {
            items: 1,
            nav: false,
            margin: 0
        },
        370: {
            items: 1,
            nav: false,
        }
    }
});

$('.servicetype-slider').owlCarousel({
    loop: true,
    dots: false,
    nav: true,
    margin: 15,
    navText: ['', ''],
    autoplay: true,
    // center:true,
    navText: ["<i class='fa-sharp fa-solid fa-chevron-left'></i>", "<i class='fa-sharp fa-solid fa-chevron-right'></i>"],
    responsive: {
        100: {
            items: 1,
            nav: false,
            margin: 0
        },
        270: {
            items: 2
        },
        580: {
            items: 4
        },
        768: {
            items: 6
        },
        992: {
            items: 6
        }
    }
});

$('.detail-tour-info__slider').owlCarousel({
    loop: true,
    dots: true,
    nav: false,
    margin: 10,
    navText: ['', ''],
    autoplay: true,
    // center:true,
    responsive: {
        100: {
            items: 1,
            nav: false,
            margin: 0
        }
    }
});