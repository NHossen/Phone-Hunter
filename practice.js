const phoneData= async(search="oppo",isShowAll)=>{// Step 1 By Finction take Phone data using async function and fetch
const dataApi=`https://openapi.programming-hero.com/api/phones?search=${search}`;//Take Perameter for Seaching data and add link with search buttom ==> searchButton
const res=await fetch(dataApi);
const data=await res.json();//res convert to json data
const phonesData=data.data
//console.log(phonesData);
displayPhoneData(phonesData,isShowAll)
}


const displayPhoneData=(phonesData,isShowAll)=>{ // step 2.1declaration a function to take data from another function

                                  //Now Need to show Data User
  const phoneCardContainer=document.getElementById('phone-data-container');//step 2.3

   phoneCardContainer.textContent="";//Clear previous display phone data

//Show extra phone data button
const showAllContainer=document.getElementById('show-all-container');
   if(phonesData.length>12 && !isShowAll){
       showAllContainer.classList.remove('hidden')
   } else{
    showAllContainer.classList.add('hidden')
   }

   console.log('is show all', isShowAll)
     //console.log(phonesData.length);
   //Set Display item in Main page 12 phone if not show all 
   if(!isShowAll){
    phonesData=phonesData.slice(0,12);
   }
   


                                  
 //console.log(phonesData);// Need to display All data to user by ForEach loop
 phonesData.forEach(phone=>{//Step 2.2 data one by one
 //console.log(phone);

 const phoneCard=document.createElement('div');//Create card to show product
 phoneCard.classList=`card w-96 bg-gray-100 shadow-xl`;//Create class list for full card
 phoneCard.innerHTML=`

 <figure class="px-10 pt-10">
                  <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <h2 class="card-title">${phone.brand}</h2>
                  <p></p>
                  <div class="card-actions">
                    <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
 
 ` ;

 phoneCardContainer.appendChild(phoneCard)

 }) //Show phone Data one by one


//  Spinners off
toggleLoadingSpinners(false)

}

const handleSearch=(isShowAll)=>{
  toggleLoadingSpinners(true);
    //console.log('sea')
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    //console.log(searchText);
    phoneData(searchText,isShowAll);//Loadphone connect with searchbtn
}




// Spinner 

const toggleLoadingSpinners=(isLoading) => {
  const toggleSpiner=document.getElementById('loding-spinner');
  if(isLoading){
    toggleSpiner.classList.remove('hidden');
  }else{
    toggleSpiner.classList.add('hidden');
  }
  
}

// Handel Show all

const handelShowAll=() =>{
  handleSearch(true)

}

const showPhoneDetails=async(id)=>{
  //console.log('Cliked')
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data=await res.json();
 //console.log(data) ;
 const phone=data.data;
 phoneDetails(phone);
}

const phoneDetails=(phone)=>{

  const phoneTitle=document.getElementById('phone-name');
  phoneTitle.innerText=phone.name;
  // Show details
 const showDetailsContainer=document.getElementById('show-details-container');

 showDetailsContainer.innerHTML=`
 
  <img src="${phone.image}" />
 
 `;



  console.log(phone);
  show_details_modal.showModal()
}

phoneData()//Step 1.1 Need to call for data
