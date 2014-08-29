
/*
function niceFade() {
	$(this).css('background-image', 'none');
};

$(".tile-bg-image").click( function() {
	$(this).flip({
		bgColor: '#ffffff',
		direction: 'rl',
		speed: 250,
		content: 'testing new content',
		color: '#fff',
		//fontSize: 20,
		onAnimation: niceFade()

	});
});

*/

var $tiles = $(".live-tile").liveTile({ 
    playOnHover:true,
    repeatCount: 0,
    delay: 0,
    startNow:false 
});

