 'use strict'
// All Data
 async function Allcountry(){
    const respons=await fetch("https://restcountries.com/v2/all");
    const result= await respons.json();
    console.log(result);
    renderData(result);
 }
 Allcountry();

//  
 function renderData(data=[]){
    if(data.length==0){
        $(".all").innerHTML='<span class="loader"></span>'
    }
    else{
        $('.all').innerHTML="";
        data.forEach(item => {
            const card=createElements('div','box p-3 d-md-flex my-5 bg-light rounded-3',`
            <img src="${item.flags.png}" alt="flag" class="box_img">
            <div class="box-body">
                <h3 class="country text-center text-md-start">${item.name}</h3>
                <p class="text-center text-md-start">${item.nativeName}</p>
                <p class="text-center text-md-start">${item.region}</p>
            </div>`);

            card.dataset.info=item.name;

            $('.all').appendChild(card);

            card.addEventListener('click',(e)=>{
                
                renderModal(card.getAttribute('data-info').toLowerCase());
            })
        });
    }
 }
 renderData();

async function searchCountry(query){
    $(".all").innerHTML='<span class="loader text-center m-auto"></span>'
    const data=await fetch(`https://restcountries.com/v2/name/${query}`);
    const res=await data.json();
    console.log(res);
    $('.all').innerHTML="";

    if(res.message){
        $('.all').innerHTML=`<h2 class='text-danger'>${res.message}</h2>`;
    }else{
        renderData(res);
    }
}

$('.search').addEventListener('keyup',(e)=>{
    if(e.target.value.length==0){
        Allcountry();
    }
    else{
        searchCountry(e.target.value.trim().toLowerCase());
    }
})

async function renderModal(data){
    console.log(data);
    const result=await fetch(`https://restcountries.com/v2/name/${data}`);
    const res=await result.json();
    console.log(res);
    $('.modals-content').style.display="flex";
    let card=createElements('div','modal_card p-2 text-center text-light w-75 m-auto',`
        <img src="${res[0].flags.png}" alt="flag" class="modal_img">
        <h2>${res[0].name}</h2>
        <div class="row text-start ps-5">
            <div class="col-6"><p>nativeName: ${res[0].nativeName}</p></div>
            <div class="col-6"><p>capital: ${res[0].capital},</p></div>
            <div class="col-6"><p>subregion: ${res[0].subregion}</p></div>
            <div class="col-6"><p>currencies: ${res[0].currencies[0].name}</p></div>
            <div class="col-6"><p>population: ${res[0].population}</p></div>
            <div class="col-6"><p>callingCodes: ${res[0].callingCodes[0]}</p></div>
            <div class="col-6"><p>independent: ${res[0].independent}</p></div>  
        </div>`)
    $('.wrapper').appendChild(card);

}

$('.modals-content').style.display="none";
$('.modal_close').addEventListener('click',()=>{
    $('.wrapper').innerHTML='';

    $('.modals-content').style.display="none";

})



