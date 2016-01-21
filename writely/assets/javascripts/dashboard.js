$(document).ready(function(){
    //$('textarea').autosize();  

    // When the delete note button is clicked
    $('.deletenote').on("click", function(e){
        e.stopPropagation();
        e.preventDefault();

        // cache the clicked button in var
        var self = $(this);
        // Get the note id of the clicked note
        // by looking for the corresponding data-attr
        var noteId = $(this).closest('tr').data('note-id');

        // show the confirm dialog modal
        $('#myModal').modal('show');  

        e.stopImmediatePropagation();

        // On click of confirm delete, run the deleteNote function
    // passing in the note id, and self, i.e. the reference to the 
    // button that was clicked
    $('#myModal').on("click", ".delete-note", function(){
        
        deleteNote(noteId, self);
    });
        
         
    });

    

    var deleteNote = function(noteId, self){
        
       $.ajax({
            url: '/notes/' + noteId,
            type: 'DELETE',
            success: function(result) {
                //self.closest('tr').hide();
                alert('it did it!');
            }
        }); 
    }

    // Launch the new note modal
    $('.document-action--new').on("click", function(e){
        e.stopPropagation();

        // show the confirm dialog modal
        $('.new-note-modal').modal('show');  
    });

    // $('.document-action__create-note').on("click", function(e){
    //     e.preventDefault();
        
    //     var newNoteTitle = $('.new-note-modal__new-note-title').val();

    //     createNote(newNoteTitle);
    // });

    // Create the note, via ajax
    // var createNote = function(newNoteTitle){
        
    //    $.ajax({
    //         url: '/notes/new/' + encodeURIComponent(newNoteTitle),
    //         type: 'POST',
    //         success: function() {
    //             alert('it bloody did it');
    //             url = "/notes/edit/" + encodeURIComponent(newNoteTitle);
    //             window.location.href = url;
    //         }
    //     }); 
    // }

    /*$("tr").each(function(){

        $(this).hover(function(){
            $(this).find("td.option i").toggle();
        });
    });*/
    
});