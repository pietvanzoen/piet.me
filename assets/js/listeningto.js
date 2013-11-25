var holder;

function loadListeningTo(username,holder_id){
    holder=holder_id;
    if (typeof holder=='undefined') holder='last_fm_tracks';
    loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=dee4ce450c3cbdcfce7ea7d0c4564120&_render=json&user='+username+'&_callback=processLast');
}

function loadJS(url){
    //cache is true by default
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src=url;
    // sets cache to roughly 1.6 mins
    var date = (+new Date())+'';
    date = date.substring('', date.length - 5)*100000;
    s.src+='&jpt='+date;
    document.getElementsByTagName('head')[0].appendChild(s);
}

function processLast(feed){
    var str = '',
        tracks= feed.value.items[0].recenttracks.track;
    if(tracks[0].nowplaying) {
        var link = 'http://www.rdio.com/artist/'+tracks[0].artist.content.replace(/ /g, '_')+'/album/'+tracks[0].album.content.replace(/ /g, '_')+'/';
        str+='Listening to: <a href="'+link+'">' + tracks[0].artist.content + ' - ' + tracks[0].name + '</a>';
    }
    document.getElementById(holder).innerHTML=str;
}