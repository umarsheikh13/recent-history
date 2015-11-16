
// Add slashes
function addslashes(str){
  str = str.replace(/\\/g,'\\\\');
  str = str.replace(/\'/g,'\\\'');
  str = str.replace(/\"/g,'\\"');
  str = str.replace(/\0/g,'\\0');
  return str;
}

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

// Get text
function getLangText(){

  var lang = localStorage['rh-lang'];
  
  switch(lang){
    case "en": return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save", "Yes", "No", "Width"]; break;
    case "fr": return ["Historique Recent", "Onglets récemment fermés", "Voir tout l'historique", "Supprimer l'historique à l'ouverture", "Taille de l'icône", "Langue", "(Cela ne supprimera que votre historique récent de votre extension et non pas votre historique)", "Supprimer l'historique récent", "Sauvegarder", "Oui", "Non", "Largeur"]; break;
    case "de": return ["Neuester Verlauf", "Kürzlich geschlossene Tabs", "Zeige gesamten Verlauf", "Verlauf beim Start löschen", "Symbolgröße", "Sprache", "(Es wird nur der Zwischenspeicher der Erweiterung Neuester Verlauf gelöscht, nicht der richtige Verlauf)", "Neuesten Verlauf löschen", "Speichern", "Ja", "Nein", "Breite"]; break;
    case "es": return ["La historia reciente", "Pestañas cerradas recientemente", "Mostrar todos los Historia", "Borrar historial de inicio de", "Tamaño de los iconos", "Idioma", "(Esto sólo será evidente, no caché la extensión Historia reciente de su historia real)", "La historia reciente abierto", "Salvar", "Sí", "No", "Anchura"]; break;
    case "cs": return ["Nedávná historie", "Nedávno zavřené karty", "Ukaž celou historii", "Vymaž historii při startu", "Velikost ikon", "Jazyk", "(Tímto smažete jen vyrovnávací paměť rozšíření Nedávná historie, nikoliv svou skutečnou historii)", "Vymaž nedávnou historii", "Uložit", "Ano", "Ne", "šířka"]; break;
    default: return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save", "Yes", "No", "Width"];
  }

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
          furl = 'images/icon16-other.png';
        }else{
          furl = 'images/blank.png';
        }
      }
      
      if(title !== undefined){
        rh += '<a class="item" target="_blank" href="'+url+'">';
        rh += '<span class="time">'+time+'</span>';
        rh += '<img class="favicon" alt="FavIcon" src="'+furl+'">';
        rh += '<span title="'+title+'" class="title">';
        rh += title;
        rh += '</span>';
        rh += '</a>';
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
          furl = 'images/icon16-other.png';
        }else{
          furl = 'images/blank.png';
        }
      }
      
      if(title !== undefined){
        rh += '<a class="item" target="_blank" href="'+url+'">';
        rh += '<span class="time">'+time+'</span>';
        rh += '<img class="favicon" alt="FavIcon" src="'+furl+'">';
        rh += '<span title="'+title+'" class="title">';
        rh += title;
        rh += '</span>';
        rh += '</a>';
      }
    
    }
  
  }
  
  return rh;

}

// Recent History
function recentHistoryManager(what, query){

  if(what == 'rh'){
    var rhhistory = localStorage['rh-history'].split('@');
  }else if(what == 'rct'){
    var rhhistory = localStorage['rh-historyclosed'].split('@');
  }

  var item = '';
  var rh = '';
  var itemsno = 50;
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

      if(!furlv){
        if(nfurl == 'icon16'){
          nfurl = 'images/icon16-other.png';
        }else{
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
          rh += '<div id="n'+i+'">';
          rh += '<span class="delitem-not" href="#"></span>';
          rh += '<a class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img class="favicon" alt="FavIcon" src="'+nfurl+'">';
          rh += '<span title="'+title+'" class="title">';
          rh += title;
          rh += '</span>';
          rh += '</a>';
          rh += '<div class="item-padding"></div>';
          rh += '</div>';
        }else{
          rh += '<div id="n'+i+'">';
          rh += '<a class="delitem" href="javascript:void(0)" onclick="deleteHistoryItem(\''+what+'\', \'n'+i+'\', \''+time+'\', \''+addslashes(title)+'\', \''+url+'\', \''+furl+'\', \''+id+'\')"></a>';
          rh += '<a class="item" target="_blank" href="'+url+'">';
          rh += '<span class="time">'+time+'</span>';
          rh += '<img class="favicon" alt="FavIcon" src="'+nfurl+'">';
          rh += '<span title="'+title+'" class="title">';
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
    $('itemsno').getElement('option[value='+localStorage['rh-itemsno']+']').setProperty('selected','selected');
    $('rctitemsno').getElement('option[value='+localStorage['rct-itemsno']+']').setProperty('selected','selected');
    $('clearsu').getElement('option[value='+localStorage['clearsu']+']').setProperty('selected','selected');
    $('rhlang').getElement('option[value='+localStorage['rh-lang']+']').setProperty('selected','selected');
    $('rhwidth').getElement('option[value='+localStorage['rh-width']+']').setProperty('selected','selected');
    $('rhicono').getElement('input[value='+localStorage['rh-icon']+']').setProperty('checked','checked');

    // Save options
    $('save').addEvent('click', function(){
    
      $('options-status').set('html', '<img alt="Saving" src="images/loading.gif">');
    
      var one = localStorage['rh-itemsno'] = $('itemsno').getSelected().getProperty('value');
      var two = localStorage['rct-itemsno'] = $('rctitemsno').getSelected().getProperty('value');
      var three = localStorage['clearsu'] = $('clearsu').getSelected().getProperty('value');
      var four = localStorage['rh-lang'] = $('rhlang').getSelected().getProperty('value');
      var five = localStorage['rh-icon'] = $('rhicono').getElement('input:checked').getProperty('value');
      var six = localStorage['rh-width'] = $('rhwidth').getSelected().getProperty('value');
      
      if(one && two && three && four && five && six){
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
        var optionslang = getLangText();
        $$('label[for=itemsno]').set('text', optionslang[0]);
        $$('label[for=rctitemsno]').set('text', optionslang[1]);
        $$('label[for=clearsu]').set('text', optionslang[3]);
        $('rhicon').set('text', optionslang[4]);
        $$('label[for=rhlang]').set('text', optionslang[5]);
        $('save').setProperty('value', optionslang[8]);
        $('clear').setProperty('value', optionslang[7]);
        $('notice').set('text', optionslang[6]);
        $$('option[value=yes]').set('text', optionslang[9]);
        $$('option[value=no]').set('text', optionslang[10]);
        $$('label[for=rhwidth]').set('text', optionslang[11]);
      }else{
        $('options-status').set('html', '<img alt="Error" src="images/error.gif">');
        (function(){$('options-status').set('text', '')}).delay(2000);
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
  
    var optionslang = getLangText();
    $$('label[for=itemsno]').set('text', optionslang[0]);
    $$('label[for=rctitemsno]').set('text', optionslang[1]);
    $$('label[for=clearsu]').set('text', optionslang[3]);
    $('rhicon').set('text', optionslang[4]);
    $$('label[for=rhlang]').set('text', optionslang[5]);
    $('save').setProperty('value', optionslang[8]);
    $('clear').setProperty('value', optionslang[7]);
    $('notice').set('text', optionslang[6]);
    $$('option[value=yes]').set('text', optionslang[9]);
    $$('option[value=no]').set('text', optionslang[10]);
    $$('label[for=rhwidth]').set('text', optionslang[11]);
  
  }
  
  // Popup page
  if($('insert')){
  
    $(document.body).setStyle('width', localStorage['rh-width']);
  
    var rctv = localStorage['rct-itemsno'];
    var text = getLangText();
    var footer = '<span id="showhistoryblock"><a id="rhpabout" href="#"></a><a id="rhpoptions" href="#"></a><a id="rhpmanager" href="#"></a><a id="showhistorylink" href="#">'+text[2]+'</a></span>';
    var tone = '<span class="rhtitle"><span>'+text[0]+'</span></span>';
    var ttwo = '<span style="padding-top: 5px;" class="rhtitle"><span>'+text[1]+'</span></span>';
    
    if(rctv == 0){
      var rh = recentHistory();
      var rhmain = tone+rh+footer;
    }else if(rctv > 0){
      var rh = recentHistory();
      var rct = recentlyClosedTabs();
      var rhmain = tone+rh+ttwo+rct+footer;
    }
    
    $('insert').set('html', rhmain);
    
    $('rhpabout').addEvent('click', function(){
      chrome.tabs.create({url: 'about.html'});
    });
    
    $('rhpoptions').addEvent('click', function(){
      chrome.tabs.create({url: 'options.html'});
    });
    
    $('rhpmanager').addEvent('click', function(){
      chrome.tabs.create({url: 'manager.html'});
    });
    
    $('showhistorylink').addEvent('click', function(){
      chrome.tabs.create({url: 'chrome://history/'});
    });

  }
  
  if($('rh-items-manager')){
  
    var optionslang = getLangText();
    $('rhlink').set('text', optionslang[0]);
    $('rctlink').set('text', optionslang[1]);
    
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
  
  }

});