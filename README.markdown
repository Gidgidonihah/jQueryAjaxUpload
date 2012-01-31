# jQueryAjaxUplaod

This is a fork of the Really simple jQuery Ajax File Upload plugin by [jainaewen](http://www.jainaewen.com/files/javascript/jquery/iframe-post-form.html). I forked this plugin to make a few changes to the original version as follows:

- Added global ajax event support
- Added URL Parameter
- Minor Code Cleanup

## Global Ajax Event Support
By default this plugin will trigger the default ajax events (.ajaxStart(), .ajaxStop(), .ajaxComplete(), .ajaxError(), .ajaxSuccess(), .ajaxSend()). Behaviour is specified by the 'global' option.

## Added URL Parameter
The plugin can now be passed a url to which the form can post. This is useful when adjusting urls when javascript is enabled. For example if the default form url is /form-receive and you would like to send it to /json/form-receive) 

## Minor Code Cleanup
I figured since I'm in there, I might as well reformat the code to match my liking. And fix some spelling errors.

## Usage
In some cases we wanted to display the notification without allowing the user to close the window (primarily because we don’t want to allow a notice to be ignored as described above) so added an option to hide the close button as shown in this example:

	$('#form_id').ajaxUpload({
		global		: true,						// Trigger global ajax events
		url			: false,					// Replaces the form url
		iframeID	: 'iframe-post-form',		// Iframe ID.
		json		: false,					// Parse server response as a json object.
		post		: function () {				// Executed on submit
			console.log('Upload Posted');
		},
		complete	: function (response) {		// Executed after response from the server has been received
			console.log(response);
		}
	});
