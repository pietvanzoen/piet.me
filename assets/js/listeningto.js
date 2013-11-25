var holder;

function loadListeningTo(username,holder_id){
    holder=holder_id;
    if (typeof holder=='undefined') holder='last_fm_tracks';
    loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=dee4ce450c3cbdcfce7ea7d0c4564120&_render=json&user='+username+'&_callback=processLast',false);
}

function loadJS(url,cache){
    //cache is true by default
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src=url;
    if (cache===false) {
        s.src+='&jpt='+ (+new Date());
    }
    document.getElementsByTagName('head')[0].appendChild(s);
}

function processLast(feed){
    var str = '',
        tracks= feed.value.items[0].recenttracks.track;
    if(tracks[0].nowplaying) {
        var link = 'http://www.rdio.com/artist/'+tracks[0].artist.content.replace(/ /g, '_')+'/album/'+tracks[0].album.content.replace(/ /g, '_')+'/';
        str+='Listening to <a href="'+link+'">' + tracks[0].artist.content + ' - ' + tracks[0].name + '</a> right now.';
    }
    document.getElementById(holder).innerHTML=str;
}