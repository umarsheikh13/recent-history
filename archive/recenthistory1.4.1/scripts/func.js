
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
    case "en": return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save"]; break;
    case "fr": return ["Historique Recent", "Onglets récemment fermés", "Voir tout l'historique", "Supprimer l'historique à l'ouverture", "Taille de l'icône", "Langue", "(Cela ne supprimera que votre historique récent de votre extension et non pas votre historique)", "Supprimer l'historique récent", "Sauvegarder"]; break;
    case "de": return ["Neuester Verlauf", "Kürzlich geschlossene Tabs", "Zeige gesamten Verlauf", "Verlauf beim Start löschen", "Symbolgröße", "Sprache", "(Es wird nur der Zwischenspeicher der Erweiterung Neuester Verlauf gelöscht, nicht der richtige Verlauf)", "Neuesten Verlauf löschen", "Speichern"]; break;
    case "es": return ["La historia reciente", "Pestañas cerradas recientemente", "Mostrar todos los Historia", "Borrar historial de inicio de", "Tamaño de los iconos", "Idioma", "(Esto sólo será evidente, no caché la extensión Historia reciente de su historia real)", "La historia reciente abierto", "Salvar"]; break;
    default: return ["Recent History", "Recently Closed Tabs", "Show All History", "Clear History on Startup", "Icon Size", "Language", "(This will only clear the Recent History extension's cache not your actual history)", "Clear Recent History", "Save"];
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
          furl = 'images/icon16.png';
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
          furl = 'images/icon16.png';
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

// Main functions
window.addEvent('domready', function(){

  // Options page
  if($('options')){
  
    // Select current options
    $('itemsno').getElement('option[value='+localStorage['rh-itemsno']+']').setProperty('selected','selected');
    $('rctitemsno').getElement('option[value='+localStorage['rct-itemsno']+']').setProperty('selected','selected');
    $('clearsu').getElement('option[value='+localStorage['clearsu']+']').setProperty('selected','selected');
    $('rhlang').getElement('option[value='+localStorage['rh-lang']+']').setProperty('selected','selected');
    $('rhicon').getElement('option[value='+localStorage['rh-icon']+']').setProperty('selected','selected');

    // Save options
    $('save').addEvent('click', function(){
    
      var one = localStorage['rh-itemsno'] = $('itemsno').getSelected().getProperty('value');
      var two = localStorage['rct-itemsno'] = $('rctitemsno').getSelected().getProperty('value');
      var three = localStorage['clearsu'] = $('clearsu').getSelected().getProperty('value');
      var four = localStorage['rh-lang'] = $('rhlang').getSelected().getProperty('value');
      var five = localStorage['rh-icon'] = $('rhicon').getSelected().getProperty('value');
      
      if(one && two && three && four && five){
        alert('Options saved successfully');
        chrome.windows.getAll({}, function(wins){
          for(var i in wins){
            if(wins[i].id !== undefined){
              chrome.tabs.getAllInWindow(wins[i].id, function(tabs){
                for(var n in tabs){
                  if(tabs[n].id !== undefined){
                    chrome.pageAction.setIcon({tabId: tabs[n].id, path: "images/icon"+localStorage['rh-icon']+".png"});
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
        $$('label[for=rhicon]').set('text', optionslang[4]);
        $$('label[for=rhlang]').set('text', optionslang[5]);
        $('save').setProperty('value', optionslang[8]);
        $('clear').setProperty('value', optionslang[7]);
        $('notice').set('text', optionslang[6]);
      }else{
        alert('Sorry could not save options, please try again');
      }
    
    });
    
    // Clear history
    $('clear').addEvent('click', function(){
    
      localStorage['rh-history'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historytwo'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      localStorage['rh-historyclosed'] = timeNow()+',Recent History,https://chrome.google.com/extensions/detail/fbmkfdfomhhlonpbnpiibloacemdhjjm,icon16@';
      
      var history = localStorage['rh-history'].split('@');
      var historyt = localStorage['rh-historytwo'].split('@');
      var historyc = localStorage['rh-historyclosed'].split('@');
      
      if(history.length == 2 && historyt.length == 2 && historyc.length == 2){
        alert('History cleared successfully');
      }else{
        alert('Sorry could not clear history, please try again');
      }
    
    });
  
    var optionslang = getLangText();
    $$('label[for=itemsno]').set('text', optionslang[0]);
    $$('label[for=rctitemsno]').set('text', optionslang[1]);
    $$('label[for=clearsu]').set('text', optionslang[3]);
    $$('label[for=rhicon]').set('text', optionslang[4]);
    $$('label[for=rhlang]').set('text', optionslang[5]);
    $('save').setProperty('value', optionslang[8]);
    $('clear').setProperty('value', optionslang[7]);
    $('notice').set('text', optionslang[6]);
  
  }
  
  // Popup page
  if($('insert')){
  
    var rctv = localStorage['rct-itemsno'];
    var text = getLangText();
    var footer = '<span id="showhistoryblock"><a id="showhistorylink" href="#">'+text[2]+'</a></span>';
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
    
    $('showhistorylink').addEvent('click', function(){
    
      chrome.tabs.create({url: 'chrome://history/'})
    
    });

  }

});