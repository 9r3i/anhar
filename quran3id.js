/* quran3.js */
var Q3PNG = 'quran3db/';
/* add menu */
ANHAR.menu.push({"href":"javascript:quran3_load_search_form()","title":"Cari kata dalam Quran","name":"Cari kata dalam Quran"});
ANHAR.menu.push({"href":"javascript:quran3_load_about()","title":"Tentang Aplikasi Quran","name":"Tentang Aplikasi Quran"});
load_menu();
/* load list if suroh */
quran3_load_list();
/* set the style */
gebtn('style')[0].innerHTML = '#daftar_suroh,#daftar_ayat{background-color:#bdf;margin:0px;padding:1px 0px;}.each-suroh{margin:1px 0px;padding:10px 10px;background-color:#fff;color:#333;}.each-suroh:hover{background-color:#bdf;}.each-ayah{margin:1px 0px;padding:10px 5px;background-color:#fff;color:#333;}.ayah-png{z-index:1;background-color:#fff;max-width:100%;}.ayah-indonesian{}strong.keyword{color:red;}em.keyword{color:#7b3;}.keterangan{margin:0px;padding:10px;background-color:#fff;}#q3select{margin-top:10px;}';
/* load about */
function quran3_load_about(){
  var content = gebi('content');
  content.innerHTML = '<div id="loading">Memproses...</div>';
  gebi('menu').style.display = 'none';
  onTop('SurohList');
  post('quran3id.json',function(res){
    var g = JSON.parse(res);
    content.innerHTML = '<div class="title">Tentang Aplikasi Quran</div>';
    if(g){
      content.innerHTML += '<div class="content">'+g.about+'</div>';
    }
  });
}
/* load suroh list */
function quran3_load_list(){
  var content = gebi('content');
  content.innerHTML = '<div id="loading">Memproses...</div>';
  gebi('menu').style.display = 'none';
  onTop('SurohList');
  post('quran3iddb.json',function(res){
    var qDB = JSON.parse(res);
    var content = gebi('content');
    if(!qDB){
      content.innerHTML = '<div class="keterangan">Gagal menampilkan daftar suroh.<br />Silahkan coba lagi.</div>';
      return;
    }
    content.innerHTML = '<div class="title">Daftar Suroh</div>';
    content.innerHTML += '<div id="daftar_suroh">';
    var ds = gebi('daftar_suroh');
    for(var key in qDB){
      ds.innerHTML += '<a href="javascript:quran3_load(\''+key+'\')"><div class="each-suroh">'+qDB[key].number+'. '+qDB[key].name+'</div></a>';
    }
  });
}
/* load ayat list */
function quran3_load(id,go){
  var content = gebi('content');
  content.innerHTML = '<div id="loading">Memproses...</div>';
  onTop(id);
  post('quran3iddb.json',function(res){
    var qDB = JSON.parse(res);
    var content = gebi('content');
    if(!qDB){
      content.innerHTML = '<div class="keterangan">Gagal menampilkan daftar ayat.<br />Silahkan coba lagi.</div>';
      return;
    }
    content.innerHTML = '<div class="form"><select onchange="javascript:quran3_load(this.value)" id="q3select" class="input"></select></div>';
    var ds = gebi('q3select');
    ds.innerHTML += '<option value="">--- Pilih Suroh ---</option>';
    for(var key in qDB){
      ds.innerHTML += '<option value="'+key+'"'+(key==id?' selected="selected"':'')+'>'+qDB[key].number+'. '+qDB[key].name+'</option>';
    }
    if(qDB[id]){
      if(go){onTop(go,true);}
      else{onTop(qDB[id].name);}
      content.innerHTML += '<div class="title">'+qDB[id].number+'. '+qDB[id].name+'</div>';
      content.innerHTML += '<div id="daftar_ayat">';
      var da = gebi('daftar_ayat');
      var ayat = qDB[id].ayat;
      var count = 0;
      for(var i in ayat){
        count++;
        if(count<10){var img = '00'+(count).toString();}
        else if(count<100){var img = '0'+(count).toString();}
        else{var img = (count).toString();}
        da.innerHTML += '<div class="each-ayah" id="'+id+'_'+i+'"><div class="ayah-png"><img width="100%" src="'+Q3PNG+qDB[id].number+'_'+img+'.png" alt="" /></div><div class="ayah-indonesian">'+ayat[i].indonesian+'</div></div>';
      }
    }else{
      content.innerHTML += '<div class="keterangan">Gagal menampilkan daftar ayat.<br />Silahkan coba lagi.</div>';
      return;
    }
  });
}
/* load serching form */
function quran3_load_search_form(){
  var content = gebi('content');
  onTop('searchForm');
  gebi('menu').style.display = 'none';
  content.innerHTML = '<div class="title">Cari Kata</div><div class="form"><table><tbody><tr><td><div class="divinput"><input class="input" id="keyword" type="text" placeholder="Kata Kunci" /></div></td><td><input onclick="quran3_load_search_result()" class="submit" type="submit" id="submit" value="Cari" /></td></tr></tbody></table></div>';
  var input = gebi('keyword');
  onkeyup = function(e){
    if(e.keyCode==13){
      return quran3_load_search_result();
    }
  };
}
/* load search result */
function quran3_load_search_result(){
  var content = gebi('content');
  var key = gebi('keyword');
  var keyword = key.value;
  content.innerHTML = '<div id="loading">Mencari <span class="keyword">'+keyword+'</span>...</div>';
  onTop('searchResult');
  post('quran3iddb.json',function(res){
    var qDB = JSON.parse(res);
    var content = gebi('content');
    content.innerHTML = '<div class="title">Hasil Pencarian</div>';
    if(!qDB){
      content.innerHTML += '<div class="keterangan">Gagal mencari <em class="keyword">'+keyword+'</em></div>';
      return;
    }
    content.innerHTML += '<div class="keterangan">Hasil pencarian: <em class="keyword">'+keyword+'</em></div><div id="daftar_ayat"></div>';
    var da = gebi('daftar_ayat');
    var count = 0;
    for(var s in qDB){
      var suroh = qDB[s].ayat;
      for(var a in suroh){
        var indo = suroh[a].indonesian;
        if(indo.match(keyword)){
          count++;
          da.innerHTML += '<div class="each-ayah"><div class="ayah-indonesian"><a href="javascript:quran3_load(\''+s+'\',\''+s+'_'+a+'\')">'+qDB[s].name+'</a>: '+indo.replace(keyword,'<strong class="keyword">'+keyword+'</strong>')+'</div></div>';
        }
      }
    }
    if(count==0){
      da.innerHTML += '<div class="each-ayah">Maaf, <strong class="keyword">'+keyword+'</strong> tidak ditemukan.</div>';
    }
  });
}
