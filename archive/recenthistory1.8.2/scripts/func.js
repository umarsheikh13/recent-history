/*
 * Copyright (c) 2010 Umar Sheikh
 *
 * This Google Chrome extension, Recent History, was made 
 * to be useful to users who want to access their history
 * in a better way. No warranty is expressed or implied 
 * and I accept no liability for any damages that may 
 * ensue from the usage of this extension.
 *
 * Attribution-Noncommercial-No Derivative Works 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-nd/3.0/
 *
 */

// Version

var versionNo = '1.8.2';


// Google Analytics

if(window.navigator.platform == 'Win32'){
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16300412-1']);
  _gaq.push(['_trackPageview']);

  (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = 'https://ssl.google-analytics.com/ga.js';
   (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
  })();
}


// Sort object

function sortByValue(keyArray, valueMap){
  return keyArray.sort(function(a,b){return valueMap[a]-valueMap[b];}).reverse();
}


// Get domain name

function getDomain(url){
  var rurl = '';
  var rxp = /(http|https)\:\/\/(.*?)\//;
  var urlt = rxp.test(url);
  if(urlt){
    rurl = url.match(rxp)[0];
    return rurl;
  }else{
    return 'undefined';
  }
}


// Truncate

function truncate(str, ind, lng){
  if(str.length > lng){
    return str.substring(ind, lng)+'...'
  }else{
    return str.substring(ind, lng);
  }
}


// Options number check

function checkON(el, one, two){
  var n = el.getProperty('value');
  if(n < one || n > two){
    alert(one+'-'+two);
    el.setProperty('value', one);
  }
}


// Copy text

Clipboard = {};
Clipboard.utilities = {};
Clipboard.utilities.createTextArea = function(value){
  var txt = document.createElement('textarea');
  txt.style.position = "absolute";
  txt.style.left = "-100%";
  if(value != null)
    txt.value = value;
  document.body.appendChild(txt);
  return txt;
};
Clipboard.copy = function(data){
  if(data == null) return;
  var txt = Clipboard.utilities.createTextArea(data);
  txt.select();
  document.execCommand('Copy');
  document.body.removeChild(txt);
  return false;
};


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


// Options language

function optionsLangText(){

  $$('label[for=itemsno]').set('text', chrome.i18n.getMessage("recentHistory"));
  $$('label[for=rctitemsno]').set('text', chrome.i18n.getMessage("recentlyClosedTabs"));
  $$('label[for=mvitemsno]').set('text', chrome.i18n.getMessage("mostVisited"));
  $$('label[for=rhtime]').set('text', chrome.i18n.getMessage("time"));
  $$('label[for=rhdate]').set('text', chrome.i18n.getMessage("date"));
  $('save').setProperty('value', chrome.i18n.getMessage("save"));
  $$('option[value=yes]').set('text', chrome.i18n.getMessage("yes"));
  $$('option[value=no]').set('text', chrome.i18n.getMessage("no"));
  $$('label[for=rhwidth]').set('text', chrome.i18n.getMessage("width"));
  $$('label[for=rhsearch]').set('text', chrome.i18n.getMessage("search"));
  $('rhlistordertitle').set('text', chrome.i18n.getMessage("order"));
  $('rh-order').set('text', chrome.i18n.getMessage("recentHistory"));
  $('rct-order').set('text', chrome.i18n.getMessage("recentlyClosedTabs"));
  $('mv-order').set('text', chrome.i18n.getMessage("mostVisited"));
  $('rb-order').set('text', chrome.i18n.getMessage("recentBookmarks"));

}


// Recent History

function recentHistory(){

  var rh = '';

  chrome.history.search({text: '', maxResults: localStorage['rh-itemsno']*1}, function(hi){
  
    if(hi.length > 0){
    
      for(i=0;i<=hi.length;i++){
      
        if(hi[i] !== undefined){
      
          var currentTime = new Date(hi[i].lastVisitTime);
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          if(hours < 10){hours = '0'+hours;}
          if(minutes < 10){minutes = '0'+minutes;}
          var time = hours+':'+minutes;
        
          var title = hi[i].title;
          var url = hi[i].url;
          var furl = getDomain(hi[i].url)+'favicon.ico';
          
          if(title == ''){
            title = url;
          }
          
          rh += '<a oncontextmenu="Clipboard.copy(\''+url+'\')" class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
          rh += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
          rh += title.replace(/\<br \/\>/g, '');
          rh += '</span>';
          rh += '</a>';

        }

      }
      
      $('rh-inject').set('html', rh);
      if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
    
    }

  });

}


// Recently Closed Tabs

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
      var urlv = (/\:[0-9]/.test(furl));
      
      if(!furlv){
        if(furl == 'icon16'){
          furl = 'images/icon16-other.png';
        }else{
          furl = 'images/blank.png';
        }
      }else{
        if(urlv){
          furl = 'images/blank.png';
        }
      }
      
      if(title !== undefined){
        rh += '<a oncontextmenu="Clipboard.copy(\''+url+'\')" class="item" target="_blank" href="'+url+'">';
        rh += '<span class="time">'+time+'</span>';
        rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
        rh += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
        rh += title.replace(/\<br \/\>/g, '');
        rh += '</span>';
        rh += '</a>';
      }
    
    }
  
  }
  
  $('rct-inject').set('html', rh);

}


// Most Visited

function mostVisited(){

  var mv = '';

  chrome.history.search({text: '', maxResults: 100}, function(hi){
  
    var item = '';
    var dn = '';
    var mva = [];
    var mve = [];
    var mvo = {};
  
    if(hi.length > 0){
    
      for(i=0;i<=hi.length;i++){
      
        if(hi[i] !== undefined){
      
          var currentTime = new Date(hi[i].lastVisitTime);
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          if(hours < 10){hours = '0'+hours;}
          if(minutes < 10){minutes = '0'+minutes;}
          var time = hours+':'+minutes;
        
          var title = getDomain(hi[i].url);
          title = title.replace('http://','');
          title = title.replace('https://','');
          title = title.replace('/','');
          var url = getDomain(hi[i].url);
          var furl = getDomain(hi[i].url)+'favicon.ico';
          
          if(mvo[title]){
            mvo[title] = mvo[title]*1+1;
          }else{
            mvo[title] = 1;
            mva.push(title);
            mve.push(time+'|'+title+'|'+furl+'|'+url);
          }

        }

      }
      
      var mvitemsno = localStorage['mv-itemsno'];
      var mvl = sortByValue(mva, mvo);
      var mvis = '';
      var mvtime = '';
      var mvburl = '';
      var mvaurl = '';
      var mvfurl = '';
      var mv = '';
      
      if(mvitemsno > mvl.length){
        mvitemsno = mvl.length;
      }
      
      for(ii=0;ii<mvitemsno;ii++){
        
        for(var iii in mve){
          if(mve[iii].split('|')[1] == mvl[ii]){
            mvis = mve[iii].split('|');
            mvtime = mvis[0];
            mvburl = mvis[3];
            mvaurl = mvis[1].replace('www.','');
            mvfurl = mvis[2];
            break;
          }
        }
        
        mv += '<a oncontextmenu="Clipboard.copy(\''+mvburl+'\')" class="item" target="_blank" href="'+mvburl+'">';
        mv += '<span class="time">'+mvtime+'</span>';
        mv += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+mvfurl+'">';
        mv += '<span title="'+mvburl+'" class="title">';
        mv += mvaurl;
        mv += '</span>';
        mv += '</a>';
        
      }
      
      $('mv-inject').set('html', mv);
      if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
    
    }

  });

}


// Recent Bookmarks

function recentBookmarks(){

  var rb = '';

  chrome.bookmarks.getRecent(localStorage['rb-itemsno']*1, function(bm){
  
    if(bm.length > 0){
    
      for(i=0;i<=bm.length;i++){
      
        if(bm[i] !== undefined){
      
          if(localStorage['rh-date'] == 'mm/dd/yyyy'){
            var dpdc = new Date(bm[i].dateAdded);
            var dpdate = dpdc.getDate()+'';
            var dpmonth = dpdc.getMonth()+'';
            if(dpdate.length == 1){dpdate = '0'+dpdate;}
            if(dpmonth.length == 1){dpmonth = '0'+dpmonth;}
            var rbd = dpmonth+'/'+dpdate;
          }else if(localStorage['rh-date'] == 'dd/mm/yyyy'){
            var dpdc = new Date(bm[i].dateAdded);
            var dpdate = dpdc.getDate()+'';
            var dpmonth = dpdc.getMonth()+'';
            if(dpdate.length == 1){dpdate = '0'+dpdate;}
            if(dpmonth.length == 1){dpmonth = '0'+dpmonth;}
            var rbd = dpdate+'/'+dpmonth;
          }
        
          var title = bm[i].title;
          var url = bm[i].url;
          var furl = getDomain(bm[i].url)+'favicon.ico';
          
          if(title !== ''){
            rb += '<a oncontextmenu="Clipboard.copy(\''+url+'\')" class="item" target="_blank" href="'+url+'">';
            rb += '<span class="time">'+rbd+'</span>';
            rb += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
            rb += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
            rb += title.replace(/\<br \/\>/g, '');
            rb += '</span>';
            rb += '</a>';
          }

        }

      }
      
      $('rb-inject').set('html', rb);
      if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
    
    }

  });

}


// Recent History Search

function recentHistorySearch(q){

  var rh = '';

  if(q !== '' && q !== undefined){

    chrome.history.search({text: q, maxResults: 30}, function(hi){
    
      if(hi.length > 0){
      
        $('popup-rh-insert').setStyle('display', 'none');
        $('popup-search-insert').setStyle('display', 'block');
      
        for(i=0;i<=hi.length;i++){
        
          if(hi[i] !== undefined){
        
            var currentTime = new Date(hi[i].lastVisitTime);
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            if(hours < 10){hours = '0'+hours;}
            if(minutes < 10){minutes = '0'+minutes;}
            var time = hours+':'+minutes;
          
            var title = hi[i].title;
            var url = hi[i].url;
            var furl = getDomain(hi[i].url)+'favicon.ico';
            
            if(title !== ''){
              rh += '<a oncontextmenu="Clipboard.copy(\''+url+'\')" class="item" target="_blank" href="'+url+'">';
              rh += '<span class="time">'+time+'</span>';
              rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
              rh += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
              rh += title;
              rh += '</span>';
              rh += '</a>';
            }

          }

        }
        
        $('popup-search-insert').set('html', rh);
        if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
      
      }else{
        $('popup-rh-insert').setStyle('display', 'none');
        $('popup-search-insert').setStyle('display', 'block');
        $('popup-search-insert').set('html', '<br><img alt="No Results" src="images/error.gif">');
      }

    });
  
  }

}


// Main functions

window.addEvent('domready', function(){

  // Options page
  
  if($('options')){
  
    // Select current options
    
    $('itemsno').setProperty('value',localStorage['rh-itemsno']);
    $('rctitemsno').setProperty('value',localStorage['rct-itemsno']);
    $('rbitemsno').setProperty('value',localStorage['rb-itemsno']);
    $('mvitemsno').setProperty('value',localStorage['mv-itemsno']);
    $('rhsearch').getElement('option[value='+localStorage['rh-search']+']').setProperty('selected','selected');
    $('rhtime').getElement('option[value='+localStorage['rh-time']+']').setProperty('selected','selected');
    $('rhdate').getElement('option[value='+localStorage['rh-date']+']').setProperty('selected','selected');
    $('rhwidth').setProperty('value',localStorage['rh-width'].replace('px',''));

    // Save options
    
    $('save').addEvent('click', function(){
    
      $('options-status').set('html', '<img alt="Saving" src="images/loading.gif">');
    
      var one = localStorage['rh-itemsno'] = $('itemsno').getProperty('value');
      var two = localStorage['rct-itemsno'] = $('rctitemsno').getProperty('value');
      var three = localStorage['rb-itemsno'] = $('rbitemsno').getProperty('value');
      var four = localStorage['rh-width'] = $('rhwidth').getProperty('value')+'px';
      var five = localStorage['mv-itemsno'] = $('mvitemsno').getProperty('value');
      var six = localStorage['rh-search'] = $('rhsearch').getSelected().getProperty('value');
      var seven = localStorage['rh-time'] = $('rhtime').getSelected().getProperty('value');
      var eight = localStorage['rh-date'] = $('rhdate').getSelected().getProperty('value');
      
      if(one && two && three && four && five && six && seven && eight){
        $('options-status').set('html', '<img alt="Saved" src="images/success.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
        optionsLangText();
      }else{
        $('options-status').set('html', '<img alt="Error" src="images/error.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
      }
    
    });
    
    // List order
    
    var rhilo = localStorage['rh-list-order'].split(',');
    
    for(var lo in rhilo){
      new Element('li', {'id': rhilo[lo]}).inject('rhlistorder');
    }
  
    var rhos = new Sortables('#rhlistorder', {
      onComplete: function(el){
        var rhosrlo = $('rhlistorder').getElements('li');
        localStorage['rh-list-order'] = rhosrlo[0].getProperty('id')+','+rhosrlo[1].getProperty('id')+','+rhosrlo[2].getProperty('id')+','+rhosrlo[3].getProperty('id');
      }
    });
    
    // Set language text
    
    optionsLangText();
  
  }
  
  // Popup page
  
  if($('insert')){
  
    var rhmain = '';
    var rhporder = localStorage['rh-list-order'].split(',');
    var footer = '<span id="showhistoryblock"><a id="rhpabout" href="#"></a><a id="rhpoptions" href="#"></a><span id="showhistorylinkfix"></span><a id="showhistorylink" href="#">'+chrome.i18n.getMessage("showAllHistory")+'</a></span>';
    
    for(var o in rhporder){
      if(rhporder[o] == 'rh-order'){
        if(localStorage['rh-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentHistory")+'</span></span><span id="rh-inject"></span>';
        }
      }else if(rhporder[o] == 'rct-order'){
        if(localStorage['rct-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentlyClosedTabs")+'</span></span><span id="rct-inject"></span>';
        }
      }else if(rhporder[o] == 'rb-order'){
        if(localStorage['rb-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentBookmarks")+'</span></span><span id="rb-inject"></span>';
        }
      }else if(rhporder[o] == 'mv-order'){
        if(localStorage['mv-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("mostVisited")+'</span></span><span id="mv-inject"></span>';
        }
      }
    }
    
    rhmain = '<div id="popup-rh-insert">'+rhmain+footer+'</div><div id="popup-search-insert"></div>';
    
    if(localStorage['rh-search'] == 'yes'){
      var tsbard = 'block';
    }else{
      var tsbard = 'none';
    }
    
    var tsbar = '<span style="display:'+tsbard+';" id="popup-top"><form id="popup-search-form" action="#" method="get"><input id="popup-search" type="text" value=""><input type="submit" id="popup-search-submit" value=" "><span id="popup-search-close"></span></form></span>';
    
    if(localStorage['rh-'+versionNo] !== 'true'){
      var uim = '<span id="upgradeinstall">Installed/Upgraded v'+versionNo+'<br>View Changelog <a target="_blank" href="about.html">Here</a></span>';
      localStorage['rh-'+versionNo] = 'true';
    }else{
      var uim = '';
    }
    
    // RH Init
    
    $('insert').set('html', uim+tsbar+rhmain);
    $(document.body).setStyle('width', localStorage['rh-width']);
    $('popup-search').setStyle('width', ($(document.body).getStyle('width').toInt())*1-56+'px');
    if($('rh-inject')){recentHistory();}
    if($('rct-inject')){recentlyClosedTabs();}
    if($('rb-inject')){recentBookmarks();}
    if($('mv-inject')){mostVisited();}
    if(localStorage['rh-search'] == 'no'){$(document.body).getElements('.rhtitle')[0].setStyle('padding-top', 0);}
    
    // Footer links
    
    $('rhpabout').addEvent('click', function(){
      chrome.tabs.create({url: 'about.html'});
    });
    
    $('rhpoptions').addEvent('click', function(){
      chrome.tabs.create({url: 'options.html'});
    });
    
    $('showhistorylink').addEvent('click', function(){
      chrome.tabs.create({url: 'chrome://history/'});
    });

    // Popup search

    $('popup-search-form').addEvent('submit', function(e){
      new Event(e).stop();
      recentHistorySearch($('popup-search').getProperty('value'));
    });
    
    $('popup-search-close').addEvent('click', function(){
      $('popup-rh-insert').setStyle('display', 'block');
      $('popup-search-insert').setStyle('display', 'none');
    });

  }
  
  // History page
  
  // Coming soon...

});