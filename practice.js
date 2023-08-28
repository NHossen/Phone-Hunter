const phoneData= async(search="oppo")=>{// Step 1 By Finction take Phone data using async function and fetch
const dataApi=`https://openapi.programming-hero.com/api/phones?search=${search}`;//Take Perameter for Seaching data and add link with search buttom ==> searchButton
const res=await fetch(dataApi);
const data=await res.json();//res convert to json data
const phonesData=data.data
//console.log(phonesData);
displayPhoneData(phonesData)
}


const displayPhoneData=(phonesData)=>{ // step 2.1declaration a function to take data from another function

                                  //Now Need to show Data User
  const phoneCardContainer=document.getElementById('phone-data-container');//step 2.3

   phoneCardContainer.textContent="";//Clear previous display phone data

//Show extra phone data button
const showAllContainer=document.getElementById('show-all-container');
   if(phonesData.length>12){
       showAllContainer.classList.remove('hidden')
   } else{
    showAllContainer.classList.add('hidden')
   }
     //console.log(phonesData.length);
   //Set Display item in Main page
   phonesData=phonesData.slice(0,12);


                                  
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
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
 
 ` ;

 phoneCardContainer.appendChild(phoneCard)

 }) //Show phone Data one by one

}

const handleSearch=()=>{
    //console.log('sea')
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    //console.log(searchText);
    phoneData(searchText);//Loadphone connect with searchbtn
}

phoneData()//Step 1.1 Need to call for data