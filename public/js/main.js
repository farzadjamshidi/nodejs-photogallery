$(document).ready(function(){
    
    $('.delete-project').on('click', function(){
    //    $("#test").hide();

        var id = $(this).data('id');
        var url = '/admin/delete/'+id;

        if(confirm('Are you sure?')){

            $.ajax({
                url:url,
                type:'DELETE',
                success: function(result){
                    
                    $("#test").hide();
                  },
                error: function(err){
                    alert(err);
                }
                
            });
        }

    })

})