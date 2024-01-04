$(window).scroll(function() {
    var headerHeight = $(".header").outerHeight();
    // kiểm tra điều kiện > header thì mới addClass 
    if ($(window).scrollTop() > headerHeight) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }

    //scroll to div
    // if ($(this).scrollTop() >= $('.navigator').offset().top) {
    //     $('.navigator-container').addClass('fixed');
    //     $('.navigator-logo').show();
    // } else {
    //     $('.navigator-container').removeClass('fixed');
    //     $('.navigator-logo').hide();
    // }
});


/* back to top */
var btn = $('#backtotop');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '1000');
});



$(document).ready(function() {


    //toggle bar
    $(".nav .nav-toggle").click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('body').toggleClass('ov-hidden');
        $('.nav-menu').toggleClass('opened').slideToggle();
        if (!$('.nav-menu').hasClass('opened')) {
            $('.menu-link').removeClass('active');
            $('.submenu').removeClass('open');
        }
    });


    $(".has-submenu .menu-link").click(function() {
        $(this).toggleClass('active');
        // $(this).parent('.has-submenu').children('.submenu').slideToggle();
        $(this).parent('.has-submenu').children('.submenu').toggleClass('open');
    });







    $(".hasDatepicker").flatpickr({
        dateFormat: "d/m/Y"
    });
    $("#check-in").flatpickr({
        dateFormat: "d/m/Y"
    });
    $("#check-out").flatpickr({
        dateFormat: "d/m/Y"
    });


    $(".list-group-item").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var id = $(this).attr('data-id');
        $('.detail-tour-tab-content__item').removeClass("active");
        $('.detail-tour-tab-content__item[id=' + id + ']').addClass('active');

        $('#modaltomtat').modal('hide');

        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $('.detail-tour-tab-content__item').offset().top - 60,
            }, 900);

        }, 200);

        return false;
    });
    $('.showhide a').click(function() {
        $(this).parents('.tour-schedule-content').find('.detail').toggleClass('show');
        $(this).parents('.showhide').toggleClass('show');
        return false;
    });


    // $('.selectpicker').select2();

    // $(document).mouseup(function(e) {
    //     if ($(e.target).closest(".popup-search").length ===
    //         0) {
    //         $('.popup-search').hide();
    //     }
    // });





});

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

$(document).ready(function() {
    // Mục lục

    // Lấy tất cả các heading trong bài viết
    const headings = document.querySelectorAll('.detail-blog-content h1, .detail-blog-content h2, .detail-blog-content h3, .detail-blog-content h4, .detail-blog-content h5, .detail-blog-content h6')
    if (headings.length === 0) return

    // Khai bào nơi mà TOC sẽ được chèn vào
    const tocContainer = document.querySelector('#toc')

    // Xác định cấp độ bắt đầu của TOC (bởi vì không phải bài viết nào cũng có thẻ H1, hoặc H2)
    const startingLevel = headings[0].tagName[1]

    // Tạo TOC rỗng
    const toc = document.createElement('ul')

    // Theo dõi các cấp độ heading trước đó
    const prevLevels = [0, 0, 0, 0, 0, 0]

    // Lặp qua từng heading và thêm chúng vào TOC
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]
        const level = parseInt(heading.tagName[1])

        // Tăng các cấp độ trước đó lên đến cấp độ hiện tại
        prevLevels[level - 1]++
            for (let j = level; j < prevLevels.length; j++) {
                prevLevels[j] = 0
            }

        // Tạo số mục cho mục đó dựa trên các cấp độ trước đó
        // và loại bỏ số 0 nếu trường hợp h1 -> h3 (không có h2)
        // Sẽ tạo ra các đề mục ví dụ như:
        // 1. Heading h1a
        //     1.1 Heading h2
        // 2. Heading h1b
        //          2.1 Heading h3 (đẹp hơn 2.0.1 Heading h3)
        const sectionNumber = prevLevels.slice(startingLevel - 1, level).join('.').replace(/\.0/g, "")

        // Tạo ID mới và gán vào heading
        // Phải làm phần này để click vào mục lục có thể di chuyển đến được.
        const newHeadingId = `${heading.textContent.toLowerCase().replace(/ /g, '-')}`
        heading.id = newHeadingId

        // Tạo liên kết mục cho heading
        const anchor = document.createElement('a')
        anchor.setAttribute('href', `#${newHeadingId}`)
        anchor.textContent = heading.textContent

        // Thêm event listener để cuộn đến liên kết khi nhấp chuột
        anchor.addEventListener('click', (event) => {
            event.preventDefault()
            const targetId = event.target.getAttribute('href').slice(1)
            const targetElement = document.getElementById(targetId)
            targetElement.scrollIntoView({ behavior: 'smooth' })
                // Thêm anchor vào URL khi click
            history.pushState(null, null, `#${targetId}`)
        })

        // Tạo thẻ <li> để thêm vào TOC
        const listItem = document.createElement('li')
        listItem.textContent = sectionNumber
        listItem.appendChild(anchor)

        // Thêm CSS class cho từng mục lục
        // Ví dụ "toc-item toc-h1", "toc-item toc-h2"
        const className = `toc-${heading.tagName.toLowerCase()}`
        listItem.classList.add('toc-item')
        listItem.classList.add(className)

        // Bỏ thẻ <li> vừa tạo vào TOC
        toc.appendChild(listItem)
    }

    // Thêm các TOC item vào toc contaner
    tocContainer.innerHTML = ''
    tocContainer.appendChild(toc)

    // Thêm event listener cho window object để lắng nghe sự kiện scroll
    window.addEventListener('scroll', function() {
        let scroll = window.scrollY // Lấy giá trị scrollY của màn hình
        let height = window.innerHeight //Lấy chiều cao của màn hình
        let offset = 200

        headings.forEach(function(heading, index) {
            let i = index + 1
            let target = document.querySelector('#toc li:nth-of-type(' + i + ') > a') // Lấy phần tử target dựa trên số thứ tự
            let pos = heading.getBoundingClientRect().top + scroll // Lấy vị trí của heading
            if (!target) return

            // Nếu scroll lớn hơn vị trí của phần tử hiện tại trừ đi chiều cao màn hình cộng với offset
            if (scroll > pos - height + offset) { // Nếu cuộn quá vị trí của heading
                // Nếu phần tử tiếp theo tồn tại (không phải là phần tử cuối cùng)
                if (headings[index + 1] !== undefined) {
                    // Lấy vị trí của phần tử tiếp theo
                    let next_pos = headings[index + 1].getBoundingClientRect().top + scroll
                        // Nếu scroll vượt qua vị trí của phần tử tiếp theo
                    if (scroll > next_pos - height + offset) {
                        target.classList.remove('toc-active')
                    } else if (i === 1 && tocContainer.classList.contains('active') === false) { // Phần tử đầu tiên
                        target.classList.add('toc-active')
                        tocContainer.classList.add('active')
                    } else { // Nếu không có phần tử tiếp theo trong danh sách heading
                        target.classList.add('toc-active')
                    }
                } else { //Nếu là heading cuối cùng
                    target.classList.add('toc-active')
                }
            } else { // Nếu scroll không vượt qua heading
                target.classList.remove('toc-active')
                if (i === 1 && tocContainer.classList.contains('active')) { // Nếu chưa cuộn đến heading đầu tiên
                    tocContainer.classList.remove('active')
                }
            }
        })
    })
})