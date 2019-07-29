$(function(){
    chrome.storage.sync.get('limit',function(budget){
$('#limit').val(budget.limit);
    });
    $('#saveLimit').click(function(){
        var limit=$('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit':limit},function(){
                close();
            });
        }
    });
    $('#resetTotal').click(function(){
       
        chrome.storage.sync.set({'total':'0'},function(){
                var notifications={
                    type:'basic',
                    iconUrl:'icon16.png',
                    title:'Total Reset!',
                    message:"Total has been reset successfully!! "
                };
                chrome.notifications.create('lif',notifications);
        });
    });  
       
           
    });
