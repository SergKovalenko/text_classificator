(function() {
	"use strict";

	const textarea = $('#review');
	const likeButton = $('#like-button');
	const dislikeButton = $('#dislike-button');
	const addButton = $('#add-button');
	const messageEl = $('#message');
	const errorMessageEl = $('#error-message');
	let label = '';

	likeButton.click(() => {
		likeButton.addClass('active');
		dislikeButton.removeClass('active');

		label = 'positive';
	});

	dislikeButton.click(() => {
		dislikeButton.addClass('active');
		likeButton.removeClass('active');

		label = 'negative';
	});

	addButton.click(() => {
		const review = textarea.val();
		console.log(review);
		console.log(label)

		if (!review) {
			errorMessageEl.text('Please wright the review');
			return
		} else if (!label) {
			errorMessageEl.text('Please check "Good" or "Bad"');
			return
		}

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
	        }
	    });
	});

})();
