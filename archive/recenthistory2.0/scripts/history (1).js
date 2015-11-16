
document.addEvent('domready', function(){
  
  // Language
  
  $('delete-button').set('value', returnLang('deleteItems'));
  
  // Toggle grouping
  
  if(localStorage['rh-group'] == 'no'){
    $('rh-bar-group').setStyle('background-position', 'right center');
  }
  $('rh-bar-group').addEvent('click', function(){
    var rhgv = localStorage['rh-group'];
    if(rhgv == 'yes'){
      $('rh-bar-group').setStyle('background-position', 'right center');
      localStorage['rh-group'] = 'no';
    }else if(rhgv == 'no'){
      $('rh-bar-group').setStyle('background-position', 'left center');
      localStorage['rh-group'] = 'yes';
    }
    var gahv = getActiveHistory();
    if(gahv == 'history'){
      history('yes', '');
    }else if(gahv == 'search'){
      var gahviv = $('rh-search').get('value');
      if(gahviv.length > 0){
        history('search', gahviv);
      }else{
        history('yes', '');
      }
    }
  });
  
  // Scroll events
  
  window.addEvent('scroll', function(){
    var wcv = (this.getScroll().y)*1;
    if(wcv > 115){
      $('calendar').setStyles({
        'position': 'fixed',
        'top': '15px'
      });
    }else{
      $('calendar').setStyles({
        'position': 'absolute',
        'top': '129px'
      });
    }
  });
  
  // Shift listener
  
  $(document.body).addEvent('keydown', function(e){
    if(e.event.keyCode == 16 && shiftState == 'false'){
      shiftState = 'true';
    }
  });
  $(document.body).addEvent('keyup', function(e){
    if(e.event.keyCode == 16){
      shiftState = 'false';
    }
  });
  
  // Date events
  
  if(localStorage['rh-date'] == 'dd/mm/yyyy'){
    $('dsdi').set('html', '<select id="date-select-day"></select>');
    $('dsmi').set('html', '<select id="date-select-month"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>');
  }else if(localStorage['rh-date'] == 'mm/dd/yyyy'){
    $('dsmi').set('html', '<select id="date-select-day"></select>');
    $('dsdi').set('html', '<select id="date-select-month"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>');
  }
  
  $('date-select-day').addEvent('change', function(){
    calendar('selected', '');
    history('yes', '');
  });
  $('date-select-month').addEvent('change', function(){
    calendar('selected', '');
    history('yes', '');
  });
  $('date-select-year').addEvent('change', function(){
    calendar('selected', '');
    history('yes', '');
  });
  
  // Calendar init
  
  calendar('current', '');
  history('current', '');
  
  // Search events
  
  $('rh-what').addEvent('change', function(){
    var sv = $('rh-search').get('value');
    if(sv.length > 2){
      history('search', sv);
    }
  });
  $('rh-search').addEvent('keyup', function(){
    var sv = this.get('value');
    if(sv.length > 2){
      history('search', sv);
      $('rh-views-insert').setStyle('display', 'none');
      $('rh-views-search-insert').setStyle('display', 'block');
    }else{
      $('rh-views-insert').setStyle('display', 'block');
      $('rh-views-search-insert').setStyle('display', 'none');
    }
  });
  $('rh-clear-search').addEvent('click', function(){
    $('rh-search').set('value', '');
    $('rh-search').focus();
    $('rh-views-insert').setStyle('display', 'block');
    $('rh-views-search-insert').setStyle('display', 'none');
    $('rh-views-search-insert').set('text', '');
    $(document.body).getElement('#rh-bar-uione input').set('checked', false);
  });
  $('rh-search').focus();

});
