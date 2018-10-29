function getPosts(uri){
    $.ajax({ 
        url: 'http://localhost:3000/facebook/posts'
        , type: 'post'
        , contentType: 'application/json'
        , data: JSON.stringify({ "url": uri })
        , dataType: 'html'
    })
    .done(function(data) {
        $('#videos').html(data);
    })
    .fail(function() {
        console.log("Something went wrong!");
    });
}