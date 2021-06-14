const electron = require("electron");
const { ipcRenderer } = electron;

jQuery(function($){
    $('.button').click(function(){
        const title = $('#subject').val();
        
        if(title != ''){
            sendTitle(title).then( () => {
                document.location.replace('../Write/Write.html');
            });
        }else{
            alert('بهتره یه عنوانی انتخاب کنی!');
        }
    })


    const sendTitle = async (title) => {
        return await ipcRenderer.send('article-title', title);
    }
})