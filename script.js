//console.log('hello naeem');

const loadPhone=async(searchText='samsung' ,isShowAll) =>{//Create a function to call api url
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);//Call Api by fetch
    const data =await res.json();//Create response
    const phones=data.data;
    //console.log(phones);
    displayPhone(phones,isShowAll);
    
}

const displayPhone =(phones,isShowAll) =>{
   //console.log(phones)
   const phoneContainer=document.getElementById('phone-container');//step 1 make a div for put appendchild

   //clear phone container cards before adding new cards
   phoneContainer.textContent='';
   

//    Display Show all producte
const showAllContainer= document.getElementById('show-all-container');

if(phones.length>9 && !isShowAll){
   showAllContainer.classList.remove('hidden');

}else{
    showAllContainer.classList.add('hidden')
}

//console.log('is show all',isShowAll)

   //Display top 10 products if not show all
   //console.log(phones.length)
   if(!isShowAll){
    phones=phones.slice(0,9);
   }
   



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
    <div class="card-actions justify-center">
      <button onclick="handelShowDet('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>

    `;
   phoneContainer.appendChild(phoneCard);
   });

   //hide loading spinners
   toggleLoding(false);

}

//Show details

const handelShowDet=async(id)=>{
    console.log(id);

    //load data one by one
 const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data=await res.json();
 //console.log(data) ;
 const phoneDetails=data.data;
showPhoneDetails(phoneDetails);

}

const showPhoneDetails=(phone)=>{
    
    console.log(phone);
    const phoneName=document.getElementById('show-details-phone-name');
    phoneName.innerText=phone.name;

    const showDetailsContainer=document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML=`

    <img src="${phone.image}"/>

    <p><span>Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p><span>display: </span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span>chipSet: </span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span>memory : </span> ${phone?.mainFeatures?.memory
    }</p>
    
    `;
    //Show the modal
    show_details_modal.showModal()
}

//Handle Search button
const handleSearch=(isShowAll)=>{
    toggleLoding(true);
    //console.log('searche working')
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    console.log(searchText)
    loadPhone(searchText,isShowAll);

}

const toggleLoding=(isLoading)=>{
    const loadingSpinner=document.getElementById('loding-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handelShowAll=()=>{
    handleSearch(true);
}
loadPhone();