$(function(){

	var pathname = window.location.pathname;
	if (pathname.substr(0, 5) == '/blog') {
		$('#blog_link').addClass('active');
	};

	// $('.primary a').each(function() {
	// 	var href = $(this).attr('href');
	// 	if (href.substr(0, siteUrl.length) == siteUrl || href.substr(0, 4) !== 'http') return false;
	// 	var $external = $('<sup>').addClass('icon_forward');
	// 	$(this).append($external);
	// 	$(this).attr('target', '_blank');
	// });

	var give = 'hi@piet';
	var me = 'vanzoe';
	var email = 'n.com';
	$('a[href*="mailto:piet"]').each(function() {
		$(this).attr('href', 'mailto:' + give + me + email);
	});

});
