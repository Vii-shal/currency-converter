let baseurl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdown  = document.querySelectorAll(".dropdown select");
const btn = document.querySelector( "form button" );
let fromcurr = document.querySelector(" .from  select")
let tocurr = document.querySelector(" .to  select")
let msg = document.querySelector( ".msg" );

for (let select of dropdown){
    for (let code in countryList ){
        // select.innerHTML += `<option value=${code}>${code}</option>`;
        // console.log(code);
        let newOption = document.createElement('option');
        newOption.innerText = code;
        // newOption.setAttribute("value", code)
        newOption.value = code;
        if (select.name === "from"  && code==="USD"){
            newOption.selected = 'selected';
        }else if (select.name === "to"  && code==="INR"){
            newOption.selected = 'selected';
        }
        select.appendChild(newOption);
    }

    select.addEventListener('change', (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


let update = async()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval ==="" || amtval<1){
        amtval=1;
        amount.value = "1";
    }
    console.log(fromcurr.value,tocurr.value);
    const URL = `${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data[tocurr.value.toLowerCase()]);
    let rate = (data[tocurr.value.toLowerCase()]);
    let result = parseFloat((amtval*rate).toFixed(2));
    msg.innerText = `${amtval} ${fromcurr.value} = ${result} ${tocurr.value}`;
    
}



btn.addEventListener( "click", (evt)=>{
    evt.preventDefault();
    update();
});

window.addEventListener("load",()=>{
    update();
});