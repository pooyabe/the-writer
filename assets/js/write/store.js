jQuery(function(){
    var content;

    /**
     * 
     *  Show save link
     * 
     */
    $("#text").on("keyup change", function(e) {
        content = $("#text").val();
        if(content != ''){
            $('.save').fadeIn(200);
        }else{
            $('.save').fadeOut(200);
        }
    })
});