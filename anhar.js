/* anhar.js 
 * authored by 9r3i
 * github.com/9r3i
 */
var ANHAR, SETTING, APPS, SESSION, D, W;

/* get all setting from cookie and re-set to cookie */
for(var i in ANHAR.set){
  var c = getCookie(i);
  SETTING[i] = c?c:ANHAR.set[i];
  setCookie(i,SETTING[i],31);
}
/* set the APPS array */
APPS = SETTING.apps?SETTING.apps.split(','):[];
/* set current session */
var cSession = getCookie('current_app');
SESSION = cSession?cSession:false;
/* set the onloading statement */
if(SESSION){
  gebtn('body')[0].setAttribute('onload','load_app(\''+SESSION+'\');load_menu();');
}else{
  gebtn('body')[0].setAttribute('onload','load_list();load_menu();');
}

/* load app list */
function load_list(){
  if(!APPS){return;}
  var c = gebi('content');
  c.innerHTML = '<div class="content"><div class="app-list" id="anhar_app_list"></div></div>';
  for(var i in APPS){
    post(APPS[i]+'.json',function(res){
      var doc = res?JSON.parse(res):{"namespace":"","name":"","description":"","version":"","icon64":""};
      var aal = gebi('anhar_app_list');
      ANHAR.apps[doc.namespace] = doc;
      aal.innerHTML += '<div class="app-each"><a href="javascript:set_app(\''+doc.namespace+'\')" title="'+doc.name+'\n'+doc.description+'"><img width="64px" height="64px" src="'+doc.icon64+'" alt="" /></a></div>';
    });
  }
  gebi('menu').style.display = 'none';
  onTop('home');
}
/* set the title */
gebtn('title')[0].innerHTML = ANHAR.arabic_name;
function set_app(ns){
  SESSION = ns;
  setCookie('current_app',ns,31);
  gebi('content').innerHTML = '';
  W.location.reload();
}
/* load app */
function load_app(){
  if(SESSION){
    require(SESSION+'.js');
    post(SESSION+'.json',function(res){
      var doc = JSON.parse(res);
      if(doc){gebtn('title')[0].innerHTML = doc.name+' &#8213; '+ANHAR.arabic_name;}
    });
  }
}
/* close app */
function close_app(){
  SESSION = false;
  setCookie('current_app','',-1);
  gebi('content').innerHTML = '';
  W.location.reload();
}
/* save setting */
function save_setting(ids){
  var id = ids.split(',');
  for(var i in id){
    var el = gebi(id[i]);
    var name = el.getAttribute('name');
    SETTING[name] = el.value;
    setCookie(name,el.value,31);
  }
  gebi('content').innerHTML = '<div class="title">'+locale('Settings are saved')+'.</div>';
  setTimeout(function(){window.location.reload();},1000);
}
/* load setting */
function load_setting(){
  var ids = [];
  var store = '<div class="form"><table><tbody>';
  for(var i in ANHAR.setting){
    var set = ANHAR.setting[i];
    store += '<tr><td class="label">'+locale(set.label)+'</td><td><div class="divinput"><input type="text" id="'+set.id+'" class="input" name="'+set.name+'" value="'+(SETTING[set.name]?SETTING[set.name]:set.value)+'" /></div></td></tr>';
    ids.push(set.id);
  }
  store += '</tbody></table></div>';
  store += '<div class="divsubmit"><input type="submit" value="'+locale('Save')+'" onclick="save_setting(\''+ids.join(',')+'\')" class="submit" id="submit_setting" /></div>';
  var c = gebi('content');
  c.innerHTML = '<div class="title">'+locale('Settings')+'</div><div class="content">'+store+'</d>';
  gebi('menu').style.display = 'none';
  onTop('settings');
}
/* load about */
function load_about(){
  if(!ANHAR){return;}
  var c = gebi('content');
  var about = '<div class="title">'+locale('About')+'</div><div class="content">'+ANHAR.about[SETTING.locale]+'</d>';
  c.innerHTML = about;
  gebi('menu').style.display = 'none';
  onTop('about');
}
/* locale */
function locale(str){
  if(!ANHAR.locale){return;}
  var loc = ANHAR.locale[SETTING.locale];
  if(loc){
    return loc[str]?loc[str]:str;
  }else{
    return str;
  }
}
/* load menu */
function load_menu(){
  if(!ANHAR){return;}
  var c = gebi('menu');
  c.innerHTML = '<div class="menu-each-top"></div>';
  for(var i in ANHAR.menu){
    var menu = ANHAR.menu[i];
    c.innerHTML += '<a href="'+menu.href+'" title="'+locale(menu.title)+'"><div class="menu-each">'+locale(menu.name)+'</div></a>';
  }
  if(SESSION){
    c.innerHTML += '<a href="javascript:close_app()" title="'+locale('Close Application')+'"><div class="menu-each">'+locale('Close Application')+'</div></a>';
  }
}
/* print the footer content */
var footer = '60,97,32,104,114,101,102,61,34,104,116,116,112,115,58,47,47,103,105,116,104,117,98,46,99,111,109,47,57,114,51,105,34,62,57,114,51,105,60,47,97,62'.split(',');
var fstore = '';
for(var i in footer){
  fstore += chr(footer[i]);
}
gebi('footer').innerHTML = locale('Powered by')+' '+fstore;


