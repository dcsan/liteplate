'use strict';
/* global Zepto,Velocity */

// client side

console.log('animate here');

// execute callback when the page is ready:
Zepto(function($) {
	console.log('zepto');
	playAnimation();
});

function playAnimation() {
	var $elem = $('#box1');
	$elem.on('click', function() {
		console.log('click');
		bounceIn();
	});
	bounceIn();
}

function bounceIn() {

	var $elem = $('#box1');

	$elem.velocity({
    bottom: '100%',
	}, {
    /* Velocity's default options */
    duration: 1000,
		easing: "ease-out",
    loop: false,
    delay: false,
    mobileHA: true,
	}).velocity({
    bottom: '0%',
	}, {
    /* Velocity's default options */
    duration: 1000,
		easing: "ease-in",
    loop: false,
    delay: false,
    mobileHA: true
	});

}
