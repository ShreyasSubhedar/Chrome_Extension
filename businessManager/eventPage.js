var conTextMenuItem={
    "id":"spend Money",
    "title":"Spend Money",
    "contexts":["selection"]
};
chrome.contextMenus.create(conTextMenuItem);
function isInt(value) {
    return !isNaN(value)&&
    parseInt(Number(value))==value&&
    !isNaN(parseInt(value,10));
} 
chrome.contextMenus.onClicked.addListener(function(shreyas){
    if(shreyas.menuItemId=="spend Money"&&shreyas.selectionText){
        if(isInt(shreyas.selectionText)){
                chrome.storage.sync.get(['total','limit'],function(budget){
                    var newTotal=0;
                    newTotal += parseInt(shreyas.selectionText)+parseInt(budget.total);
                chrome.storage.sync.set({'total':newTotal},function(){
                    if(newTotal>=budget.limit){
                        var notifications={
                            type:'basic',
                            iconUrl:'icon16.png',
                            title:'Limit Reached!',
                            message:"Uh Oh! Looks like you've reached your limit! "
                        };
                        chrome.notifications.create('limitNotif',notifications); 
                    }
                });
                });
        }
    }
});
chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});
