
// Time
function timeNow(){

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if(hours < 10){
    hours = '0'+hours;
  }
  if(minutes < 10){
    minutes = '0'+minutes;
  }
  return hours+':'+minutes;
  
}

// Recent History
function recentHistory(){

  var rhhistory = localStorage['rh-history'].split('@');

  var item = '';
  var rh = '';
  var itemsno = localStorage['rh-itemsno']*1;

  for(i=0;i<itemsno;i++){
  
    if(rhhistory[i] !== undefined){
    
      item = rhhistory[i].split(',');
      
      var time = item[0];
      var title = item[1];
      var url = item[2];
      var furl = item[3];
      var furlv = (/^(http|https)\:\/\/(.*)/.test(furl));
      
      if(!furlv){
        if(furl == 'icon16'){
          furl = 'images/icon16.png';
        }else{
          furl = 'images/blank.png';
        }
      }
      
      if(title !== undefined){
        rh += '<span class="item"><span class="time">'+time+'</span><a title="'+title+'" target="_blank" href="'+url+'"><span style="background:url(\''+furl+'\') no-repeat left center;" class="title">'+title+'</span></a></span><br>';
      }
    
    }
  
  }
  
  return rh;

}

// Recent History
function recentlyClosedTabs(){

  var rhhistory = localStorage['rh-historyclosed'].split('@');

  var item = '';
  var rh = '';
  var itemsno = localStorage['rct-itemsno']*1;

  for(i=0;i<itemsno;i++){
  
    if(rhhistory[i] !== undefined){
    
      item = rhhistory[i].split(',');
      
      var time = item[0];
      var title = item[1];
      var url = item[2];
      var furl = item[3];
      var furlv = (/^(http|https)\:\/\/(.*)/.test(furl));
      
      if(!furlv){
        if(furl == 'icon16'){
          furl = 'images/icon16.png';
        }else{
          furl = 'images/blank.png';
        }
      }
      
      if(title !== undefined){
        rh += '<span class="item"><span class="time">'+time+'</span><a title="'+title+'" target="_blank" href="'+url+'"><span style="background:url(\''+furl+'\') no-repeat left center;" class="title">'+title+'</span></a></span><br>';
      }
    
    }
  
  }
  
  return rh;

}

// Main functions
window.addEvent('domready', function(){

  // Options page
  if($('options')){
  
    // Select current options
    $('itemsno').getElement('option[value='+localStorage['rh-itemsno']+']').setProperty('selected','selected');
    $('rctitemsno').getElement('option[value='+localStorage['rct-itemsno']+']').setProperty('selected','selected');
    
    // Save options
    $('save').addEvent('click', function(){
    
      localStorage['rh-itemsno'] = $('itemsno').getSelected().getProperty('value');
      localStorage['rct-itemsno'] = $('rctitemsno').getSelected().getProperty('value');
      
      if(localStorage['rh-itemsno'] == $('itemsno').getSelected().getProperty('value') && localStorage['rct-itemsno'] == $('rctitemsno').getSelected().getProperty('value')){
        alert('Options saved successfully');
      }else{
        alert('Sorry could not save options, please try again');
      }
    
    });
    
    // Clear history
    $('clear').addEvent('click', function(){
    
      localStorage['rh-history'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historyclosed'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      
      var history = localStorage['rh-history'].split('@');
      var historyc = localStorage['rh-historyclosed'].split('@');
      
      if(history.length == 2 && historyc.length == 2){
        alert('History cleared successfully');
      }else{
        alert('Sorry could not clear history, please try again');
      }
    
    });
  
  }
  
  // Popup page
  if($('insert')){
  
    var rctv = localStorage['rct-itemsno'];
    var rh = recentHistory();
    var rct = recentlyClosedTabs();
    var footer = '<span id="showhistoryblock"><a id="showhistorylink" href="#">Show All History</a></span>';
    var tone = '<span class="rhtitle"><span>Recent History</span></span>';
    var ttwo = '<span style="padding-top: 5px;" class="rhtitle"><span>Recently Closed Tabs</span></span>';
    
    if(rctv == 0){
      var rhmain = rh+footer;
    }else if(rctv > 0){
      var rhmain = tone+rh+ttwo+rct+footer;
    }
    
    $('insert').set('html', rhmain);
    
    $('showhistorylink').addEvent('click', function(){
    
      chrome.tabs.create({url: 'chrome://history/'})
    
    });

  }

});