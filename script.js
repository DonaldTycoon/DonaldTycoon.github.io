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
    for (i = 0 ;i<=1000;i++) {
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

function sorting(array) {
      var data = [];
      for (var i=0; i<array.length;i++) {
            if (contains(data, array[i].name)) {
                  var amount = parseInt(data[contains2(data, array[i].name)].amount);
                  amount += parseInt(array[i].amount);
                  data[contains2(data, array[i].name)].amount = amount;
            } else {
                  data.push(array[i]);
            }
      }
      return data;
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
        .then(new Promise(function(resolve, reject) {
            resolve(write(inventory(info.data ,getSkills(info.data, getStats(info, getID(info, save))))));
        }))
        .then(new Promise(function(resolve, reject) {
            design(info);
            resolve();
        }));
        //hasCooldown(info.data.licenses.corp_cooldown);
    }
}

function write(save) {
    document.getElementById('data').innerHTML = save;
}

function getID(info, save){
    save += '<div id="ID">';
    save +=     "ID: ";
    save +=     info.user_id;
    save += '</div>';
    return(save);
}

function getStats(info, save){
    save += '<div id="stats">';
    save += '<div id="title">Stats</div>';
    save += '<div class="progress">';
    save += '<div class="bar" id="bar_hunger"></div>';
    save += '<div class="bar-two" style="background-color: #8b46004d"></div>';
    save += '<div id="percent_stats"><div id="percent_skillstwo">Hunger: ' + parseFloat(info.data.hunger).toFixed(2) + '%</div ></div >';
    save += '</div>';
    save += '<div class="progress">';
    save += '<div class="bar" id="bar_thirst"></div>';
    save += '<div class="bar-two" style="background-color: #002eac4d"></div>';
    save += '<div id="percent_stats"><div id="percent_skillstwo">Thirst: ' + parseFloat(info.data.thirst).toFixed(2) + '%</div ></div >';
    save += '</div>';
    save += '<div class="progress">';
    save += '<div class="bar" id="bar_health"></div>';
    save += '<div class="bar-two" style="background-color: #0087024d"></div>';
    save += '<div id="percent_stats"><div id="percent_skillstwo">Health: ' + parseFloat((info.data.health-100)).toFixed(2) + '%</div ></div >';
    save += '</div></div>';
    return(save);
}

function getSkills(data, save){
    save += '<div id="Skills">';
    save += '<div id="title">Skills</div>';
    save += '<div id="skill-title">Business Level:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_business"></div>';
    save += '<div class="bar-two" id="bar_two_business"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Business | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.business.business, data.gaptitudes.business.business)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.business.business, data.gaptitudes.business.business))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div id="skill-title">Casino:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_casino"></div>';
    save += '<div class="bar-two" id="bar_two_casino"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Casino | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.casino.casino, data.gaptitudes.casino.casino)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.casino.casino, data.gaptitudes.casino.casino))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">EMS Level:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_ems"></div>';
    save += '<div class="bar-two" id="bar_two_ems"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">EMS | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.ems.ems, data.gaptitudes.ems.ems)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.ems.ems, data.gaptitudes.ems.ems))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Gathering Industries:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_mining"></div>';
    save += '<div class="bar-two" id="bar_two_mining"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Mining | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.farming.mining, data.gaptitudes.farming.mining)))) + '  / 50 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.farming.mining, data.gaptitudes.farming.mining))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_farming"></div>';
    save += '<div class="bar-two" id="bar_two_farming"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Farming | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.farming.farming, data.gaptitudes.farming.farming)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.farming.farming, data.gaptitudes.farming.farming))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_fishing"></div>';
    save += '<div class="bar-two" id="bar_two_fishing"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Fishing | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.farming.fishing, data.gaptitudes.farming.fishing)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.farming.fishing, data.gaptitudes.farming.fishing))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Hunting:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_hunting"></div>';
    save += '<div class="bar-two" id="bar_two_hunting"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Hunting | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.hunting.skill, data.gaptitudes.hunting.skill)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.hunting.skill, data.gaptitudes.hunting.skill))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Physical:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_strenth"></div>';
    save += '<div class="bar-two" id="bar_two_strenth"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Strength | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.physical.strength, data.gaptitudes.physical.strength)))) + '  / 30 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.physical.strength, data.gaptitudes.physical.strength))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Piloting:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_cargos"></div>';
    save += '<div class="bar-two" id="bar_two_cargos"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Cargo Pilot | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.cargos, data.gaptitudes.piloting.cargos)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.cargos, data.gaptitudes.piloting.cargos))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_heli"></div>';
    save += '<div class="bar-two" id="bar_two_heli"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Helicopter Pilot | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.heli, data.gaptitudes.piloting.heli)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.heli, data.gaptitudes.piloting.heli))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_piloting"></div>';
    save += '<div class="bar-two" id="bar_two_piloting""></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Airline Pilot | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.piloting, data.gaptitudes.piloting.piloting)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.piloting.piloting, data.gaptitudes.piloting.piloting))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Gathering Industries:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_player"></div>';
    save += '<div class="bar-two" id="bar_two_player"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Player | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.player.player, data.gaptitudes.player.player)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.player.player, data.gaptitudes.player.player))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_racing"></div>';
    save += '<div class="bar-two" id="bar_two_racing"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Racing | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.player.racing, data.gaptitudes.player.racing)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.player.racing, data.gaptitudes.player.racing))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Public Transport:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_bus"></div>';
    save += '<div class="bar-two" id="bar_two_bus"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Bus Driver | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.train.bus,data.gaptitudes.train.bus)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.train.bus, data.gaptitudes.train.bus))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_train"></div>';
    save += '<div class="bar-two" id="bar_two_train"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Conductor | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.train.train, data.gaptitudes.train.train)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.train.train, data.gaptitudes.train.train))) + ' EXP)</i></div ></div >';
    save += '</div>';

    save += '<div id="skill-title">Trucking:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_garbage"></div>';
    save += '<div class="bar-two" id="bar_two_garbage"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Garbage Collections | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.garbage, data.gaptitudes.trucking.garbage)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.garbage, data.gaptitudes.trucking.garbage))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_mechanic"></div>';
    save += '<div class="bar-two" id="bar_two_mechanic"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Mechanic | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.mechanic, data.gaptitudes.trucking.mechanic)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.mechanic, data.gaptitudes.trucking.mechanic))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_postop"></div>';
    save += '<div class="bar-two" id="bar_two_postop"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">PostOP | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.postop, data.gaptitudes.trucking.postop)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.postop, data.gaptitudes.trucking.postop))) + ' EXP)</i></div ></div >';
    save += '</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_trucking"></div>';
    save += '<div class="bar-two" id="bar_two_trucking"></div>';
    save += '<div id="percent_skills"><div id="percent_skillstwo">Trucking | Level ' + levelFromExp(Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.trucking, data.gaptitudes.trucking.trucking)))) + '  / 100 <i>(' + Math.round(parseFloat(Choose(data.gaptitudes_v.trucking.trucking, data.gaptitudes.trucking.trucking))) + ' EXP)</i></div ></div >';
    save += '</div></div>';


    return(save);
}

function inventory(data, save) {
    save += '<div id="Inventory">';


    save += '</div>';
    return(save);
}

function Choose(value, data) {
    if (parseFloat(value) == 10) {
        return  data;
    } else {
        return value;
    }
}

function levelFromExp(g_Exp) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i])>g_Exp) {
            return i-1;
        } else if (parseInt(data[i])==g_Exp) {
            var save = document.getElementById('data').innerHTML;
            return i;
        } else if (i == data.length-1 && parseInt(data[i])<g_Exp) {
            return i;
        }
    }
}

function percentage(g_Exp) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i])>g_Exp) {
            return ((g_Exp - data[i-1])/(data[i]- data[i-1]))*100;
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

function design(info) {
    document.getElementById('bar_health').style.width = (info.data.health-100) + '%';
    document.getElementById('bar_thirst').style.width = info.data.thirst + '%';
    document.getElementById('bar_hunger').style.width = info.data.hunger + '%';
    if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.business.business, info.data.gaptitudes.business.business)))>=100) {
        document.getElementById('bar_uncompleted_business').style.width = '100%';
        document.getElementById('bar_uncompleted_business').style.background = '#e4c000';
        document.getElementById('bar_two_business').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_business').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.business.business, info.data.gaptitudes.business.business)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.casino.casino, info.data.gaptitudes.casino.casino))))>=100) {
        document.getElementById('bar_uncompleted_casino').style.width = '100%';
        document.getElementById('bar_uncompleted_casino').style.background = '#e4c000';
        document.getElementById('bar_two_casino').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_casino').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.casino.casino, info.data.gaptitudes.casino.casino)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.ems.ems, info.data.gaptitudes.ems.ems))))>=100) {
        document.getElementById('bar_uncompleted_ems').style.width = '100%';
        document.getElementById('bar_uncompleted_ems').style.background = '#e4c000';
        document.getElementById('bar_two_ems').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_ems').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.ems.ems, info.data.gaptitudes.ems.ems)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.farming, info.data.gaptitudes.farming.farming))))>=100) {
        document.getElementById('bar_uncompleted_farming').style.width = '100%';
        document.getElementById('bar_uncompleted_farming').style.background = '#e4c000';
        document.getElementById('bar_two_farming').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_farming').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.farming, info.data.gaptitudes.farming.farming)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.fishing, info.data.gaptitudes.farming.fishing))))>=100) {
        document.getElementById('bar_uncompleted_fishing').style.width = '100%';
        document.getElementById('bar_uncompleted_fishing').style.background = '#e4c000';
        document.getElementById('bar_two_fishing').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_fishing').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.fishing, info.data.gaptitudes.farming.fishing)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.mining, info.data.gaptitudes.farming.mining))))>=50) {
        document.getElementById('bar_uncompleted_mining').style.width = '100%';
        document.getElementById('bar_uncompleted_mining').style.background = '#e4c000';
        document.getElementById('bar_two_mining').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_mining').style.width = (percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.farming.mining, info.data.gaptitudes.farming.mining))))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.hunting.skill, info.data.gaptitudes.hunting.skill))))>=100) {
        document.getElementById('bar_uncompleted_hunting').style.width = '100%';
        document.getElementById('bar_uncompleted_hunting').style.background = '#e4c000';
            document.getElementById('bar_two_hunting').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_hunting').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.hunting.skill, info.data.gaptitudes.hunting.skill)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.physical.strength, info.data.gaptitudes.physical.strength))))>=30) {
        document.getElementById('bar_uncompleted_strenth').style.width = '100%';
        document.getElementById('bar_uncompleted_strenth').style.background = '#e4c000';
        document.getElementById('bar_two_strenth').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_strenth').style.width = (percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.physical.strength, info.data.gaptitudes.physical.strength))))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.cargos, info.data.gaptitudes.piloting.cargos))))>=100) {
        document.getElementById('bar_uncompleted_cargos').style.width = '100%';
        document.getElementById('bar_uncompleted_cargos').style.background = '#e4c000';
        document.getElementById('bar_two_cargos').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_cargos').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.cargos, info.data.gaptitudes.piloting.cargos)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.heli, info.data.gaptitudes.piloting.heli))))>=100) {
        document.getElementById('bar_uncompleted_heli').style.width = '100%';
        document.getElementById('bar_uncompleted_heli').style.background = '#e4c000';
        document.getElementById('bar_two_heli').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_heli').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.heli, info.data.gaptitudes.piloting.heli)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.piloting, info.data.gaptitudes.piloting.piloting))))>=100) {
        document.getElementById('bar_uncompleted_piloting').style.width = '100%';
        document.getElementById('bar_uncompleted_piloting').style.background = '#e4c000';
        document.getElementById('bar_two_piloting').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_piloting').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.piloting.piloting, info.data.gaptitudes.piloting.piloting)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.player.player, info.data.gaptitudes.player.player))))>=100) {
        document.getElementById('bar_uncompleted_player').style.width = '100%';
        document.getElementById('bar_uncompleted_player').style.background = '#e4c000';
        document.getElementById('bar_two_player').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_player').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.player.player, info.data.gaptitudes.player.player)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.player.racing, info.data.gaptitudes.player.racing))))>=100) {
        document.getElementById('bar_uncompleted_racing').style.width = '100%';
        document.getElementById('bar_uncompleted_racing').style.background = '#e4c000';
        document.getElementById('bar_two_racing').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_racing').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.player.racing, info.data.gaptitudes.player.racing)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.train.bus, info.data.gaptitudes.train.bus))))>=100) {
        document.getElementById('bar_uncompleted_bus').style.width = '100%';
        document.getElementById('bar_uncompleted_bus').style.background = '#e4c000';
        document.getElementById('bar_two_bus').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_bus').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.train.bus, info.data.gaptitudes.train.bus)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.train.train, info.data.gaptitudes.train.train))))>=100) {
        document.getElementById('bar_uncompleted_train').style.width = '100%';
        document.getElementById('bar_uncompleted_train').style.background = '#e4c000';
        document.getElementById('bar_two_train').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_train').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.train.train, info.data.gaptitudes.train.train)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.garbage, info.data.gaptitudes.trucking.garbage))))>=100) {
        document.getElementById('bar_uncompleted_garbage').style.width = '100%';
        document.getElementById('bar_uncompleted_garbage').style.background = '#e4c000';
        document.getElementById('bar_two_garbage').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_garbage').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.garbage, info.data.gaptitudes.trucking.garbage)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.mechanic, info.data.gaptitudes.trucking.mechanic))))>=100) {
        document.getElementById('bar_uncompleted_mechanic').style.width = '100%';
        document.getElementById('bar_uncompleted_mechanic').style.background = '#e4c000';
        document.getElementById('bar_two_mechanic').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_mechanic').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.mechanic, info.data.gaptitudes.trucking.mechanic)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.postop, info.data.gaptitudes.trucking.postop))))>=100) {
        document.getElementById('bar_uncompleted_postop').style.width = '100%';
        document.getElementById('bar_uncompleted_postop').style.background = '#e4c000';
        document.getElementById('bar_two_postop').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_postop').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.postop, info.data.gaptitudes.trucking.postop)))) + '%';
    }
    if (levelFromExp(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.trucking, info.data.gaptitudes.trucking.trucking))))>=100) {
        document.getElementById('bar_uncompleted_trucking').style.width = '100%';
        document.getElementById('bar_uncompleted_trucking').style.background = '#e4c000';
        document.getElementById('bar_two_trucking').style.background = '#FFFFFF00';
    } else {
        document.getElementById('bar_uncompleted_trucking').style.width = percentage(Math.round(parseFloat(Choose(info.data.gaptitudes_v.trucking.trucking, info.data.gaptitudes.trucking.trucking)))) + '%';
    }
}

Start();
//setInterval(() => Start(), 5000);
