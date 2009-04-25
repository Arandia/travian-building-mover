// ==UserScript==
// @name           Travian Building Mover
// @namespace      Travian Building Mover
// @description    This repositions the buildings on the dorf2.php page
// @version        0.9.2
// @include        http://*.travian.*/dorf2.php*
// @license        GPL 3 or any later version
// ==/UserScript==

/*****************************************************************************
 * Copyright (C) 2009 Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/

// Look at where the original buildings are *first*
var data = [];
var poly = document.getElementsByName('map1')[0].childNodes;
var img = document.getElementById('lmid2').childNodes;
for (var i=1; i <= 20; i++){
    data[i] = [];

    data[i]['className'] = img[i].className;

    data[i]['title'] = poly[i+1].title;
    data[i]['href'] = poly[i+1].href;
}

// Get the user mappings...
var mapping = eval(GM_getValue('mapping', '({})'));

// Get the active village, to store the new mappings
// We don't have to worry about postfixes because we're only running on one page
var did = document.evaluate('//a[@class="active_vl"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.href.match('newdid=([0-9]*)')[1];

if (mapping[did] == undefined) mapping[did] = {};

function move(dest, src){
    //GM_log('Moving '+src+' to '+dest);
    img[src].className = data[dest].className;
    poly[dest- -1].title = data[src].title;
    poly[dest- -1].href = data[src].href;
}

// The index is the destination, the value the source
for (var i in mapping[did]) move(i, mapping[did][i]);

// Now we just need to figure out the user input method...
var div = document.createElement('div');
div.setAttribute('style', 'position:absolute; top:510px; left:155px; padding:2px; z-index:16; border:none; cursor:pointer');
div.innerHTML = '<img title="Swap Buildings" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCMRXhpZgAASUkqAAgAAAABAGmHBAABAAAAGgAAAAAAAAABAIaSAgBYAAAALAAAAAAAAABXaW5kb3dFeHQ6IDMwMzUsIDI2NzQNV2luZG93T3JnOiAwLCAwDUNvbnRlbnQ6IDEwLCAyNiwgMzAxMiwgMjY3Mg1JZ25vcmVkIE9wY29kZXM6DSQxMDUA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAHAAhAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A99d0ijaSRlRFBZmY4AA6kmvNvGmraxq/hbU7/Try50rTLaAzRSwZW4uQp3F89Y49oOAMM3BJUcNjeM/FUnjGy1PTNJ1BbKGxhmeWETHzbshWXy2CsuwHkgbm3cbh8rLW74r1vSb3wNrq22qWUxl024CCOdW3ExNjGDXzeb5rUpzhSwvWXvOz0WnlbXv5G1OC3keHyaTrrSanO+rXYazkZwlw7icwZJEnzHg4X/a57A9fdPgx/aZ8DyPqmoXV9I92/lyXMrSMqBEXaCScAMG4968T1G9guPFzzwvObK5tfsksoJudqOGDfMCxyDjGD+Fe6/DjUbC28GQRGYpm7vCu5GHy/aZdvb0xXqYSdZzans1fYuvGK2O6oqL7TD/z0WivQOY85u/gpoH2y8vdKubmwnuM7Y/vwRZVgQIxtJGW3DLHBAxwMV5trXwU8bWWsXE+kSwX0RIWOVplR3UD/lorcHpg5znvmvpSip5Ve9tR3Z8/f8IVd+DLTd4ljsbrStRRI7ow26R/Y5CoXcu0Y25wNwwc4ODXWfDW2stBvW8OX0mbjc0+ns2BHcx4GdoAwHUAEr3yX+bLEemX9hbanZyWl3EssEilXRhkEEYI/EEj8a+fvGM8nhvUbrw9Zu0lvYSLLZXEzFp7YhFddjjH3ScDIJxwc10RalHle62PPqxlRrKtB6S0kvya8+/c+iqKz/3/APz9y/8AfKf/ABNFYnef/9k=">';
document.getElementById('ltop1').parentNode.appendChild(div);

function notify(msg){
    var div = document.createElement('div');
    div.setAttribute('style', 'position:absolute; top:350px; left:400px; padding:2px; z-index:160; border:solid black 1px; background:#fff; -moz-border-radius:5px;');
    div.innerHTML = msg;
    document.getElementById('ltop1').parentNode.appendChild(div);

    window.setTimeout(function(){div.parentNode.removeChild(div);}, 3000);
}

div.addEventListener('click', function(){
        // Add listeners to all of the objects
        var stage = 0;
        var src;
        for (var i in poly)
            if (poly[i].href != undefined)
                poly[i].href = '#'+(poly[i].href.split('id=')[1] - 18);

        for (var i in img) img[i].addEventListener('click', function(e){
                var dest = e.target.href.split('#')[1];

                GM_log(e.target.title);
                if (stage == 0){
                    src = dest; // actually...

                    notify('<b>Click on the second one</b>');
                    stage++;
                } else {
                    var m = mapping[did];

                    //GM_log('src='+src+' dest='+dest);
                    // First, find who *holds* src right now
                    var temp = src;
                    while (m[temp] != undefined && m[temp] != src) temp = m[temp];
                    // Find who *holds* dest right now
                    var temp2 = dest;
                    while (m[temp2] != undefined && m[temp2] != dest) temp2 = m[temp2];
                    //GM_log('m['+temp+']='+dest);
                    //GM_log('m['+temp2+']='+src);
                    m[temp] = dest;
                    m[temp2] = src;

                    GM_setValue('mapping', uneval(mapping));
                    window.location.reload();
                }
            }, false);

        notify('<b>Click on the first building</b>');
    }, false);
