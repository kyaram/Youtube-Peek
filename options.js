$(document).ready(function(){ 

    chrome.cookies.get({"url": "https://www.youtube.com/", "name": "sound"}, function(cookie) {
        if(cookie){
            $('input[name="switch"]').attr('checked', 'checked');
            $('#onoff_rc').html('ON');
            $('.title_rc').html('Sound is on');
            $("#onoff_rc").attr('class', 'on_rc');
         } else {
            $('#onoff_rc').html('OFF');
            $('.title_rc').html('Sound is off');
            $("#onoff_rc").attr('class', 'off_rc');
         }
   
    });

    chrome.cookies.get({"url": "https://www.youtube.com/", "name": "likes_color"}, function(cookie) {
        if(cookie){
            $('.likes_color').attr('value', cookie.value);
        } else {
        	$('.likes_color').attr('value', "#2793e6");
        }   
    });

    chrome.cookies.get({"url": "https://www.youtube.com/", "name": "dislikes_color"}, function(cookie) {
        if(cookie){
            $('.dislikes_color').attr('value', cookie.value);
        } else {
        	$('.dislikes_color').attr('value', "#cfcfcf");
        }   
    });


    $('input[name="switch"]').on('click', function(){
        if($(this).is(':checked') ) {
           chrome.cookies.set({
                "name": "sound",
                "url": "https://www.youtube.com/",
                "value": "1",
                "expirationDate": 1593546944
            }, function (cookie) {});

            $('#onoff_rc').html('ON');
            $('.title_rc').html('Sound is on');
            $("#onoff_rc").attr('class', 'on_rc');
        } 
        else {
            chrome.cookies.remove({
                "name": "sound", "url": 
                "https://www.youtube.com/",
            });
            $('#onoff_rc').html('OFF');
            $('.title_rc').html('Sound is off');
            $("#onoff_rc").attr('class', 'off_rc');

        }
    }); 

    $('.title_hex').on('click', function(){
        
    	$('.likes_color').attr('value', "#2793e6");
        $('.dislikes_color').attr('value', "#cfcfcf");
        
        chrome.cookies.remove({
            "name": "likes_color", "url": 
            "https://www.youtube.com/",
        });
        chrome.cookies.remove({
            "name": "dislikes_color", "url": 
            "https://www.youtube.com/",
        });
        
    }); 

	$('input[name="like_cl"]').on("input", function() {

    	var str = $(this).val();

    	chrome.cookies.set({
            "name": "likes_color",
            "url": "https://www.youtube.com/",
            "value": str,
            "expirationDate": 1593546944
        }, function (cookie) {}); 
    
	});

	$('input[name="dislike_cl"]').on("input", function() {

        var str = $(this).val();
      
        chrome.cookies.set({
            "name": "dislikes_color",
            "url": "https://www.youtube.com/",
            "value": str,
            "expirationDate": 1593546944
        }, function (cookie) {}); 
           
	});

});