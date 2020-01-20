var data = [];

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function Start() {
      var value = getUrlParam('id','2');
      data = [];
      for (i = 0 ;i<=500;i++) {
            if (i>0) {
                  data.push(data[i-1]+(i*5));
            } else {
                  data.push(0);
            }
      }
      setTimeout(function(){
            document.getElementById('data').innerHTML = '';
            setTimeout(function(){
                  Data(value);
            }, 500);
      }, 500);
}

function Data(value) {
      if (value === null || value == "" || value <= 0) {
            value = 1;
      }
      var fetchUrl = 'http://na.tycoon.community:30120/status/data/' + value;
      fetch(fetchUrl)
      fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.gaptitudes_v, JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.licenses, JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.groups);
      })
      .catch(function(err) {  
            var fetchUrl = 'http://api.tycoon.community:30120/status/data/' + value;
            fetch(fetchUrl)
            fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.gaptitudes_v, JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.licenses, JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')).data.groups);
            })
            .catch(function(err) {  
                  var save = document.getElementById('data').innerHTML;
                  save += '{"strength":"' + "ERROR" + '","cooldown":"'+ "ERROR" +'","inCompany":"' + "ERROR" + '"}';
                  document.getElementById('data').innerHTML = save;
            });
      });
      
}

function toHTML(skills, licenses, groups){
      var save = document.getElementById('data').innerHTML;
      save += '{"strength":"' + levelFromExp(skills.physical.strength) + '","cooldown":"'+ hasCooldown(licenses.corp_cooldown) +'","inCompany":"' + inCompany(groups) + '"}';
      document.getElementById('data').innerHTML = save;
}

function levelFromExp(g_Exp) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i])>g_Exp) {
            return i;
        } else if (parseInt(data[i])==g_Exp) {
            var save = document.getElementById('data').innerHTML;
            return i;
        } else if (i == data.length-1 && parseInt(data[i])<g_Exp) {
            return i;
        }
    }
}

function hasCooldown(val) {
      if (val >= 1) {
            console.log(val);
            console.log(Math.round((new Date()).getTime() / 1000));
            if (val > Math.round((new Date()).getTime() / 1000)) {
                  return timeConverter(val);
            } else {
                  return "false";
            }
      } else {
            return "false";
      }
}

function inCompany(val) {
      companys = ["corp1", "corp2", "corp3", "corp4", "corp5", "corp6", "corp7", "corp8", "corp9", "corp10", "corp11", "corp12", "corp13", "corp14", "corp15", "corp16"];
      var s = JSON.stringify(val);
      var n = 0;
      for (i = 0; i <companys.length; i++){
            n += s.search(companys[i]);
      }
      if (n <= -1) {
            return "false";
      } else {
            return "true";
      }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

Start();
