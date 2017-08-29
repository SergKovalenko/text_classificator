(function() {
	"use strict";

	const textarea = $('#review');
	const likeButton = $('#likeButton');
	const dislikeButton = $('#dislikeButton');
	const addButton = $('#addButton');
	const trainDataElement = $('#trainData');
	const trainData = '';
	let label = '';

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
		const review = textarea.val();

		const data = {
			review,
			label
		};

	    $.ajax({
    	    data : JSON.stringify(data),
    		contentType : 'application/json',
	        type: "POST",
	        url: '/addData',
	        success(data) {
	        	console.log(JSON.parse(data));
	        	trainDataElement.text(data);
	        }
	    });
	});

})();
