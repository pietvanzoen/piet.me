// reference: http://instagram.com/developer/endpoints/users/	

function timeAgo(current, previous) {

	function plural(n) {
		if (n > 1) { return 's' }
		else { return ''; };
	}

	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		n = Math.round(elapsed/1000)
		return n + ' second'+ plural(n) +' ago';
	}
	else if (elapsed < msPerHour) {
		n = Math.round(elapsed/msPerMinute)
		return n + ' minute'+ plural(n) +' ago';
	}
	else if (elapsed < msPerDay ) {
		n = Math.round(elapsed/msPerHour)
		return n + ' hour'+ plural(n) +' ago';
	}
	else if (elapsed < msPerMonth) {
		n = Math.round(elapsed/msPerDay)
		return n + ' day'+ plural(n) +' ago';
	}
	else if (elapsed < msPerYear) {
		var n = Math.round(elapsed/msPerMonth);
		return n + ' month'+ plural(n) +' ago';
	}
	else {
		return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
	}
}


function getInstagrams(id) {
	$.ajax({
		url: 'https://api.instagram.com/v1/tags/vanzoeneuroadventures/media/recent?access_token=835074.7a73190.f8c89405b9cb46e9a3d8e40ebe206265&max_tag_id='+id,
		type:'GET',
		dataType:'jsonp',
		success: function(d, textStatus, xhr) {
			var n = 0;
				now = new Date();

				d.data.reverse();

			for (var i=0; i < d.data.length; i++) {
				var data = d.data[i];
				// console.log(data);
 				if (typeof data==false) { 
 					return false;
 				};
 				var $img = $('<img/>').attr({'src': data.images.standard_resolution.url, 'width': data.images.standard_resolution.width, 'height': data.images.standard_resolution.height});

 				// caption
 				var $avatar = $('<img/>').addClass('avatar').attr('src', data.user.profile_picture);
 				var $location;
 				var $caption = $('<p>');
 				if (data.location && data.location.name) {
 					var maplink = 'https://maps.google.com/maps?q='+data.location.latitude+','+data.location.longitude;
 					$location = $('<a>').attr({'href': maplink, 'class': 'ss-icon location', 'target': '_blank', 'title': data.location.name}).text('location');
 				}
 				if (data.caption !== null) {
	 				$caption.text(data.caption.text);
 				};

 				var date = new Date(data.created_time*1000);
 				$caption.append($('<span>').addClass('date').text(date.toDateString()));

 				var $captionbox = $('<div>').append($('<div>').addClass('caption').append($avatar, $caption, $location));

 				var $item = $('<div>').addClass('instagram_item').attr('id', data.id).append($img).attr('data-caption', $captionbox.html());
 				$('.instagram').append($item);
			}; 
		}
	}).done(function(d, textStatus, xhr){

	});
}

$(document).on('click', '.instagram_item img', function(event) {
	event.preventDefault();
	var $item = $(this).parent();
	if ($item.hasClass('instagram_active')) {
		$item.removeClass('instagram_active clearfix').find('.caption').remove();
		return false;
	};
	$item
		.addClass('instagram_active clearfix').append($item.attr('data-caption'))
		.siblings().removeClass('instagram_active clearfix').find('.caption').remove();
});

var ids = [1365469127053, 1365651826125, 1365836820066, 1366140102451, 1366472672920, 1366588247600, 1366774264635, 1366946229951, ''] 
var clk = 0;

$(window).load(function() {
	$('.instagram_more').trigger('click');
});
$('.instagram_more').on('click', function(event) {
	event.preventDefault();
	getInstagrams(ids[clk]);
	clk++;
	if (clk == 1) {
		setTimeout(function(){
			getInstagrams(ids[clk]);
			clk++;
		}, 1000);
	};
	return false;
});

