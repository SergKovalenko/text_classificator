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

		messageEl.text('Retraining model');

	    $.ajax({
    	    data : JSON.stringify(data),
    		contentType : 'application/json',
	        type: "POST",
	        url: '/addData',
	        success(data) {
	        	errorMessageEl.text('');
	        	data = JSON.parse(data);
	        	messageEl.text(`precision: ${data.precision} \xa0\xa0\xa0\ recall: ${data.recall} \xa0\xa0\xa0\ f1: ${data.f1}`)
	        }
	    });
	});

})();
