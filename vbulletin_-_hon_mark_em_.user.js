// ==UserScript==
// @name         vBulletin - HoN Mark EM Players
// @description  Marks EM players with an icon on the forums
// @include      http://forums.heroesofnewerth.com/showthread.php*
// @version	 0.2
// ==/UserScript==

// This is a percentage of games played, over this and it will mark them
var em_percentage_limit = 50;

// Don't change these unless you really know what you're doing
var xml_master_host = "xml.heroesofnewerth.com";
var xml_master_url = "/xml_requester.php";
var member_pattern = /member.php\?u=(\d*)$/;
var outcomes = eval(GM_getValue("em_players"));

// DONT CHANGE ANYTHING BELOW HERE UNLESS YOU KNOW THAT DOING SO COULD
// BREAK EVERYTHING, BLOW UP YOUR MACHINE AND RUN AWAY WITH YOUR WIFE

if (!outcomes) {
    var outcomes = new Array();
}

/**
 * Removes duplicates in the array 'a'
 * @author Johan K�nng�rd, http://dev.kanngard.net
 */
function unique(a) {
    tmp = new Array(0);
    for (i = 0; i < a.length; i++) {
        if (!contains(tmp, a[i])) {
            tmp.length += 1;
            tmp[tmp.length - 1] = a[i];
        }
    }
    return tmp;
}

/**
 * Returns true if 's' is contained in the array 'a'
 * @author Johan K�nng�rd, http://dev.kanngard.net
 */
function contains(a, e) {
    for (j = 0; j < a.length; j++) if (a[j] == e) return true;
    return false;
}


// Mark the player with the icon and change the colour of their username
function mark_em_player(user) {
    for (a in document.links) {
        if (document.links[a].href.match(member_pattern)) {
            if (document.links[a].href.replace("http://forums.heroesofnewerth.com/member.php?u=", "") == user) {
                if (document.links[a].text != 'View Public Profile') {
                    document.links[a].style.background = "url('http://forums.heroesofnewerth.com/images/buttons/redcard.gif') no-repeat";
                    document.links[a].style.padding = "0 0 0 20px";
                    document.links[a].style.color = "red";
                    document.links[a].title = 'This person is predicted to be an EM player';
                }
            }
        }
    }
}

// Fetch the player stats from the XML server
function get_player_stats(user) {
    GM_xmlhttpRequest({
        method: "post",
        url: "http://" + xml_master_host + xml_master_url,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        data: encodeURI("f=player_stats&opt=aid&aid[]=" + user),
        onload: function (e) {
            parse_player_stats(e.responseText, user);
        }
    });
}

// Parse the stats back from the XML server
function parse_player_stats(stats, user) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(stats, "text/xml");
    em_games = 0;
    total_games = 0;
    for (a in xmlDoc.getElementsByTagName("stat")) {
        if (xmlDoc.getElementsByTagName("stat")[a].getAttribute('name') == "acc_em_played") {
            em_games = xmlDoc.getElementsByTagName("stat")[a].textContent
        }
        if (xmlDoc.getElementsByTagName("stat")[a].getAttribute('name') == "acc_games_played") {
            total_games = xmlDoc.getElementsByTagName("stat")[a].textContent
        }
    }
    percentage = ((em_games / total_games) * 100);
    if (percentage > em_percentage_limit) {
        // Push and save so that if they navigate away we keep the data
        outcomes.push(user);
        GM_setValue("em_players", uneval(outcomes));
        mark_em_player(user);
    }
}

(function () {
    var found_users = new Array();

    for (a in document.links) {
        if (document.links[a].href.match(member_pattern)) {
            found_users.push(document.links[a].href.replace("http://forums.heroesofnewerth.com/member.php?u=", ""));
        }
    }

    // Remove the first as this is the current logged in user
    found_users = unique(found_users).splice(1);

    //unsafeWindow.console.info(found_users);
    for (a in found_users) {
        if (contains(outcomes, found_users[a])) {
            unsafeWindow.console.info("Marking " + found_users[a]);
            mark_em_player(found_users[a]);
        } else {
            unsafeWindow.console.info("Fetching " + found_users[a]);
            get_player_stats(found_users[a]);
        }
    }

} ());