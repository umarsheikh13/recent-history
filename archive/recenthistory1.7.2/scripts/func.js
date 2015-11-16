
// Version

var versionNo = '1.7.2';


// Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-16300412-1']);
_gaq.push(['_trackPageview']);

(function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = 'https://ssl.google-analytics.com/ga.js';
 (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
})();


// Add slashes

function addslashes(str){
  str = str.replace(/\\/g,'\\\\');
  str = str.replace(/\'/g,'\\\'');
  str = str.replace(/\"/g,'\\"');
  str = str.replace(/\0/g,'\\0');
  return str;
}


// Get domain name

function getDomain(url){
  var rurl = '';
  var rxp = /(http|https)\:\/\/(.*?)\//;
  var urlt = rxp.test(url);
  if(urlt){
    rurl = url.match(rxp)[0];
    rurl = rurl.replace('http://','');
    rurl = rurl.replace('https://','');
    rurl = rurl.replace('/','');
    return rurl;
  }else{
    return 'undefined';
  }
}


// Sort object

function sortByValue(keyArray, valueMap){
  return keyArray.sort(function(a,b){return valueMap[a]-valueMap[b];}).reverse();
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


// Strip slashes

function stripslashes(str){
  str = str.replace(/\\'/g,'\'');
  str = str.replace(/\\"/g,'"');
  str = str.replace(/\\0/g,'\0');
  str = str.replace(/\\\\/g,'\\');
  return str;
}


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


// Get language

function getLangText(){

  var lang = localStorage['rh-lang'];
  
  switch(lang){
    case "en": return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save", "Yes", "No", "Width", "Search", "Order", "Most Visited"]; break;
    case "fr": return ["Historique Recent", "Onglets récemment fermés", "Voir tout l'historique", "Supprimer l'historique à l'ouverture", "Taille de l'icône", "Langue", "(Cela ne supprimera que votre historique récent de votre extension et non pas votre historique)", "Supprimer l'historique récent", "Sauvegarder", "Oui", "Non", "Largeur", "Recherche", "Ordre", "Les plus visités"]; break;
    case "de": return ["Neuester Verlauf", "Kürzlich geschlossene Tabs", "Zeige gesamten Verlauf", "Verlauf beim Start löschen", "Symbolgröße", "Sprache", "(Es wird nur der Zwischenspeicher der Erweiterung Neuester Verlauf gelöscht, nicht der richtige Verlauf)", "Neuesten Verlauf löschen", "Speichern", "Ja", "Nein", "Breite", "Suche", "Bestellen", "Oft besucht"]; break;
    case "es": return ["La historia reciente", "Pestañas cerradas recientemente", "Mostrar todos los Historia", "Borrar historial de inicio de", "Tamaño de los iconos", "Idioma", "(Esto sólo será evidente, no caché la extensión Historia reciente de su historia real)", "La historia reciente abierto", "Salvar", "Sí", "No", "Anchura", "Búsqueda", "Orden", "Más visitado"]; break;
    case "cs": return ["Nedávná historie", "Nedávno zavřené karty", "Ukaž celou historii", "Vymaž historii při startu", "Velikost ikon", "Jazyk", "(Tímto smažete jen vyrovnávací paměť rozšíření Nedávná historie, nikoliv svou skutečnou historii)", "Vymaž nedávnou historii", "Uložit", "Ano", "Ne", "šířka", "Hledat", "Pořadí", "Nejnavštěvovanější"]; break;
    case "ru": return ["Последние посещенные страницы", "Недавно закрытые вкладки", "Вся история", "Стирать историю при старте", "Размер иконки", "Язык", "(Очищает только историю расширения, а не фактическую историю)", "Стереть историю", "Сохранить", "Да", "нет", "ширина", "поиск", "Порядок", "Наиболее посещаемые"];
    case "ar": return ["تاريخ التصفح الحديث", "التبويبات المغلقة حديثا", "عرض كل التاريخ", "تنظيف تاريخ التصفح عند بدأ التشغيل", "حجم الأيقونة", "اللغة", "(هذا الخيار سينظف فقط تاريخ التصفح الحديث الخاص بالإضافة وليس تاريخ التصفح الفعلي الخاص بك)", "تنظيف تاريخ التصفح الحديث", "حفظ", "نعم", "لا", "العرض", "البحث", "رتب", "الأكثر زيارة"]; break;
    default: return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save", "Yes", "No", "Width", "Search", "Order", "Most Visited"];
  }

}


// Options language

function optionsLangText(){

  var optionslang = getLangText();
  $$('label[for=itemsno]').set('text', optionslang[0]);
  $$('label[for=rctitemsno]').set('text', optionslang[1]);
  $$('label[for=mvitemsno]').set('text', optionslang[14]);
  $$('label[for=clearsu]').set('text', optionslang[3]);
  $('rhicon').set('text', optionslang[4]);
  $$('label[for=rhlang]').set('text', optionslang[5]);
  $('save').setProperty('value', optionslang[8]);
  $('clear').setProperty('value', optionslang[7]);
  $('notice').set('text', optionslang[6]);
  $$('option[value=yes]').set('text', optionslang[9]);
  $$('option[value=no]').set('text', optionslang[10]);
  $$('label[for=rhwidth]').set('text', optionslang[11]);
  $$('label[for=rhsearch]').set('text', optionslang[12]);
  $('rhlistordertitle').set('text', optionslang[13]);
  $('rh-order').set('text', optionslang[0]);
  $('rct-order').set('text', optionslang[1]);
  $('mv-order').set('text', optionslang[14]);

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
        rh += '<img class="favicon" alt="FavIcon" src="'+furl+'">';
        rh += '<span title="'+title+' | '+url+'" class="title">';
        rh += title;
        rh += '</span>';
        rh += '</a>';
      }
    
    }
  
  }
  
  return rh;

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
        rh += '<img class="favicon" alt="FavIcon" src="'+furl+'">';
        rh += '<span title="'+title+' | '+url+'" class="title">';
        rh += title;
        rh += '</span>';
        rh += '</a>';
      }
    
    }
  
  }
  
  return rh;

}


// Most Visited

function mostVisited(){

  var rhhistory = localStorage['rh-history'].split('@');

  var item = '';
  var dn = '';
  var mva = [];
  var mve = [];
  var mvo = {};

  for(i=0;i<rhhistory.length;i++){
  
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
      
        dn = getDomain(url);
        if(mvo[dn]){
          mvo[dn] = mvo[dn]*1+1;
        }else{
          mvo[dn] = 1;
          mva.push(dn);
          mve.push(time+'|'+dn+'|'+furl);
        }
      
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
        mvburl = mvis[1];
        mvaurl = mvis[1].replace('www.','');
        mvfurl = mvis[2];
        break;
      }
    }
    
    mv += '<a oncontextmenu="Clipboard.copy(\''+mvburl+'\')" class="item" target="_blank" href="http://'+mvburl+'">';
    mv += '<span class="time">'+mvtime+'</span>';
    mv += '<img class="favicon" alt="FavIcon" src="'+mvfurl+'">';
    mv += '<span title="'+mvburl+'" class="title">';
    mv += mvaurl;
    mv += '</span>';
    mv += '</a>';
    
  }
  
  return mv;

}


// Recent History Manager

function recentHistoryManager(what, query){

  if(what == 'rh'){
    var rhhistory = localStorage['rh-history'].split('@');
  }else if(what == 'rct'){
    var rhhistory = localStorage['rh-historyclosed'].split('@');
  }

  var item = '';
  var rh = '';
  var itemsno = localStorage['rh-cutoff']*1;
  var delitem = '';
  var dtitle = '';

  for(i=0;i<itemsno;i++){
  
    if(rhhistory[i] !== undefined){
    
      item = rhhistory[i].split(',');
      
      var time = item[0];
      var title = item[1];
      var url = item[2];
      var furl = item[3];
      var id = item[4];
      var furlv = (/^(http|https)\:\/\/(.*)/.test(furl));
      var nfurl = furl;
      var urlv = (/\:[0-9]/.test(furl));
      
      if(!furlv){
        if(nfurl == 'icon16'){
          nfurl = 'images/icon16-other.png';
        }else{
          nfurl = 'images/blank.png';
        }
      }else{
        if(urlv){
          nfurl = 'images/blank.png';
        }
      }
      
      var qtest;
      
      if(query == 'false' || query == ''){
        qtest = true;
      }else{
        if(title !== undefined){
          var qrxp = new RegExp(query, 'gi');
          var matchq = title.match(qrxp);
          if(matchq !== null){
            qtest = true;
          }else{
            qtest = false;
          }
        }else{
          qtest = false;
        }
      }
      
      if(title !== undefined && qtest){
        if(nfurl == 'images/icon16-other.png'){
          rh += '<div id="n'+i+'" class="item-holder">';
          rh += '<span class="delitem-not" href="#"></span>';
          rh += '<a class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img class="favicon" alt="FavIcon" src="'+nfurl+'">';
          rh += '<span title="'+title+' | '+url+'" class="title">';
          rh += title;
          rh += '</span>';
          rh += '</a>';
          rh += '<div class="item-padding"></div>';
          rh += '</div>';
        }else{
          rh += '<div id="n'+i+'" class="item-holder">';
          rh += '<a class="delitem" onclick="deleteHistoryItem(\''+what+'\', \'n'+i+'\', \''+time+'\', \''+addslashes(title)+'\', \''+url+'\', \''+furl+'\', \''+id+'\')"></a>';
          rh += '<a class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img class="favicon" alt="FavIcon" src="'+nfurl+'">';
          rh += '<span title="'+title+' | '+url+'" class="title">';
          rh += title;
          rh += '</span>';
          rh += '</a>';
          rh += '<div class="item-padding"></div>';
          rh += '</div>';
        }
      }
    
    }
  
  }
  
  if(rh == ''){
    return '<img alt="No Results" src="images/error.gif">';
  }else{
    return rh;
  }

}


// Delete history item

function deleteHistoryItem(what, el, time, title, url, furl, id){

  title = stripslashes(title);
  title = title.replace(/\@/g,'&#64;');
  title = title.replace(/\,/g,'&#44;');
  
  var item = time+','+title+','+url+','+furl+','+id+'@';

  if(what == 'rh'){
    var str = localStorage['rh-history'];
    var strtwo = localStorage['rh-historytwo'];
    var del = str.replace(item, '');
    var deltwo = str.replace(item, '');
    if(del && deltwo){
      localStorage['rh-history'] = del;
      localStorage['rh-historytwo'] = deltwo;
      $(el).destroy();
    }
  }else if(what == 'rct'){
    var str = localStorage['rh-historyclosed'];
    var del = str.replace(item, '');
    if(del){
      localStorage['rh-historyclosed'] = del;
      $(el).destroy();
    }
  }

}


// Main functions

window.addEvent('domready', function(){

  // Options page
  
  if($('options')){
  
    // Select current options
    
    $('itemsno').setProperty('value',localStorage['rh-itemsno']);
    $('rctitemsno').setProperty('value',localStorage['rct-itemsno']);
    $('mvitemsno').setProperty('value',localStorage['mv-itemsno']);
    $('rhsearch').getElement('option[value='+localStorage['rh-search']+']').setProperty('selected','selected');
    $('clearsu').getElement('option[value='+localStorage['clearsu']+']').setProperty('selected','selected');
    $('rhlang').getElement('option[value='+localStorage['rh-lang']+']').setProperty('selected','selected');
    $('rhwidth').setProperty('value',localStorage['rh-width'].replace('px',''));
    $('rhicono').getElement('input[value='+localStorage['rh-icon']+']').setProperty('checked','checked');

    // Save options
    
    $('save').addEvent('click', function(){
    
      $('options-status').set('html', '<img alt="Saving" src="images/loading.gif">');
    
      var one = localStorage['rh-itemsno'] = $('itemsno').getProperty('value');
      var two = localStorage['rct-itemsno'] = $('rctitemsno').getProperty('value');
      var three = localStorage['clearsu'] = $('clearsu').getSelected().getProperty('value');
      var four = localStorage['rh-lang'] = $('rhlang').getSelected().getProperty('value');
      var five = localStorage['rh-icon'] = $('rhicono').getElement('input:checked').getProperty('value');
      var six = localStorage['rh-width'] = $('rhwidth').getProperty('value')+'px';
      var seven = localStorage['mv-itemsno'] = $('mvitemsno').getProperty('value');
      var eight = localStorage['rh-search'] = $('rhsearch').getSelected().getProperty('value');
      
      if(one && two && three && four && five && six && seven && eight){
        $('options-status').set('html', '<img alt="Saved" src="images/success.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
        chrome.windows.getAll({}, function(wins){
          for(var i in wins){
            if(wins[i].id !== undefined){
              chrome.tabs.getAllInWindow(wins[i].id, function(tabs){
                for(var n in tabs){
                  if(tabs[n].id !== undefined){
                    chrome.pageAction.setIcon({tabId: tabs[n].id, path: "images/"+localStorage['rh-icon']+".png"});
                    chrome.pageAction.setTitle({tabId: tabs[n].id, title: "Recent History"});
                    chrome.pageAction.show(tabs[n].id);
                  }
                }
              });
            }
          }
        });
        optionsLangText();
      }else{
        $('options-status').set('html', '<img alt="Error" src="images/error.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
      }
    
      if(localStorage['rh-lang'] == 'ar'){
        $('options-content').setStyle('direction', 'rtl');
        $('options-content').setStyle('text-align', 'right');
      }else{
        $('options-content').setStyle('direction', 'ltr');
        $('options-content').setStyle('text-align', 'left');
      }
    
    });
    
    // Clear history
    
    $('clear').addEvent('click', function(){
    
      $('options-status').set('html', '<img alt="Clearing" src="images/loading.gif">');
    
      localStorage['rh-history'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historytwo'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historyclosed'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      
      var history = localStorage['rh-history'].split('@');
      var historyt = localStorage['rh-historytwo'].split('@');
      var historyc = localStorage['rh-historyclosed'].split('@');
      
      if(history.length == 2 && historyt.length == 2 && historyc.length == 2){
        $('options-status').set('html', '<img alt="Cleared" src="images/success.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
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
        localStorage['rh-list-order'] = rhosrlo[0].getProperty('id')+','+rhosrlo[1].getProperty('id')+','+rhosrlo[2].getProperty('id');
        console.log(localStorage['rh-list-order']);
      }
    });
    
    // Set language text
    
    optionsLangText();
  
  }
  
  // Popup page
  
  if($('insert')){
  
    var rhmain = '';
    var text = getLangText();
    var rhporder = localStorage['rh-list-order'].split(',');
    var footer = '<span id="showhistoryblock"><a id="rhpabout" href="#"></a><a id="rhpoptions" href="#"></a><a id="rhpmanager" href="#"></a><a id="rhpclear" href="#"></a><span id="rhpclearconfirm"><a id="rhpclearyes" href="#"></a><a id="rhpclearno" href="#"></a></span><span id="showhistorylinkfix"></span><a id="showhistorylink" href="#">'+text[2]+'</a></span>';
    
    for(var o in rhporder){
      if(rhporder[o] == 'rh-order'){
        if(localStorage['rh-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+text[0]+'</span></span>'+recentHistory();
        }
      }else if(rhporder[o] == 'rct-order'){
        if(localStorage['rct-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+text[1]+'</span></span>'+recentlyClosedTabs();
        }
      }else if(rhporder[o] == 'mv-order'){
        if(localStorage['mv-itemsno'] > 0){
          rhmain = rhmain+'<span class="rhtitle"><span>'+text[14]+'</span></span>'+mostVisited();
        }
      }
    }
    
    rhmain = '<div id="popup-rh-insert">'+rhmain+footer+'</div><div id="popup-search-insert"></div>';
    
    if(localStorage['rh-search'] == 'yes'){
      var tsbard = 'block';
    }else{
      var tsbard = 'none';
    }
    
    var tsbar = '<span style="display:'+tsbard+';" id="popup-top"><form action="#"><input id="popup-search" type="text" value="Search"><span id="popup-search-close"></span></form></span>';
    
    if(localStorage['rh-'+versionNo] !== 'true'){
      var uim = '<span id="upgradeinstall">Installed/Upgraded v'+versionNo+'<br>View Changelog <a target="_blank" href="about.html">Here</a></span>';
      localStorage['rh-'+versionNo] = 'true';
    }else{
      var uim = '';
    }
    
    // RH Init
    
    $('insert').set('html', uim+tsbar+rhmain);
    $(document.body).setStyle('width', localStorage['rh-width']);
    $('popup-search').setStyle('width', ($(document.body).getStyle('width').toInt())*1-30+'px');
    $('popup-search').setProperty('value', text[12]);
    if(localStorage['rh-search'] == 'no'){$(document.body).getElements('.rhtitle')[0].setStyle('padding-top', 0);}
    
    // Footer links
    
    $('rhpabout').addEvent('click', function(){
      chrome.tabs.create({url: 'about.html'});
    });
    
    $('rhpoptions').addEvent('click', function(){
      chrome.tabs.create({url: 'options.html'});
    });
    
    $('rhpmanager').addEvent('click', function(){
      chrome.tabs.create({url: 'manager.html'});
    });
    
    $('rhpclear').addEvent('click', function(){
      $('rhpclearconfirm').setStyle('display','inline');
    });
    
    $('rhpclearno').addEvent('click', function(){
      $('rhpclearconfirm').setStyle('display','none');
    });
    
    $('rhpclearyes').addEvent('click', function(){
      localStorage['rh-history'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historytwo'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historyclosed'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      $('rhpclearconfirm').setStyle('display','none');
      window.close();
    });
    
    $('showhistorylink').addEvent('click', function(){
      chrome.tabs.create({url: 'chrome://history/'});
    });

    // Popup search

    $('popup-search').addEvent('keyup', function(){
      if($('popup-search').getProperty('value') == ''){
        $('popup-rh-insert').setStyle('display', 'block');
        $('popup-search-insert').setStyle('display', 'none');
      }else{
        $('popup-search-insert').set('html', recentHistoryManager('rh', $('popup-search').getProperty('value')));
        $('popup-rh-insert').setStyle('display', 'none');
        $('popup-search-insert').setStyle('display', 'block');
      }
    });
    
    $('popup-search').addEvent('focus', function(){
      $('popup-search').setStyle('color', '#000');
      if($('popup-search').getProperty('value') == text[12]){
        $('popup-search').setProperty('value', '');
      }
    });
    
    $('popup-search').addEvent('blur', function(){
      $('popup-search').setStyle('color', '#999');
      if($('popup-search').getProperty('value') == ''){
        $('popup-search').setProperty('value', text[12]);
      }
    });
    
    $('popup-search-close').addEvent('click', function(){
      $('popup-rh-insert').setStyle('display', 'block');
      $('popup-search-insert').setStyle('display', 'none');
      $('popup-search').setProperty('value', text[12]);
    });

  }
  
  // Manager page
  
  if($('rh-items-manager')){
  
    var optionslang = getLangText();
    $('rhlink').set('text', optionslang[0]);
    $('rctlink').set('text', optionslang[1]);
    $('rh-search').setProperty('value', optionslang[12]);
    
    $('rhlink').addEvent('click', function(){
      $('rh-manager-insert').set('html', recentHistoryManager('rh', 'false'));
      $('rh-manager-insert').setStyle('display', 'inline');
      $('rct-manager-insert').setStyle('display', 'none');
      $('rhlink').setStyle('color', '#000000');
      $('rctlink').setStyle('color', '#0000ff');
    });
    
    $('rctlink').addEvent('click', function(){
      $('rct-manager-insert').set('html', recentHistoryManager('rct', 'false'));
      $('rh-manager-insert').setStyle('display', 'none');
      $('rct-manager-insert').setStyle('display', 'inline');
      $('rhlink').setStyle('color', '#0000ff');
      $('rctlink').setStyle('color', '#000000');
    });
    
    $('rh-manager-insert').set('html', recentHistoryManager('rh', 'false'));
    
    $('rh-search').addEvent('keyup', function(){
      if($('rctlink').getStyle('color') == '#0000ff' && $('rh-search').getProperty('value') !== ''){
        $('rh-manager-insert').set('html', recentHistoryManager('rh', $('rh-search').getProperty('value')));
      }else if($('rhlink').getStyle('color') == '#0000ff' && $('rh-search').getProperty('value') !== ''){
        $('rct-manager-insert').set('html', recentHistoryManager('rct', $('rh-search').getProperty('value')));
      }else{
        if($('rctlink').getStyle('color') == '#0000ff'){
          $('rh-manager-insert').set('html', recentHistoryManager('rh', 'false'));
        }else if($('rhlink').getStyle('color') == '#0000ff'){
          $('rct-manager-insert').set('html', recentHistoryManager('rct', 'false'));
        }
      }
    });
    
    $('rh-search').addEvent('focus', function(){
      $('rh-search').setStyle('color', '#000');
      if($('rh-search').getProperty('value') == optionslang[12]){
        $('rh-search').setProperty('value', '');
      }
    });
    
    $('rh-search').addEvent('blur', function(){
      $('rh-search').setStyle('color', '#999');
      if($('rh-search').getProperty('value') == ''){
        $('rh-search').setProperty('value', optionslang[12]);
      }
    });
  
  }

});