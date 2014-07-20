
$(".tile-bg-image").mouseenter(function() {
	$(this).flip({
		direction: 'tb',
		content: 'testing new content'
	});

});
$(".tile-bg-image").mouseleave(function() {
	$(this).revertFlip();
}); 

	//var title = $(this).data-
	//var det1 = $(this).data-
	//var det2 = $(this).data-
	//$(this).inner?(vars);


