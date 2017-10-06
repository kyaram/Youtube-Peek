var player;
var position;
var loading;

function start(h,w,t) {
    player = new YT.Player('previewVideo', {
    	height: h,
        width: w,
        videoId: t,
        playerVars: {controls: 0, showinfo: 0,},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': errEvent		     
        }
    })
}

function onPlayerReady(event) {
	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)sound\s*\=\s*([^;]*).*$)|^.*$/, "$1");	
	loading = $(position).find('#loadingBar');
	loading.css({ 'width': '50%' });
	var time = player.getDuration() / 2;
	event.target.setPlaybackQuality('small');

	if(!cookieValue){
		player.mute();
	} 
	event.target.setVolume(100);
 	event.target.seekTo(time);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
	var image = $(position).find('img');
	var image2 = $(position).find('.ytp-videowall-still-image');

	loading.css({ 'width': '100%' });
    if (event.data == YT.PlayerState.PLAYING) {
    	loading.css({  'opacity': '0' });
    	image.css({ 'opacity': '0' });
    	image2.css({ 'opacity': '0' });
    	$(position).find('.ytp-videowall-still-info-title').css({ 'opacity': '0' });
    	$(position).find('.ytp-videowall-still-info-author').css({ 'opacity': '0' });
    }
 }

function errEvent(event) {
	if(event.data){
		loading.css({ 'background-color': '#888888' });
	}
}

function receice(id) {
	$.ajax({
	    url: "https://www.youtube.com/watch?v="+id, 
	    success: function(response) {
	    	var li = /[\d,]+ likes/;
	    	var di = /[\d,]+ dislikes/;

	    	var lm = response.match(li);
	    	var dl = response.match(di);
			
	    	var nol  = lm[0].split(" ");
	    	var nodi = dl[0].split(" ");

	    	nol  = nol[0].replace(/\,/, '');
			nodi = nodi[0].replace(/\,/, '');

	    	var lpercentage = Math.floor((100 * nol) / (+nol + +nodi));

			var set = $(position).find('#ladrlikes');
	        set.css({ 'width': lpercentage+'%' });
	    }
	});
}

$(document).ready(function(){ 


    $('body').on('mouseenter', '#thumbnail', function() {

    	position = this;
		var likes_co = document.cookie.replace(/(?:(?:^|.*;\s*)likes_color\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var dislikes_co = document.cookie.replace(/(?:(?:^|.*;\s*)dislikes_color\s*\=\s*([^;]*).*$)|^.*$/, "$1");
 
  		$( this ).find('#mouseover-overlay').remove();
  		$( this ).find('ytd-thumbnail-overlay-resume-playback-renderer').remove();

  		$( this ).after( "<div id='previewVideo'></div>" );
  		$( this ).find('#overlays').after( "<div id='loadingBar' class='removeBar'></div>" );
		$( this ).find('#overlays').after( "<div id='ladr'><div id='ladrlikes'></div></div>" );

	    if(likes_co){
	    	var set2 = $(position).find('#ladr');
			var set = $(position).find('#ladrlikes');
	    	set.css({ 'background-color': likes_co});
	    	set2.css({ 'background-color': dislikes_co});
		}

		if(dislikes_co){
	    	var set2 = $(position).find('#ladr');
	    	set2.css({ 'background-color': dislikes_co});
		}

		var h = $(this).find('img')[0].clientHeight;
		var w = $(this).find('img')[0].clientWidth;

	 	var i = $(this).attr('href');
	    var t = i.substring(9,(i.length));
	    if(t.length > 11){
			t = t.substring(0, 11);
	    }

		receice(t);
     	start(h,w,t);
	
    }); 

    $('body').on('mouseleave', '#thumbnail', function() {
		$(this).find('img').css({ 'opacity': '1' });
		$(this).siblings( '#previewVideo' ).remove();
		$(this).find('#loadingBar').remove();
		$(this).find('#ladr').remove();
	});


	$('body').on('mouseenter', '.ytp-suggestion-set', function() {

		position = this;
		var likes_co = document.cookie.replace(/(?:(?:^|.*;\s*)likes_color\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var dislikes_co = document.cookie.replace(/(?:(?:^|.*;\s*)dislikes_color\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		$( this ).find('.ytp-videowall-still-image').after( "<div id='previewVideo'></div>" );
		$( this ).find('.ytp-videowall-still-image').after( "<div id='loadingBar' class='removeBar'></div>" );
		$( this ).find('.ytp-videowall-still-image').after( "<div id='ladr'><div id='ladrlikes'></div></div>" );

		if(likes_co){
	    	var set2 = $(position).find('#ladr');
			var set = $(position).find('#ladrlikes');
	    	set.css({ 'background-color': likes_co});
	    	set2.css({ 'background-color': dislikes_co});
		}

		if(dislikes_co){
	    	var set2 = $(position).find('#ladr');
	    	set2.css({ 'background-color': dislikes_co});
		}

		var h = $(this).find('.ytp-videowall-still-image')[0].clientHeight;
		var w = $(this).find('.ytp-videowall-still-image')[0].clientWidth;

		var i = $(this).attr('href');
	    var t = i.substring((i.length) - 11,(i.length));
	    if(t.length > 11){
			t = t.substring(0, 11);
	    }

		receice(t);
		start(h,w,t);

	}); 

	$( 'body' ).on('mouseleave', '.ytp-suggestion-set', function() {
		$(this).find('.ytp-videowall-still-image').css({ 'opacity': '1' });
		$(this).find('#previewVideo').remove();
		$(this).find('#loadingBar').remove();
		$(position).find('.ytp-videowall-still-info-title').css({ 'opacity': '1' });
		$(position).find('.ytp-videowall-still-info-author').css({ 'opacity': '1' });
		$(this).find('#ladr').remove();
	});
});

    
   