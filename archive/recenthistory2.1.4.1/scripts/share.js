
document.addEvent('domready', function(){

  // URL Vars

  var vars = getUrlVars();
  vars = ('title='+vars['title']+'&url='+vars['url']).parseQueryString();
  
  $$('#wrapper a').each(function(el){
    el.set('href', el.get('href').replace('{url}', vars.url).replace('{title}', vars.title.replace(/\"/g, '')));
  });
  $('share-title').set('text', vars.title);
  $('share-url').set('text', truncate(vars.url, 0, 50));
  
  // Tips
  
  new Tips('.sb');

});
