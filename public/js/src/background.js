
$(document).ready(function(){
    var randomImage  = Math.floor( Math.random() * 8 + 1);
    console.log(randomImage);
    $('.hero__image').css('background-image', 'url("../imgs/'+randomImage+'.png")');
})