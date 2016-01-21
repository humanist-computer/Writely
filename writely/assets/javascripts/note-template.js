/* Remove the editor for now, as I'm having issues.
** focus on the M.V.P*/
var editor = new MediumEditor('.editable',{

	anchorInputPlaceholder: 'Type a link',
	buttons: ['bold', 'italic', 'header1', 'header2'],

	buttonLabels: 'fontawesome',
	firstHeader: 'h1',
	secondHeader: 'h2'
});

document.getElementById('note-form').addEventListener('submit', function (e) {
    //e.preventDefault(); // remove this to submit your form
    var items = document.querySelectorAll('.editable'),
        i,
        input;
    for (i = 0; i < items.length; i += 1) {
        input = document.getElementById(items[i].getAttribute('data-field-id'));
        input.value = items[i].innerHTML;
    }
});

$(document).ready(function(){

    $( "#note-form__submit--trigger" ).on( "click", function() {
        $( ".mediumInsert" ).each(function(){
            $(this).remove();
        });
  		$("#note-form__submit").trigger("click");
	});

    if ( $(".show-note").length != 0 ){
        var string = $( ".show-note" ).text();
        var html = $.parseHTML( string );
        console.log(html);
        $(".show-note").html(html);
    }

    var readTime = $('.editable').readingtime();
    var wordCount = $('.editable').text().split(' ').length;

    console.log(readTime + " mins");
    console.log(wordCount + " words");

		// Hide the editor controls, shortly after page load
		var editorControls = $('.editor').find('.editor__controls');
		setTimeout(function() {
    	editorControls.css("opacity", "0.15");
  	}, 3000);

		// On hover show the controls
		editorControls.hover(
  		function() {
    		$( this ).css("opacity", "1");
  		}, function() {
    		$( this ).css("opacity", "0.15");
  		}
		);



});
