function count(){
    $.ajax({
        method: "GET",
        url: "/admin/count"
    }).done(function(res){
        $('.count-posts').find('span').text(res.totalPosts);
        $('.count-comments').find('span.total-comments').text(res.totalComments);
        $('.count-comments').find('span.new-comments').text(res.newComments);
        $('.count-comments').find('span.seen-comments').text(res.seenComments);
        $('.count-quotes').find('span').text(res.totalQuotes);
    });
  }
  
  
  $(document).ready(function(){
    count();
  });
  
  $('.ui.form.create-quote-form').submit(function(e){
    e.preventDefault();
    var author = $(this).find('.quote-author').val();
    var quoteBody = $(this).find('.quote-body').val();
    var quoteImg = $(this).find('.quote-img').val();
    var quote = {author:author, body:quoteBody, img:quoteImg};
    $.ajax({
        method:'POST',
        url:'/admin/quotes',
        data: {quote:quote},
        success: function(msg){
          $('.flash-ajax-message').html('<div class="ui positive message"><i class="close icon"></i><div class="header">'+msg.message+'</div></div>')
        },
        error: function(msg){
          alert(msg.message)
        }
    }).done(function(res){
        $('.ui.form.create-quote-form').find('.quote-author').val('');
        $('.ui.form.create-quote-form').find('.quote-body').val('');
        $('.ui.form.create-quote-form').find('.quote-img').val('');
        count();
    });
  });