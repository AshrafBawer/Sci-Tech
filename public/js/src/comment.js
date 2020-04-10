
$('.reply-button').click(function () {
    if ($(this).siblings('.reply-comment').is(':hidden')) {
      $(this).siblings('.reply-comment').slideDown('fast');
    } else {
      $(this).siblings('.reply-comment').slideUp('fast');
    }
});
