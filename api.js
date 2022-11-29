//fetch the url

const fetchText = ()=>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem()}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data));
}

//spinner

const spinner=(displaystyle)=>{
    const spinners = document.getElementById('spinner');
    spinners.style.display = displaystyle;
}

// search item

const searchItem = ()=>{
    const searchText = document.getElementById('searchText');
    const value = searchText.value;
    searchText.value='';
    return value;
}

const displayPhone = (data)=>{
    
    console.log(data);
    const displayItem = document.getElementById('displayItem');
    displayItem.innerHTML = '';
    document.getElementById('showdetails').innerHTML = '';
    spinner('block');
    if(data.length>0){
        if(data.length>20){
            const dataslice = data.slice(0,20);
            dataslice.forEach((item)=>{
                const div = document.createElement('div');
                div.classList.add('card');
                div.classList.add('col-md-3');
                div.classList.add('col-10');
                div.classList.add('text-bg-gray');
                div.classList.add('cards');
                div.style.margin = '20px'
                div.innerHTML = `
                    <img src="${item.image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${item.phone_name}</h5>
                    <h6 class="card-text">${item.brand}</h6>
                    <button onclick="fetchDetails('${item.slug}')" class="btn btn-primary">Details</button>
                    </div>
                `
                displayItem.appendChild(div);
            
            });
            const showmoreDiv = document.createElement('div');
            showmoreDiv.classList.add('position-relative');
            showmoreDiv.innerHTML = `
            <button id='showMore' class="btn btn-success position-absolute top-0 start-50">Show more...</button>
            `
            displayItem.appendChild(showmoreDiv);
            spinner('none');
        }
        else{
            data.forEach((item)=>{
                const div = document.createElement('div');
                div.classList.add('card');
                div.classList.add('col-md-3');
                div.classList.add('col-10');
                div.classList.add('text-bg-gray');
                div.classList.add('cards');
                div.style.margin = '20px'
                div.innerHTML = `
                    <img src="${item.image}" class="card-img-top  w-50 mx-auto" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${item.phone_name}</h5>
                      <h6 class="card-text">${item.brand}</h6>
                      <button onclick="fetchDetails('${item.slug}')" class="btn btn-primary">Details</button>
                    </div>
                `
                displayItem.appendChild(div);
                
            });
            spinner('none');
        }
    
        //Show more
        document.getElementById('showMore').addEventListener('click', function(){
            const displayItem = document.getElementById('displayItem');
            displayItem.innerHTML = '';
            data.forEach((item)=>{
                const div = document.createElement('div');
                div.classList.add('card');
                div.classList.add('col-md-3');
                div.classList.add('col-10');
                div.classList.add('text-bg-gray');
                div.classList.add('cards');
                div.style.margin = '10px'
                div.innerHTML = `
                    <img src="${item.image}" class="card-img-top  w-50 mx-auto" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${item.phone_name}</h5>
                      <h6 class="card-text">${item.brand}</h6>
                      <button onclick="fetchDetails('${item.slug}')" class="btn btn-primary">Details</button>
                    </div>
                `
                displayItem.appendChild(div);
            });
        })
    }
    else{
        displayItem.innerHTML = 
        `
        <h2 class="text-center m-3 text-dark bg-danger">No phone found...</h2>
        `;
    }
    
}



const fetchDetails =data=>{
    console.log(data);
    const url = `https://openapi.programming-hero.com/api/phone/${data}`;
    fetch(url).then(res => res.json()).then(data => showdetails(data.data));
}

const showdetails = (data) =>{
    console.log(data);
    const showdetails = document.getElementById('showdetails');
    showdetails.innerHTML = `
        <div class="card cards mx-auto" style="width: 25rem;">
    <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <h6 class="card-text">${data.brand}</h6>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Release Date: ${data.releaseDate}</li>
        <li class="list-group-item">Storage: ${data.mainFeatures.storage}</li>
        <li class="list-group-item">Memory: ${data.mainFeatures.memory}</li>
        <li class="list-group-item">ChipSet: ${data.mainFeatures.chipSet}</li>
        <li class="list-group-item">Display Size: ${data.mainFeatures.displaySize}</li>
        <li class="list-group-item">Sensors: ${data.mainFeatures.sensors}</li>
        <li class="list-group-item">WLAN: ${data.others.WLAN}</li>
        <li class="list-group-item">Bluetooth: ${data.others.Bluetooth}</li>
    </ul>
    </div>
    `;

}