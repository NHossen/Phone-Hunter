//console.log('hello naeem');

const loadPhone=async(searchText) =>{//Create a function to call api url
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);//Call Api by fetch
    const data =await res.json();//Create response
    const phones=data.data;
    //console.log(phones);
    displayPhone(phones);
    
}

const displayPhone =phones =>{
   //console.log(phones)
   const phoneContainer=document.getElementById('phone-container');//step 1 make a div for put appendchild

   //clear phone container cards before adding new cards
   phoneContainer.textContent='';
   

//    Display Show all producte
const showAllContainer= document.getElementById('show-all-container');

if(phones.length>12){
   showAllContainer.classList.remove('hidden');

}else{
    showAllContainer.classList.add('hidden')
}

   //Display top 10 products
   console.log(phones.length)
   phones=phones.slice(0,12);



   phones.forEach(phone =>{
    //console.log(phone);
    const phoneCard =document.createElement('div');//Create a div
    phoneCard.classList=`card  lg:w-96 bg-[#f7f7f7] shadow-lg`; //add class list 
    //add innerhtml
    phoneCard.innerHTML=`  
    <figure class="px-10 pt-10">
    <img src="${phone.image}" />
    </figure>
  <div class="card-body items-center text-center ">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>

    `;
   phoneContainer.appendChild(phoneCard);
   });

   //hide loading spinners
   toggleLoding(false);

}

//Handle Search button
const handleSearch=()=>{
    toggleLoding(true);
    //console.log('searche working')
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    console.log(searchText)
    loadPhone(searchText);

}

const toggleLoding=(isLoading)=>{
    const loadingSpinner=document.getElementById('loding-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}
//loadPhone();