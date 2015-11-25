;(function($){
  $(function(){
    $('.markdown-body pre').addClass("prettyprint linenums");
    window.prettyPrint && prettyPrint();
  });

  var $recent_list = $('ul.recent-articles-list');
  if($recent_list.length){
    $.getJSON('/articles/recent.json', function(articles){
      var html = [];
      articles.forEach(function(article){
        html.push('<li><a href="/articles/'+ article._id +'">'+ article.title +'</a></li>');
      });
      $recent_list.html(html);
    });
  }
})(jQuery);