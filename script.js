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
            Data(value);
    }, 1000);
}

function Data(value) {
    if (value === null || value == "" || value <= 0) {
        value = 1;
    }
    var fetchUrl = 'https://api.tycoon.community:30120/status/data/' + value;
    fetch(fetchUrl)
    fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        toHTML(JSON.parse(doc.body.innerHTML.replace(/<\/?[^>]+>/gi, '')));
    })
    .catch(function(err) {
        var fetchUrl = 'https://api.tycoon.community:30123/status/data/' + value;
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
            console.log(err);
        });
    });

}

function toHTML(info){
    document.getElementById('data').innerHTML = '';
    var save = document.getElementById('data').innerHTML;
    if (info.user_id == null) {
        save += 'Could not load Data';
    } else {
        new Promise(function(resolve, reject) {
            setTimeout(() => resolve(1), 500);
        })
        .then(getID(info, save))
        .then(getStats(info, save))
        .then(getSkills(info.data.gaptitudes_v, save))
        .then(function(resolve, reject) {
            document.getElementById('data').innerHTML = save;
            document.getElementById('bar_health').style.width = (info.data.health-100) + '%';
            document.getElementById('bar_thirst').style.width = info.data.thirst + '%';
            document.getElementById('bar_hunger').style.width = info.data.hunger + '%';
            resolve();
        });
        //hasCooldown(info.data.licenses.corp_cooldown);
    }
}

function getID(info, save){
    return new Promise(function(resolve, reject) {
        save += '<div id="ID">';
        save +=     "ID: ";
        save +=     info.user_id;
        save += '</div>';
        console.log(1);
        resolve(save);
    });
}

function getStats(info, save){
    return new Promise(function(resolve, reject) {
        save += '<div id="stats">';
        save += '<div id="title">Stats</div>'
        save += '<div class="progress">';
        save += '<div id="bar_hunger"></div>';
        save += '<div id="percent_hunger">Hunger: ' + parseFloat(info.data.hunger).toFixed(2) + '%</div >';
        save += '</div>';
        save += '<div class="progress">';
        save += '<div id="bar_thirst"></div>';
        save += '<div id="percent_thirst">Thirst: ' + parseFloat(info.data.thirst).toFixed(2) + '%</div >';
        save += '</div>';
        save += '<div class="progress">';
        save += '<div id="bar_health"></div>';
        save += '<div id="percent_health">Health: ' + parseFloat((info.data.health-100)).toFixed(2) + '%</div >';
        save += '</div>';
        save += '</div>';
        save += '<br><br>';
        console.log(2);
        resolve(save);
    });
}

function getSkills(data, save){
    return new Promise(function(resolve, reject) {
        save += '<div id="title">Skills</div>'
        console.log(3);
        /*
        data.farming.mining
        data.farming.farming
        data.farming.fishing
        data.piloting.heli
        data.piloting.piloting
        data.piloting.cargos
        data.casino.casino
        data.trucking.garbage
        data.trucking.mechanic
        data.trucking.postop
        data.trucking.trucking
        data.physical.strength
        data.business.business
        data.hunting.skills
        data.player.player
        data.player.racing
        data.train.train
        data.train.bus
        */
    resolve(save);
});
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
//setInterval(() => Start(), 5000);
