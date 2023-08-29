
//#1 Make async Funtion and set API
const loadPhone=async(searchText='samsung' ,isShowAll) =>{//Create a function to call api url
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);//Call Api by fetch
    const data =await res.json();//Create response
    const phones=data.data;
    //console.log(phones);
    displayPhone(phones,isShowAll);
    
}

//# 2 Add Carde Inner html also show dynamicaly call Products
const displayPhone =(phones,isShowAll) =>{
   //console.log(phones)
   const phoneContainer=document.getElementById('phone-container');//2==>step 1 make a div for put appendchild
   phoneContainer.textContent='';//2==> Step 2 clear phone container cards before adding new cards
//    Display Show all producte
const showAllContainer= document.getElementById('show-all-container');//2==> Step 3 Display Product


if(phones.length>9 && !isShowAll){//Product set in Main page For user
   showAllContainer.classList.remove('hidden');

}else{
    showAllContainer.classList.add('hidden')
}
//console.log('is show all',isShowAll)
//Display top 10 products if not show all
//console.log(phones.length)
   if(!isShowAll){//Product set in Main page For user
    phones=phones.slice(0,9);
   }
   


//Add Product details Dynamicaly //2==> Step 3 Display Product
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
    <div class="card-actions justify-center">
      <button onclick="handelShowDet('${phone.slug}')" class="btn btn-outline btn-error">Show Details</button>
    </div>
  </div>

    `;
   phoneContainer.appendChild(phoneCard);
   });

   //hide loading spinners
   toggleLoding(false);

}


//Show details Api set
const handelShowDet=async(id)=>{
    console.log(id);
    //load data one by one
 const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data=await res.json();
 console.log(data) ;
 const phoneDetails=data.data;
showPhoneDetails(phoneDetails);

}

//Phone Details Modal section add data Dynamicaly
const showPhoneDetails=(phone)=>{
    
    console.log(phone);
    const phoneName=document.getElementById('show-details-phone-name');
    phoneName.innerText=phone.name;

    const showDetailsContainer=document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML=`
    <div class="flex justify-center my-10">

    <img  src="${phone.image}"/>

    </div>
    
    <p><span class="font-medium my-4">Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-medium my-4">display: </span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-medium my-4">chipSet: </span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-medium my-4">memory : </span> ${phone?.mainFeatures?.memory
    }</p>
    <p><span class="font-medium my-4">Wlan: </span> ${phone?.others?.WLAN
    }</p>
    <p><span class="font-medium my-4">Bluetooth: </span> ${phone?.others?.Bluetooth
    }</p>
    <p><span class="font-medium my-4">Realease Date: </span> ${phone?.releaseDate

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


// Set sppinner or Product Loading animation
const toggleLoding=(isLoading)=>{
    const loadingSpinner=document.getElementById('loding-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}


// handle show all Product
const handelShowAll=()=>{
    handleSearch(true);
}

loadPhone();//Part of //#1 Make async Funtion and set API