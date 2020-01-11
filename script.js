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
    }, 1000);
}

function Data(value) {
    if (value === null || value == "" || value <= 0) {
        value = 1;
    }
    var fetchUrl = 'https://cors-anywhere.herokuapp.com/http://api.tycoon.community:30120/status/data/' + value;
    fetch(fetchUrl)
    fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')));
    })
    .catch(function(err) {
        var fetchUrl = 'https://cors-anywhere.herokuapp.com/http://api.tycoon.community:30122/status/data/' + value;
        fetch(fetchUrl)
        fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')));
        })
        .catch(function(err) {
            var fetchUrl = 'https://cors-anywhere.herokuapp.com/http://api.tycoon.community:30123/status/data/' + value;
            fetch(fetchUrl)
            fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')));
            })
            .catch(function(err) {
                var save = document.getElementById('data').innerHTML;
                save += 'Could not load Data';
                document.getElementById('data').innerHTML = save;
            });
        });
    });

}

function toHTML(info){
    var save = document.getElementById('data').innerHTML;
    if (info.user_id == null) {
        save += 'Could not load Data';
    } else {
        save += '<div id="ID">';
        save +=     "ID:";
        save +=     info.user_id;
        save += '</div>';
/*
        save += '<div id="Groups">';
        save +=     "Groups:";
        save +=     info.data.groups;
        save += '</div>';
*/
        save += '<div id="Stats">';
        save +=     "Hunger:";
        save += '<div class="progress">';
        save += '<div class="bar_hunger"></div>';
        save += '<div class="percent_hunger">' + info.data.hunger; + '</div >';
        save += '</div>';
        save +=     "Thirst:";
        save += '<div class="progress">';
        save += '<div class="bar_thirst"></div>';
        save += '<div class="percent_thirst">' + info.data.thirst; + '</div >';
        save += '</div>';
        save +=     "Health:";
        save += '<div class="progress">';
        save += '<div class="bar_health"></div>';
        save += '<div class="percent_health">' + info.data.health; + '</div >';
        save += '</div>';
        save += '</div>';
        //levelFromExp(info.data.skills.physical.strength);
        //hasCooldown(info.data.licenses.corp_cooldown);

    }
    document.getElementById('data').innerHTML = save;
    document.getElementByClass("percent_health").style[left] = info.data.health + '%';
    document.getElementByClass("percent_thirst").style[left] = info.data.thirst + '%';
    document.getElementByClass("percent_hunger").style[left] = info.data.hunger + '%';
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
            return "No company cooldown";
        }
    } else {
        return "No company cooldown";
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
