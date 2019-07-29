$(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
$('#spendAmount').click(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
var newTotal=0;
if(budget.total){
    newTotal +=parseInt(budget.total);
}
var amount=$('#amount').val();
if(amount){
    newTotal += parseInt(amount);
}
chrome.storage.sync.set({'total':newTotal},function(){
    if(amount&&newTotal>=budget.limit){
        var notifications={
            type:'basic',
            iconUrl:'icon16.png',
            title:'Limit Reach!',
            message:"Uh Oh you've exceed the Limit!!!"
        };
        chrome.notifications.create('lif',notifications);
        chrome.browserAction.setBadgeBackgroundColor({ color: "#F00"});
    }
});
$('#total').text(newTotal);
$('#amount').val('');
});
});
});