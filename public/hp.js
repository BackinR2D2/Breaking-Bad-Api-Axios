const btn = $('#button');
const btsBtn = document.querySelector('.btsBtn');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btsBtn.addEventListener('click', () => {
    window.location.href = '/search';
})