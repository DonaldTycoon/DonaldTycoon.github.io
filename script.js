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
        .then(new Promise(function(resolve, reject) {
            resolve(write(getSkills(info.data.gaptitudes_v, getStats(info, getID(info, save)))));
        }))
        .then(new Promise(function(resolve, reject) {
            document.getElementById('bar_health').style.width = (info.data.health-100) + '%';
            document.getElementById('bar_thirst').style.width = info.data.thirst + '%';
            document.getElementById('bar_hunger').style.width = info.data.hunger + '%';
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.business.business)))>=100) {
                document.getElementById('bar_uncompleted_business').style.width = '100%';
                document.getElementById('bar_uncompleted_business').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_business').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.business.business))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.casino.casino)))>=100) {
                document.getElementById('bar_uncompleted_casino').style.width = '100%';
                document.getElementById('bar_uncompleted_casino').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_casino').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.casino.casino))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.ems.ems)))>=100) {
                document.getElementById('bar_uncompleted_ems').style.width = '100%';
                document.getElementById('bar_uncompleted_ems').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_ems').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.ems.ems))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.farming)))>=100) {
                document.getElementById('bar_uncompleted_farming').style.width = '100%';
                document.getElementById('bar_uncompleted_farming').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_farming').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.farming))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.fishing)))>=100) {
                document.getElementById('bar_uncompleted_fishing').style.width = '100%';
                document.getElementById('bar_uncompleted_fishing').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_fishing').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.fishing))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.mining)))>=50) {
                document.getElementById('bar_uncompleted_mining').style.width = '100%';
                document.getElementById('bar_uncompleted_mining').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_mining').style.width = (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.farming.mining)))*2) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.hunting.skill)))>=100) {
                document.getElementById('bar_uncompleted_hunting').style.width = '100%';
                document.getElementById('bar_uncompleted_hunting').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_hunting').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.hunting.skill))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.physical.strength)))>=30) {
                document.getElementById('bar_uncompleted_strenth').style.width = '100%';
                document.getElementById('bar_uncompleted_strenth').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_strenth').style.width = (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.physical.strength)))*3.3) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.cargos)))>=100) {
                document.getElementById('bar_uncompleted_cargos').style.width = '100%';
                document.getElementById('bar_uncompleted_cargos').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_cargos').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.cargos))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.heli)))>=100) {
                document.getElementById('bar_uncompleted_heli').style.width = '100%';
                document.getElementById('bar_uncompleted_heli').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_heli').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.heli))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.piloting)))>=100) {
                document.getElementById('bar_uncompleted_piloting').style.width = '100%';
                document.getElementById('bar_uncompleted_piloting').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_piloting').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.piloting.piloting))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.player.player)))>=100) {
                document.getElementById('bar_uncompleted_player').style.width = '100%';
                document.getElementById('bar_uncompleted_player').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_player').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.player.player))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.player.racing)))>=100) {
                document.getElementById('bar_uncompleted_racing').style.width = '100%';
                document.getElementById('bar_uncompleted_racing').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_racing').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.player.racing))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.train.bus)))>=100) {
                document.getElementById('bar_uncompleted_bus').style.width = '100%';
                document.getElementById('bar_uncompleted_bus').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_bus').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.train.bus))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.train.train)))>=100) {
                document.getElementById('bar_uncompleted_train').style.width = '100%';
                document.getElementById('bar_uncompleted_train').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_train').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.train.train))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.garbage)))>=100) {
                document.getElementById('bar_uncompleted_garbage').style.width = '100%';
                document.getElementById('bar_uncompleted_garbage').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_garbage').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.garbage))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.mechanic)))>=100) {
                document.getElementById('bar_uncompleted_mechanic').style.width = '100%';
                document.getElementById('bar_uncompleted_mechanic').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_mechanic').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.mechanic))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.postop)))>=100) {
                document.getElementById('bar_uncompleted_postop').style.width = '100%';
                document.getElementById('bar_uncompleted_postop').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_postop').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.postop))) + '%';
            }
            if (levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.trucking)))>=100) {
                document.getElementById('bar_uncompleted_trucking').style.width = '100%';
                document.getElementById('bar_uncompleted_trucking').style.backgroundcolor = '#B39700';
            } else {
                document.getElementById('bar_uncompleted_trucking').style.width = levelFromExp(Math.round(parseFloat(info.data.gaptitudes_v.trucking.trucking))) + '%';
            }
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
    save += '<div id="percent_stats">Hunger: ' + parseFloat(info.data.hunger).toFixed(2) + '%</div >';
    save += '</div>';
    save += '<div class="progress">';
    save += '<div class="bar" id="bar_thirst"></div>';
    save += '<div class="bar-two" style="background-color: #002eac4d"></div>';
    save += '<div id="percent_stats">Thirst: ' + parseFloat(info.data.thirst).toFixed(2) + '%</div >';
    save += '</div>';
    save += '<div class="progress">';
    save += '<div class="bar" id="bar_health"></div>';
    save += '<div class="bar-two" style="background-color: #0087024d"></div>';
    save += '<div id="percent_stats">Health: ' + parseFloat((info.data.health-100)).toFixed(2) + '%</div >';
    save += '</div></div>';
    return(save);
}

function getSkills(data, save){
    save += '<div id="Skills">';
    save += '<div id="title">Skills</div>';
    save += '<div id="skill-title">Business Level:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_business"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Business | Level ' + levelFromExp(Math.round(parseFloat(data.business.business))) + '  / 100 <i>(' + Math.round(parseFloat(data.business.business)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div id="skill-title">Casino:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_casino"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Casino | Level ' + levelFromExp(Math.round(parseFloat(data.casino.casino))) + '  / 100 <i>(' + Math.round(parseFloat(data.casino.casino)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">EMS Level:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_ems"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">EMS | Level ' + levelFromExp(Math.round(parseFloat(data.ems.ems))) + '  / 100 <i>(' + Math.round(parseFloat(data.ems.ems)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Gathering Industries:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_mining"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Mining | Level ' + levelFromExp(Math.round(parseFloat(data.farming.mining))) + '  / 50 <i>(' + Math.round(parseFloat(data.farming.mining)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_farming"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Farming | Level ' + levelFromExp(Math.round(parseFloat(data.farming.farming))) + '  / 100 <i>(' + Math.round(parseFloat(data.farming.farming)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_fishing"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Fishing | Level ' + levelFromExp(Math.round(parseFloat(data.farming.fishing))) + '  / 100 <i>(' + Math.round(parseFloat(data.farming.fishing)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Hunting:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_hunting"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Hunting | Level ' + levelFromExp(Math.round(parseFloat(data.hunting.skill))) + '  / 100 <i>(' + Math.round(parseFloat(data.hunting.skill)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Physical:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_strenth"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Strength | Level ' + levelFromExp(Math.round(parseFloat(data.physical.strength))) + '  / 30 <i>(' + Math.round(parseFloat(data.physical.strength)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Piloting:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_cargos"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Cargo Pilot | Level ' + levelFromExp(Math.round(parseFloat(data.piloting.cargos))) + '  / 100 <i>(' + Math.round(parseFloat(data.piloting.cargos)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_heli"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Helicopter Pilot | Level ' + levelFromExp(Math.round(parseFloat(data.piloting.heli))) + '  / 100 <i>(' + Math.round(parseFloat(data.piloting.heli)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_piloting"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Airline Pilot | Level ' + levelFromExp(Math.round(parseFloat(data.piloting.piloting))) + '  / 100 <i>(' + Math.round(parseFloat(data.piloting.piloting)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Gathering Industries:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_player"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Player | Level ' + levelFromExp(Math.round(parseFloat(data.player.player))) + '  / 100 <i>(' + Math.round(parseFloat(data.player.player)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_racing"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Racing | Level ' + levelFromExp(Math.round(parseFloat(data.player.racing))) + '  / 100 <i>(' + Math.round(parseFloat(data.player.racing)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Public Transport:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_bus"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Bus Driver | Level ' + levelFromExp(Math.round(parseFloat(data.train.bus))) + '  / 100 <i>(' + Math.round(parseFloat(data.train.bus)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_train"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Conductor | Level ' + levelFromExp(Math.round(parseFloat(data.train.train))) + '  / 100 <i>(' + Math.round(parseFloat(data.train.train)) + ' EXP)</i></div >';
    save += '</div></div>';

    save += '<div id="skill-title">Trucking:</div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_garbage"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Garbage Collections | Level ' + levelFromExp(Math.round(parseFloat(data.trucking.garbage))) + '  / 100 <i>(' + Math.round(parseFloat(data.trucking.garbage)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_mechanic"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Mechanic | Level ' + levelFromExp(Math.round(parseFloat(data.trucking.mechanic))) + '  / 100 <i>(' + Math.round(parseFloat(data.trucking.mechanic)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_postop"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">PostOP | Level ' + levelFromExp(Math.round(parseFloat(data.trucking.postop))) + '  / 100 <i>(' + Math.round(parseFloat(data.trucking.postop)) + ' EXP)</i></div >';
    save += '</div></div>';
    save += '<div class="progress-two">';
    save += '<div class="bar" id="bar_uncompleted_trucking"></div>';
    save += '<div class="bar-two" style="background-color: #0063CA4d"></div>';
    save += '<div id="percent_skills">Trucking | Level ' + levelFromExp(Math.round(parseFloat(data.trucking.trucking))) + '  / 100 <i>(' + Math.round(parseFloat(data.trucking.trucking)) + ' EXP)</i></div >';
    save += '</div></div></div>';
    return(save);
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
