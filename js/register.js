if('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js')
    .then(reg=>{
        console.log("Service worker registration succesfull. "+reg.scope);
    }).catch(error=>{
        console.log("registration failed "+error);
    });
}