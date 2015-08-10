/* javascript ~ anhar-script.js */
var W = window, D = document;
/* cursor always on top position */
function onTop(ref,r){
  ref = ref?ref:Math.random(100,999);
  W.location.assign('#'+ref);
  if(r){
    setTimeout(function(){
      W.location.assign('#'+ref);
      var currentY = window.pageYOffset;
      W.scroll(0,currentY-60);
    },1500);
  }else{
    W.scroll(0,0);
  }
}
/* toggle menu */
function menu_toggle(){
  var m = gebi('menu');
  var display = m.style.display;
  if(display&&display=='block'){
    m.style.display = 'none';
  }else{
    m.style.display = 'block';
  }
}
/* common functions */
function gebi(id){return D.getElementById(id);}
function gebcn(id){return D.getElementsByClassName(id);}
function gebtn(id){return D.getElementsByTagName(id);}
function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
  var name = cname+"=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
function post(url,callback,data,unform){
  var xmlhttp=false;
  if(window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
    var xhf=[function(){return new ActiveXObject("Msxml2.XMLHTTP");},function(){return new ActiveXObject("Msxml3.XMLHTTP");},function(){return new ActiveXObject("Microsoft.XMLHTTP");}];
    for(var i=0;i<xhf.length;i++){
      try{xmlhttp=XMLHttpFactories[i]();}
      catch(e){continue;}
      break;
    }
  }
  if(!xmlhttp){return;}
  var method=data?'POST':'GET';
  xmlhttp.open(method,url,true);
  if(data&&!unform){
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  xmlhttp.onreadystatechange=function(){
    if(callback&&xmlhttp.readyState==4&&xmlhttp.status==200&&xmlhttp.responseText){
      return callback(xmlhttp.responseText);
    }
  };
  xmlhttp.send(unform?data:reform(data));
}
function reform(data){
  var ret=[];
  for(var d in data){
    ret.push(encodeURIComponent(d)+"="+encodeURIComponent(data[d]));
  }
  return ret.join("&");
}
function load_script(filename){
  filename = filename?filename:'';
  var javascript = document.createElement('script');
  javascript.type = 'text/javascript';
  javascript.async = true;
  javascript.src = filename;
  var script = document.getElementsByTagName('script')[0];
  script.parentNode.insertBefore(javascript,script);
}
function chr(c){
  if(c>0xFFFF){c-=0x10000;return String.fromCharCode(0xD800+(c>>10),0xDC00+(c&0x3FF));}
  return String.fromCharCode(c);
}
function require(filename){
  var d = this.window.document;
  var isXML = d.documentElement.nodeName!=='HTML'||!d.write;
  var js = d.createElementNS&&isXML?d.createElementNS('http://www.w3.org/1999/xhtml','script'):d.createElement('script');
  js.setAttribute('type','text/javascript');
  js.setAttribute('src',filename);
  js.setAttribute('defer','defer');
  d.getElementsByTagNameNS&&isXML?(d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','head')[0]?d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','head')[0].appendChild(js):d.documentElement.insertBefore(js,d.documentElement.firstChild)):d.getElementsByTagName('head')[0].appendChild(js);
  var cur_file = {};
  cur_file[this.window.location.href] = 1;
  this.php_js = this.php_js||{};
  if(!this.php_js.includes){
    this.php_js.includes = cur_file;
  }
  if(!this.php_js.includes[filename]){
    this.php_js.includes[filename] = 1;
  }else{
    this.php_js.includes[filename]++;
  }
  return this.php_js.includes[filename];
}


