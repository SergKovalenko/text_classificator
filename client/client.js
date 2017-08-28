(function() {
	"use strict";

	const textarea = $('#review');
	const likeButton = $('#likeButton');
	const dislikeButton = $('#dislikeButton');
	const addButton = $('#addButton');
	let label = null;

	likeButton.click(() => {
		console.log('like');
		likeButton.addClass('active');
		dislikeButton.removeClass('active');

		label = 'positive';
	});

	dislikeButton.click(() => {
		console.log('dislike');
		dislikeButton.addClass('active');
		likeButton.removeClass('active');

		label = 'negative';
	});

	addButton.click(() => {
		console.log('add');
		const value = textarea.val();

		const data = {
			value: textarea.val(),
			label
		};

		console.log(JSON.stringify(data))

	    $.ajax({
    	    data : JSON.stringify(data),
    		contentType : 'application/json',
	        type: "POST",
	        url: '/addData',
	        success() {
	        	console.log("Done!"); 
	        }
	    });
	});

})();
