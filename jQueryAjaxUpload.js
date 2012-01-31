/**
 * jQuery plugin for posting form including file inputs.
 *
 * Copyright (c) 2012 Jason Weir
 *
 * Licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version: 1.0 (2012-01-31)
**/
(function ($) {
	$.fn.ajaxUpload = function (options) {
		var status = true,
			returnResponse,
			response,
			element,
			iframe;

		options = $.extend({}, $.fn.iframePostForm.defaults, options);

		// Add the iframe.
		if (!$('#' + options.iframeID).length) {
			$('body').append('<iframe id="' + options.iframeID + '" name="' + options.iframeID + '" style="display:none" />');
		}

		return $(this).each(function () {
			element = $(this);

			// Target the iframe.
			element.attr('target', options.iframeID);

			if (options.url) {
				element.attr('action', options.url);
			}

			// Submit listener.
			element.submit(function () {
				if(options.global){ $.event.trigger( "ajaxStart" ); }

				// If status is false then abort.
				status = options.post.apply(this);

				if (status === false) {
					return status;
				}

				if(options.global){ $.event.trigger( "ajaxSend" ); }

				iframe = $('#' + options.iframeID).load(function () {
					if(options.global){ $.event.trigger( "ajaxSuccess" ); }

					response = iframe.contents().find('body');

					if (options.json) {
						try{
							returnResponse = $.parseJSON(response.html());
						}catch(error){
							returnResponse = {
								status: 'error',
								success: false,
								errorMessage: error.message
							};
							if(options.global){ $.event.trigger( "ajaxError" ); }
						}
					}else{
						returnResponse = response.html();
					}

					options.complete.apply(this, [returnResponse]);

					iframe.unbind('load');
					if(options.global){ $.event.trigger( "ajaxComplete" ); }

					setTimeout(function () {
						response.html('');
						if(options.global){ $.event.trigger( "ajaxStop" ); }
					}, 1);
				});
			});
		});
	};

	$.fn.iframePostForm.defaults = {
		global		: true,						// Trigger global ajax events
		url			: false,					// Replaces the form url
		iframeID	: 'iframe-post-form',		// Iframe ID
		json		: false,					// Parse server response as a json object
		post		: function () {},			// Executed on submit
		complete	: function (response) {}	// Executed after response from the server has been received
	};
}(jQuery));
