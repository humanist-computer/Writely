$(document).ready(function(){
    //$('textarea').autosize();  


    if ( $(".show-note").length != 0 ){
        alert("it gets to here");
        var string = $( ".show-note" ).text();
        var html = $.parseHTML( string );
        console.log(html);
        $(".show-note").html(html);
    }

    /*$('.delete-note').on("click", function(){
        console.log("Hello");
        $('#myModal').modal('show');   

    });*/

    var readTime = $('.editable').readingtime();

    var wordCount = $('.editable').text().split(' ').length;

       
    console.log(readTime + " mins");
    console.log(wordCount + " words")
    
});