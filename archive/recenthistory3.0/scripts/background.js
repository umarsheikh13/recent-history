
// Set global vars

var openedTabs = {};
var closedTabs = [];


// Opened tab

function openedTab(tab){
  openedTabs[tab.id] = tab;
}


// Closed tab

function closedTab(id){
  if(openedTabs[id] !== undefined){
    openedTabs[id].time = timeNow(0);
    closedTabs.unshift(openedTabs[id]);
  }
}


// Updated tab

function updatedTab(tab){
  if(tab.status == 'complete'){
    if(openedTabs[tab.id] !== undefined){
      openedTabs[tab.id].title = tab.title;
      openedTabs[tab.id].url = tab.url;
    }
  }
}


// Most visited init

var mostVisitedInit = function(){

  var mv = [];
  var infmv = 45;
  var r = 0;

  chrome.history.search({text: '', maxResults: 0, startTime: (new Date()).getTime()-(28*24*3600*1000), endTime: (new Date()).getTime()}, function(hi){
  
    if(hi.length > 0){
    
      hi.sort(function(a,b){return b.visitCount - a.visitCount});
      
      for(i=0;i<99;i++){
        
        if(r == infmv){break;}
        
        if(hi[i] !== undefined){
          
          if((/^(http|https|ftp|ftps|file|chrome|chrome-extension|chrome-devtools)\:\/\/(.*)/).test(hi[i].title) == false && (/^(ftp|ftps|file|chrome|chrome-extension)\:\/\/(.*)/).test(hi[i].url) == false){
        
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
            
            mv.push({url: url, favicon: furl, title: title.replace(/\"/g, '&#34;'), visitCount: hi[i].visitCount});
            
          r++;
          }
          
        }

      }
      
      localStorage['mv-cache'] = JSON.encode(mv);
      
    }else{
      localStorage['mv-cache'] = 'false';
    }

  });

};


// Default values

var defaultValues = {
  "rh-itemsno": 20,
  "rct-itemsno": 0,
  "mv-itemsno": 0,
  "rb-itemsno": 0,
  "mv-blocklist": "false",
  "rh-historypage": "no",
  "rh-date": "mm/dd/yyyy",
  "rh-width": "275px",
  "rh-search": "yes",
  "rh-list-order": "rh-order,rct-order,rb-order,mv-order",
  "rh-time": "yes",
  "rh-group": "yes",
  "rh-orderby": "date",
  "rh-order": "desc",
  "rh-timeformat": "24",
  "rh-click": "current",
  "rh-share": "yes",
  "rh-filtered": "false",
  "rh-pinned": "false",
  "rhs-showurl": "no",
  "rhs-showsep": "no",
  "rhs-showext": "no",
  "rhs-showbg": "no"
};

for(var v in defaultValues){
  if(!localStorage[v] || localStorage[v] == null || localStorage[v] == ''){
    localStorage[v] = defaultValues[v];
  }
}


// Listeners

chrome.tabs.onRemoved.addListener(function(id){closedTab(id)});
chrome.tabs.onCreated.addListener(function(tab){
  openedTab(tab);
  /*if(localStorage['rh-historypage'] == 'yes' && (tab.url == 'chrome://history/' || tab.url == 'chrome://chrome/history/')){
    chrome.tabs.update(tab.id, {url: 'history.html', selected: true}, function(){});
  }*/
});
chrome.tabs.onUpdated.addListener(function(id,info,tab){
  updatedTab(tab);
  if(getVersionType() == 'pageAction'){
    chrome.pageAction.show(id);
  }
});


// Page action icon

chrome.tabs.onCreated.addListener(function(tab){
  if(getVersionType() == 'pageAction'){
    //chrome.pageAction.show(tab.id);
  }
});


// Startup

mostVisitedInit();
mostVisitedInit.periodical(3*60*1000);

if(getVersionType() == 'pageAction'){
  chrome.windows.getAll({}, function(wins){
    for(var i in wins){
      if(wins[i].id !== undefined){
        chrome.tabs.getAllInWindow(wins[i].id, function(tabs){
          for(var n in tabs){
            if(tabs[n].id !== undefined){
              chrome.pageAction.show(tabs[n].id);
              openedTab(tabs[n]);
            }
          }
        });
      }
    }
  });
}
