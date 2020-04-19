
$('#contact-form').submit(function(e){
    e.preventDefault();
    var name = $(this).find('.contact-name').val();
    var email = $(this).find('.contact-email').val();
    var message = $(this).find('.contact-message').val();
    
    $.ajax({
        method:'post',
        url: '/contact',
        data: {name:name, email:email, message:message},
        success: function(msg){
            $('.flash-ajax-message').html('<div class="ui positive message"><i class="close icon"></i><div class="header">You email was successfully sent.</div></div>')
        },
        error: function(msg){
            $('.flash-ajax-message').html('<div class="ui negative message"><i class="close icon"></i><div class="header">Something went wront. try again later.</div></div>')
        }
    }).done(function(res){       
        $('#contact-form').find('.contact-name').val("");
        $('#contact-form').find('.contact-email').val("");
        $('#contact-form').find('.contact-message').val("");
    });
    
});

$(document).ajaxStart(function() {
    $('#contact-form').find('.ui.active.dimmer').removeClass('hideLoader');  
    $('#contact-form').find('.ui.active.dimmer').addClass('showLoader');  
});

$(document).ajaxStop(function() {
    $('#contact-form').find('.ui.active.dimmer').addClass('hideLoader');  
    $('#contact-form').find('.ui.active.dimmer').removeClass('showLoader');  
});

