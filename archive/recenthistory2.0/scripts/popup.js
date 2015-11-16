
document.addEvent('domready', function(){

  // Installed/Updated
  
  if(localStorage['rh-version'] !== getVersion()){
    var notification = webkitNotifications.createHTMLNotification('updated.html');
    notification.show();
    (function(){notification.cancel()}).delay(4000);
    localStorage['rh-version'] = getVersion();
  }
  
  // Ctrl listener
  
  $(document.body).addEvent('keydown', function(e){
    if(e.event.keyCode == 17 && ctrlState == 'false'){
      ctrlState = 'true';
    }
  });
  $(document.body).addEvent('keyup', function(e){
    if(e.event.keyCode == 17){
      ctrlState = 'false';
    }
  });
  
  // Popup structure
  
  var rhporder = localStorage['rh-list-order'].split(',');
  
  for(var o in rhporder){
    if(rhporder[o] == 'rh-order'){
      if((localStorage['rh-itemsno']*1) > 0){
        new Element('div', {id: 'rh-inject', html: '<div id="rh-inject-title" class="popup-title"><span>'+returnLang('recentHistory')+'</span><a onclick="uiEditItems(\'rh\')" href="javascript:void(0);"></a></div>'}).inject('popup-insert', 'bottom');
      }
    }else if(rhporder[o] == 'rct-order'){
      if((localStorage['rct-itemsno']*1) > 0 && chrome.extension.getBackgroundPage().closedTabs.length > 0){
        new Element('div', {id: 'rct-inject', html: '<div id="rct-inject-title" class="popup-title"><span>'+returnLang('recentlyClosedTabs')+'</span><a onclick="uiEditItems(\'rct\')" href="javascript:void(0);"></a></div>'}).inject('popup-insert', 'bottom');
      }
    }else if(rhporder[o] == 'rb-order'){
      if((localStorage['rb-itemsno']*1) > 0){
        new Element('div', {id: 'rb-inject', html: '<div id="rb-inject-title" class="popup-title"><span>'+returnLang('recentBookmarks')+'</span><a onclick="uiEditItems(\'rb\')" href="javascript:void(0);"></a></div>'}).inject('popup-insert', 'bottom');
      }
    }else if(rhporder[o] == 'mv-order'){
      if((localStorage['mv-itemsno']*1) > 0){
        new Element('div', {id: 'mv-inject', html: '<div id="mv-inject-title" class="popup-title"><span>'+returnLang('mostVisited')+'</span><a onclick="uiEditItems(\'mv\')" href="javascript:void(0);"></a></div>'}).inject('popup-insert', 'bottom');
      }
    }else if(rhporder[o] == 'pinned-order'){
      if(localStorage['rh-pinned'] !== 'false'){
        var piss = {'display': 'inline'};
      }else{
        var piss = {'display': 'none'};
      }
      new Element('div', {id: 'pi-inject', styles: piss, html: '<div id="pi-inject-title" class="popup-title"><span>'+returnLang('pinned')+'</span><a onclick="uiEditItems(\'pi\')" href="javascript:void(0);"></a></div>'}).inject('popup-insert', 'bottom');
    }
  }
  
  // Popup init
  
  // -- Insert
  (function(){
  if($('rh-inject')){recentHistory();}
  if($('rct-inject')){recentlyClosedTabs();}
  if($('rb-inject')){recentBookmarks();}
  if($('mv-inject')){mostVisited();}
  if($('pi-inject')){pinned();}
  }).delay(10);
  
  // -- Width
  $(document.body).setStyle('width', localStorage['rh-width']);
  
  // -- Titles
  $$('.popup-title').each(function(el,i){
    if(i !== 0){
      el.setStyle('margin-top', '6px');
    }
  });
  
  // -- Search
  if(localStorage['rh-search'] == 'yes'){
    $('popup-search-input').addEvent('keyup', function(){
      var sv = this.get('value');
      if(sv.length > 2){
        popupSearch(sv);
        $('popup-insert').setStyle('display', 'none');
        $('popup-search-insert').setStyle('display', 'block');
      }else{
        $('popup-insert').setStyle('display', 'block');
        $('popup-search-insert').setStyle('display', 'none');
      }
    });
    $('popup-search-clear').addEvent('click', function(){
      $('popup-search-input').set('value', '');
      $('popup-search-input').focus();
      $('popup-insert').setStyle('display', 'block');
      $('popup-search-insert').setStyle('display', 'none');
      $('popup-search-insert').set('text', '');
    });
    $('popup-search-input').focus();
  }else{
    $('popup-header').setStyle('display', 'none');
    if($$('.popup-title').length > 0){
      $$('.popup-title')[0].setStyle('margin-top', '10px');
    }
  }

});
