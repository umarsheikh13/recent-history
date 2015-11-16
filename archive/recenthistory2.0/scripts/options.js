
document.addEvent('domready', function(){

  // URL Vars

  var vars = getUrlVars();

  if(vars['p'] == undefined){
    $('tab-options-content').setStyle('display', 'block');
    $('tab-options').addClass('tab-current');
  }else{
    $('tab-'+vars['p']+'-content').setStyle('display', 'block');
    $('tab-'+vars['p']).addClass('tab-current');
  }

  // Load tweets
  
  new Element('script', {
    type: 'text/javascript',
    src: 'http://twitter.com/status/user_timeline/RecentHistory_.json?count=10&callback=twitterUpdates'
  }).inject(document.body);

  // Options tabs

  $$('.tab').addEvent('click', function(e){
    e.stop();
    $$('.tab-content').setStyle('display', 'none');
    $$('.tab').removeClass('tab-current');
    $(this.get('id')+'-content').setStyle('display', 'block');
    this.addClass('tab-current');
  });
  
  // Load translated text
  
  loadOptionsLang();
  
  // Load saved options
  
  loadOptions();
  
  // Save options
  
  $('save').addEvent('click', function(){
    saveOptions();
  });
  
  // Sliders
  
  loadSlider('rhitemsno', 0, 30, 'rh-itemsno');
  loadSlider('rctitemsno', 0, 30, 'rct-itemsno');
  loadSlider('mvitemsno', 0, 30, 'mv-itemsno');
  loadSlider('rbitemsno', 0, 30, 'rb-itemsno');
  loadSlider('rhwidth', 225, 800, 'rh-width');

});
