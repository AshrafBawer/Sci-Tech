
$('#search-highlight').hideseek({
    highlight: true
  });


var content = [];

$('.prompt').hideseek();

$('.prompt').on("_after", function() {
    var value = $(this).val();
    $.ajax({
        method: "GET",
        url: '/search/'+value
    }).done(function(res){
        content = [];
        res.forEach(function(post){
            content.push({title: post.title, url:'/blog/'+post._id})
        });
        $('.ui.search')
        .search({
            source: content,
            fields: {
                title: 'title',
                url: 'url'
            },
        });
    });
});



