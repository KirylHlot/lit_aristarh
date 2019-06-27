////menu
var burger = document.querySelector('.burger');
var close_button = document.querySelector('.close_button');
var body = document.querySelector('.body');

burger.onclick = function() {
	body.classList.add('menu_open');
}

close_button.onclick = function() {
	hide_menu ();
}

function hide_menu () {
	body.classList.remove('menu_open');
}

$(function($){
	$(document).mouseup(function (e){
		let block = $(".burger"); 
		let menu_wrapper = $(".main_nav");
		if (!block.is(e.target)
			&& block.has(e.target).length === 0
				&& !menu_wrapper.is(e.target)
					&& menu_wrapper.has(e.target).length === 0) {
			hide_menu();
		}
	});
});

window.onload = function() {
	setMaxHeightByWrapper ("articles_img_wrapper", "articles_main_img");
	setMaxHeightAllBlocks ("articles_item");
}