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

var versionNo = '1.9.3';


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


// Leap year

function isLeapYear(){
  var year = $('date-select-year').getSelected().get('value')*1;
  return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
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
  if(n !== ''){
    if(n < one || n > two){
      alert(one+'-'+two);
      el.setProperty('value', one);
    }
  }else{
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


// Left click

function leftClick(url){
  var e = this;
  if(e.event.button == 0){
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.update(tab.id, {
        url: url
      });
      window.close();
    });
  }else if(e.event.button == 1){
    chrome.tabs.create({
      url: url,
      selected: false
    });
  }
}


// Right click

function rightClick(url){
  Clipboard.copy(url);
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


// Check bookmarked

function isBookmarked(){

  $$('.item').each(function(el){
    chrome.bookmarks.search(el.get('href'), function(bms){
      if(bms.length > 0){
        for(var i in bms){
          if(bms[i].url == el.get('href')){
            new Element('img', {
              'alt': 'Bookmarked',
              'src': 'images/star.png',
              'styles': {
                'margin-left': '3px'
              }
            }).inject(el, 'after');
          }
        }
      }
    });
  });

}


// Most Visited List

function mostVisitedList(){

  var mvc = localStorage['mv-cache'];
  
  if(mvc !== 'false'){
    
    var mvd = JSON.decode(mvc);
    var mv = '';
    var itemsno = 45;
    
    for(i=0;i<itemsno;i++){
    
      mv = '';
      
      if(mvd[i] !== undefined){
        if(mvd[i].length > 0){
          new Element('li', {
            events: {
              click: function(){
                if(this.hasClass('mv-remove')){
                  this.removeClass('mv-remove');
                }else{
                  this.addClass('mv-remove');
                }
              }
            },
            title: mvd[i][0],
            html: mvd[i][2].replace(/\<br \/\>/g, '')
          }).inject('mv-blocklist', 'bottom');
        }
      }
      
    }
    
    if(localStorage['mv-blocklist'] !== 'false'){
      var mvblia = localStorage['mv-blocklist'].split('|');
      for(b=0;b<mvblia.length;b++){
        if(mvblia[b] !== undefined && mvblia[b] !== null && mvblia[b]){
          $$('#mv-blocklist li[title="'+mvblia[b]+'"]').addClass('mv-remove');
        }
      }
    }
    
  }

}


// Recent History

function recentHistory(){

  var rh = '';
  var rhin = localStorage['rh-itemsno']*1;
  
  if(rhin > 0){

    chrome.history.search({text: '', maxResults: rhin, startTime: (new Date()).getTime()-(28*24*3600*1000), endTime: (new Date()).getTime()}, function(hi){
    
      if(hi.length > 0){
      
        for(i=0;i<=hi.length;i++){
        
          rh = '';
        
          if(hi[i] !== undefined){
        
            var currentTime = new Date(hi[i].lastVisitTime);
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            if(hours < 10){hours = '0'+hours;}
            if(minutes < 10){minutes = '0'+minutes;}
            var time = hours+':'+minutes;
          
            var title = hi[i].title;
            var url = hi[i].url;
            var furl = 'chrome://favicon/'+hi[i].url;
            
            if(title == ''){
              title = url;
            }
            
            rh += '<span class="time">'+time+'</span>';
            rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
            rh += '<span title="'+hi[i].visitCount+' | '+title.replace('"',"'")+' | '+url+'" class="title">';
            rh += title.replace(/\<br \/\>/g, '');
            rh += '</span>';

            new Element('a', {
              onclick: 'leftClick(\''+url+'\')',
              oncontextmenu: 'rightClick(\''+url+'\')',
              'class': 'item',
              target: '_blank',
              href: 'javascript:void(0);',
              html: rh
            }).inject('rh-inject', 'bottom');

          }

        }
        
        if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
        
      }

    });
  
  }

}


// Recently Closed Tabs

function recentlyClosedTabs(){

  var rhhistory = localStorage['rh-historyclosed'].split('@');

  var item = '';
  var rh = '';
  var itemsno = localStorage['rct-itemsno']*1;
  
  if(itemsno > 0){

    if(rhhistory.length > 0){

      for(i=0;i<itemsno;i++){
      
        rh = '';
      
        if(rhhistory[i] !== undefined){
        
          item = rhhistory[i].split(',');
          
          var time = item[0];
          var title = item[1];
          var url = item[2];
          var furl = item[3];
          
          if(furl == 'icon16'){
            furl = 'images/icon16-other.png';
          }
          
          if(title !== undefined){
            rh += '<span class="time">'+time+'</span>';
            rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
            rh += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
            rh += title.replace(/\<br \/\>/g, '');
            rh += '</span>';
            new Element('a', {
              onclick: 'leftClick(\''+url+'\')',
              oncontextmenu: 'rightClick(\''+url+'\')',
              'class': 'item',
              target: '_blank',
              href: 'javascript:void(0);',
              html: rh
            }).inject('rct-inject', 'bottom');
          }
        
        }
      
      }
    
      if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
    
    }
  
  }

}


// Most Visited

function mostVisited(){

  var mvc = localStorage['mv-cache'];
  
  if(mvc !== 'false'){
    
    var mvd = JSON.decode(mvc);
    var mv = '';
    var itemsno = localStorage['mv-itemsno']*1;
    var mvrl = localStorage['mv-blocklist'];
    var r = 0;
    
    for(i=0;i<45;i++){
    
      if(r == itemsno){
        break;
      }
    
      mv = '';
    
      if(mvd[i].length > 0){
        if(mvrl.indexOf(mvd[i][0]+'|') == -1){
          mv += '<span class="time">'+mvd[i][3]+'</span>';
          mv += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+mvd[i][1]+'">';
          mv += '<span title="'+mvd[i][4]+' | '+mvd[i][2].replace('"',"'")+' | '+mvd[i][0]+'" class="title">';
          mv += mvd[i][2].replace(/\<br \/\>/g, '');
          mv += '</span>';
          new Element('a', {
            onclick: 'leftClick(\''+mvd[i][0]+'\')',
            oncontextmenu: 'rightClick(\''+mvd[i][0]+'\')',
            'class': 'item',
            target: '_blank',
            href: 'javascript:void(0);',
            html: mv
          }).inject('mv-inject', 'bottom');
          r++;
        }
      }
      
    }
    
    if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
  
  }

}


// Recent Bookmarks

function recentBookmarks(){

  var rb = '';
  var rbin = localStorage['rb-itemsno']*1;

  if(rbin > 0){

    chrome.bookmarks.getRecent(rbin, function(bm){
    
      if(bm.length > 0){
      
        for(i=0;i<=bm.length;i++){
        
          rb = '';
        
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
            var furl = 'chrome://favicon/'+bm[i].url;
            
            if(title !== ''){
              rb += '<span class="time">'+rbd+'</span>';
              rb += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
              rb += '<span title="'+title.replace('"',"'")+' | '+url+'" class="title">';
              rb += title.replace(/\<br \/\>/g, '');
              rb += '</span>';
              new Element('a', {
                onclick: 'leftClick(\''+url+'\')',
                oncontextmenu: 'rightClick(\''+url+'\')',
                'class': 'item',
                target: '_blank',
                href: 'javascript:void(0);',
                html: rb
              }).inject('rb-inject', 'bottom');
            }

          }

        }
            
        if(localStorage['rh-time'] == 'no'){$$('.time').setStyle('display', 'none'); $$('.title').setStyle('margin-left', '20px'); $$('.favicon').setStyle('left', '0px');}
      
      }

    });
  
  }

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
            var furl = 'chrome://favicon/'+hi[i].url;
            
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


// Date picker

function datePicker(w, e){

  if(isLeapYear()){
    var dayarray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }else{
    var dayarray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  if(w == 'current'){
    var cdateo = new Date();
  }else if('selected'){
    var cdateo = new Date(($('date-select-year').getSelected().get('value')*1), ($('date-select-month').getSelected().get('value')*1-1), ($('date-select-day').getSelected().get('value')*1), 23, 59, 59, 999);
  }
  
  if(e == 'prev'){
    cdateo.setDate(cdateo.getDate()-1);
  }else if(e == 'next'){
    cdateo.setDate(cdateo.getDate()+1);
  }
    
  $('date-select-day').set('html', '');
  var ydatec = new Date().getFullYear();
  var mdatec = cdateo.getMonth();
  var ddatec = cdateo.getDate();
  var yeararray = [ydatec, (ydatec-1), (ydatec-2)];
  
  if(w == 'current'){
    for(i=0;i<yeararray.length;i++){
      if(i == 0){
        new Element('option', {'value': yeararray[i], 'selected': 'selected', 'text': yeararray[i]}).inject('date-select-year');
      }else{
        new Element('option', {'value': yeararray[i], 'text': yeararray[i]}).inject('date-select-year');
      }
    }
  }
  
  $$('#date-select-month option').each(function(el){
    if((mdatec)+1 == (el.get('value')*1)){
      el.set('selected', 'selected');
    }
  });
  
  for(i=0;i<=dayarray.length;i++){
    if(mdatec == i){
      for(ia=1;ia<=dayarray[i];ia++){
        if(ia == ddatec){
          ia = ia+'';
          if(ia.length == 1){
            ia = '0'+ia;
          }
          new Element('option', {'value': ia, 'selected': 'selected', 'text': ia}).inject('date-select-day');
        }else{
          ia = ia+'';
          if(ia.length == 1){
            ia = '0'+ia;
          }
          new Element('option', {'value': ia, 'text': ia}).inject('date-select-day');
        }
      }
    }
  }

}


// History

function history(date, q){

  var rh = '';
  var rha = [];
  
  if(date == 'yes'){
    var day = ($('date-select-day').getSelected().get('value')*1);
    var month = ($('date-select-month').getSelected().get('value')*1-1);
    var year = ($('date-select-year').getSelected().get('value')*1);
    var today = new Date(year, month, day, 23, 59, 59, 999);
    var eTime = today.getTime();
    var sTime = eTime-86400000;
    var hopt = {text: '', startTime: sTime, endTime: eTime, maxResults: 0};
  }else if(date == 'current'){
    var ndc = new Date();
    var today = new Date(ndc.getFullYear(), ndc.getMonth(), ndc.getDate(), 23, 59, 59, 999);
    var eTime = today.getTime();
    var sTime = eTime-86400000;
    var hopt = {text: '', startTime: sTime, endTime: eTime, maxResults: 0};
  }else if(date == 'no'){
    var hopt = {text: q, maxResults: 100, startTime: (new Date()).getTime()-(28*24*3600*1000), endTime: (new Date()).getTime()};
  }

  chrome.history.search(hopt, function(hi){
  
    if(hi.length > 0){
    
      for(i=0;i<=hi.length;i++){
      
        if(hi[i] !== undefined){
      
          rh = '';
          var currentTime = new Date(hi[i].lastVisitTime);
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          if(hours < 10){hours = '0'+hours;}
          if(minutes < 10){minutes = '0'+minutes;}
          var time = hours+':'+minutes;
        
          var title = hi[i].title;
          var url = hi[i].url;
          var furl = 'chrome://favicon/'+hi[i].url;
          
          if((/\:[0-9]+/).test(furl) || (/\:\/\/[0-9]+\.[0-9]+/).test(furl)){
            furl = 'images/blank.png';
          }
          
          if(title == ''){
            title = url;
          }
          
          title = truncate(title, 0, 90);
          
          rh += time.replace(':','');
          rh += '<span class="rh-delete-cb"><input class="rh-cb" type="checkbox" value="'+url+'"></span>';
          rh += '<a oncontextmenu="Clipboard.copy(\''+url+'\')" class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img onerror="this.setProperty(\'src\',\'images/blank.png\')" class="favicon" alt="FavIcon" src="'+furl+'">';
          rh += '<span title="'+hi[i].visitCount+' | '+title.replace('"',"'")+' | '+url+'" class="title">';
          rh += title.replace(/\<br \/\>/g, '');
          rh += '</span>';
          rh += '</a>';
          rh += '<br style="clear:both;">';
          
          rha.push(rh);

        }

      }
      
      rha.sort().reverse();
      
      if(date == 'no'){
        $('history-insert').setStyle('display', 'none');
        $('search-history-insert').setStyle('display', 'inline');
        $('search-history-insert').set('html', '<div id="rh-delete-all"></div><span style="display:block; padding-left:25px;"><input id="rh-cb-all" type="checkbox"></span>');
        for(ii=0;ii<=rha.length;ii++){
          if(rha[ii] !== undefined){
            new Element('span').set('html', rha[ii].replace(/[0-9]{4}/, '')).inject($('search-history-insert'));
          }
        }
      }else{
        $('history-insert').setStyle('display', 'inline');
        $('search-history-insert').setStyle('display', 'none');
        $('history-insert').set('html', '<div id="rh-delete-all"></div><div id="rh-delete-loading"></div><span style="display:block; padding-left:25px;"><input id="rh-cb-all" type="checkbox"></span>');
        for(ii=0;ii<=rha.length;ii++){
          if(rha[ii] !== undefined){
            new Element('span').set('html', rha[ii].replace(/[0-9]{4}/, '')).inject($('history-insert'));
          }
        }
      }
    
      $('rh-cb-all').addEvent('click', function(){
        var rhcbv = $('rh-cb-all').retrieve('cbv');
        if(rhcbv == 'true'){
          $$('.rh-cb').setProperty('checked', '');
          $('rh-cb-all').store('cbv', 'false');
        }else{
          $$('.rh-cb').setProperty('checked', 'checked');
          $('rh-cb-all').store('cbv', 'true');
        }
      });
      
      $('rh-delete-all').addEvent('click', function(){
        historyDelete();
      });
    
      isBookmarked();
    
    }else{
      if(date == 'no'){
        $('history-insert').setStyle('display', 'none');
        $('search-history-insert').setStyle('display', 'inline');
        $('search-history-insert').set('html', '<img alt="No Results" src="images/error.gif">');
      }else{
        $('history-insert').setStyle('display', 'inline');
        $('search-history-insert').setStyle('display', 'none');
        $('history-insert').set('html', '<img alt="No Results" src="images/error.gif">');
      }
    }

  });

}

// History delete

function historyDelete(){

  var delitems = $$('.rh-cb:checked');
  var delitemsall = $$('.rh-cb');

  if(delitems.length > 0){
    $('rh-delete-loading').setStyle('display', 'block');
    for(i=0;i<=delitems.length;i++){
      if(delitems[i]){
        var url = delitems[i].get('value');
        chrome.history.deleteUrl({url: url});
        delitems[i].getParent('span').getParent('span').destroy();
      }
    }
    if(delitems.length == delitemsall.length){
      history('yes', '');
    }
    $('rh-delete-loading').setStyle('display', 'none');
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
    $('rhhistorypage').getElement('option[value='+localStorage['rh-historypage']+']').setProperty('selected','selected');
    $('rhtime').getElement('option[value='+localStorage['rh-time']+']').setProperty('selected','selected');
    $('rhdate').getElement('option[value='+localStorage['rh-date']+']').setProperty('selected','selected');
    $('rhwidth').setProperty('value',localStorage['rh-width'].replace('px',''));
    $$('#rhicontype input[value="'+localStorage['rh-icontype']+'"]').setProperty('checked', 'checked');

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
      var nine = localStorage['rh-historypage'] = $('rhhistorypage').getSelected().getProperty('value');
      
      if(one && two && three && four && five && six && seven && eight && nine){
        $('options-status').set('html', '<img alt="Saved" src="images/success.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
      }else{
        $('options-status').set('html', '<img alt="Error" src="images/error.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
      }
      
      var mvblis = $$('.mv-remove');
      
      if(mvblis.length > 0){
        localStorage['mv-blocklist'] = '';
        mvblis.each(function(bi){
          localStorage['mv-blocklist'] = localStorage['mv-blocklist']+bi.get('title')+'|';
        });
      }else{
        localStorage['mv-blocklist'] = 'false';
      }
    
    });
    
    // List order
    
    var rhilo = localStorage['rh-list-order'].split(',');
    
    for(var lo in rhilo){
      if(rhilo[lo] == 'rh-order'){
        new Element('li', {'id': rhilo[lo], 'html': chrome.i18n.getMessage("recentHistory")}).inject('rhlistorder');
      }else if(rhilo[lo] == 'rct-order'){
        new Element('li', {'id': rhilo[lo], 'html': chrome.i18n.getMessage("recentlyClosedTabs")}).inject('rhlistorder');
      }else if(rhilo[lo] == 'mv-order'){
        new Element('li', {'id': rhilo[lo], 'html': chrome.i18n.getMessage("mostVisited")}).inject('rhlistorder');
      }else if(rhilo[lo] == 'rb-order'){
        new Element('li', {'id': rhilo[lo], 'html': chrome.i18n.getMessage("recentBookmarks")}).inject('rhlistorder');
      }
    }
  
    var rhos = new Sortables('#rhlistorder', {
      onStart: function(el){
        $$('#rhlistorder li').each(function(els){
          if(els !== el){
            els.setStyle('opacity', .4);
          }
        });
      },
      onComplete: function(el){
        $$('#rhlistorder li').setStyle('opacity', 1);
        var rhosrlo = $('rhlistorder').getElements('li');
        localStorage['rh-list-order'] = rhosrlo[0].getProperty('id')+','+rhosrlo[1].getProperty('id')+','+rhosrlo[2].getProperty('id')+','+rhosrlo[3].getProperty('id');
      }
    });
    
    // Select icon
    
    $$('#rhicontype label').each(function(el){
      el.addEvent('click', function(){
        chrome.windows.getAll({}, function(wins){
          for(var i in wins){
            if(wins[i].id !== undefined){
              chrome.tabs.getAllInWindow(wins[i].id, function(tabs){
                for(var n in tabs){
                  if(tabs[n].id !== undefined){
                    chrome.pageAction.setIcon({tabId: tabs[n].id, path: 'images/'+el.getFirst('input').get('value')+'.png'});
                  }
                }
              });
            }
          }
        });
        localStorage['rh-icontype'] = el.getFirst('input').get('value');
      });
    });
    
    // Most visited list
    
    mostVisitedList();
  
  }
  
  // Popup page
  
  if($('insert')){
  
    var rhmain = '';
    var rhporder = localStorage['rh-list-order'].split(',');
    var footer = '<span id="showhistoryblock"><a id="rhpabout" href="#"></a><a id="rhpoptions" href="#"></a><span id="showhistorylinkfix"></span><a id="showhistorylink" href="#">'+chrome.i18n.getMessage("showAllHistory")+'</a></span>';
    
    for(var o in rhporder){
      if(rhporder[o] == 'rh-order'){
        if((localStorage['rh-itemsno']*1) > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentHistory")+'</span></span><span id="rh-inject"></span>';
        }
      }else if(rhporder[o] == 'rct-order'){
        if((localStorage['rct-itemsno']*1) > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentlyClosedTabs")+'</span></span><span id="rct-inject"></span>';
        }
      }else if(rhporder[o] == 'rb-order'){
        if((localStorage['rb-itemsno']*1) > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+chrome.i18n.getMessage("recentBookmarks")+'</span></span><span id="rb-inject"></span>';
        }
      }else if(rhporder[o] == 'mv-order'){
        if((localStorage['mv-itemsno']*1) > 0){
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
    $('popup-search').focus();
    (function(){
    if($('rh-inject')){recentHistory();}
    if($('rct-inject')){recentlyClosedTabs();}
    if($('rb-inject')){recentBookmarks();}
    if($('mv-inject')){mostVisited();}
    }).delay(10);
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
  
  if($('rh-items-manager')){
  
    // Init
    
    if(localStorage['rh-date'] == 'dd/mm/yyyy'){
      $('dsdi').set('html', '<select id="date-select-day"></select>');
      $('dsmi').set('html', '<select id="date-select-month"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>');
    }else if(localStorage['rh-date'] == 'mm/dd/yyyy'){
      $('dsmi').set('html', '<select id="date-select-day"></select>');
      $('dsdi').set('html', '<select id="date-select-month"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>');
    }
    
    $('rh-search').focus();
    datePicker('current', '');
    history('current', '');
  
    // Search
    
    $('rh-search-form').addEvent('submit', function(e){
      new Event(e).stop();
      var rhsvi = $('rh-search').getProperty('value');
      if(rhsvi !== '' && rhsvi !== ' '){
        history('no', rhsvi);
      }
    });
    
    $('rh-clear-search').addEvent('click', function(){
      $('history-insert').setStyle('display', 'inline');
      $('search-history-insert').setStyle('display', 'none');
    });
    
    // Date selection
    $('date-select-prev').addEvent('click', function(){
      datePicker('selected', 'prev');
      history('yes', '');
    });
    $('date-select-next').addEvent('click', function(){
      datePicker('selected', 'next');
      history('yes', '');
    });
    $('date-select-day').addEvent('change', function(){
      datePicker('selected', '');
      history('yes', '');
    });
    $('date-select-month').addEvent('change', function(){
      datePicker('selected', '');
      history('yes', '');
    });
    $('date-select-year').addEvent('change', function(){
      datePicker('selected', '');
      history('yes', '');
    });
  
  }

});