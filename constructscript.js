$( ".hub" ).draggable({
	helper:	function () { 
		return $(this).clone().appendTo('body').css('z-index',9999).show();
		}
});
$('.main-workspace').droppable({
	accept: '.hub',
	drop: function (event, ui) {
		$(this).append(ui.draggable.clone().draggable().removeClass('hub')); 
	},
	tolerance: 'fit'
}); 
