// fetch("http://localhost:3000/weather?address").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)
//             console.log(data.error);
//         else
//             console.log(data.forecast+"\n"+data.location);
//     })
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const location = search.value;
    if(location)
        messageOne.textContent="Loading...";
        //messageTwo.textContent="";
    //location="http://localhost:3000/weather?address="+location;
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
            messageTwo.textContent="";
        }
        else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }

            //console.log(data.location);
            //console.log(data.forecast);}
    })
});


})