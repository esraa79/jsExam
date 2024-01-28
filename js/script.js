$(document).ready(function(){
    $(".loader").fadeOut(2000,function(){
        $(".loading").fadeOut(2000)
    });
    $(".loading").remove();

});

$(function(){


    
    // get elements
    let sidebarinnerWidth = $(".sidebar-inner").innerWidth();
    let sections = document.querySelectorAll('section')
    let homeRow = document.querySelector('#home-row-meals');
    let searchSection = document.querySelector('.search');
    let contactSection = document.querySelector('.contact');
    let searchRow = document.querySelector('.row-search');
    let contactRow = document.querySelector('.row-contact');
    // let displayHtml = ``; 
    let valid=false  ;



     // slidebar animation
     function closeMenu()
     {
        $(".sidebar").animate({left:-sidebarinnerWidth},500)
        $(".close-icon").removeClass("fa-close").addClass("fa-align-justify")

     }
     
     $(".sidebar").css('left',-sidebarinnerWidth);
     $(".right-side .close-icon").click(function(){

        allMenu =document.querySelectorAll(".menuLink")
        console.log(allMenu)
      
         if($(".sidebar").css('left')=='0px')
         {

             console.log($(".sidebar").css('left'))
             $.each(allMenu,  function (i,element) { 
                $(this).removeClass(`animate__slideInUp`).addClass('animate__slideDownUp')
         });
         closeMenu();
         
           
         }
         else
         {
            
         
             $(".sidebar").animate({left:"0px"},500,function(){
            
                $.each(allMenu,  function (i,element) { 
   
                    $(this).addClass(`animate__animated animate__slideInUp animation__delay-${i+1}s`)
                });

                
               
              
            })
            $(".close-icon").removeClass("fa-align-justify").addClass("fa-close")

        }    

    })
    

    
     

    ////// Home : get All Meals and meal Detaila//////
     displayHtml = ``;       
    (async function(){
     
        displayHtml =``;
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let data = await res.json();
        let allMeals = data.meals;
       
        display(allMeals,false)

       
       
       

    })();

    /////////////check which menu is clicked///////////
    $(".menu a").click(function(e){
    
        displayHtml=``;
        let rowsearchHtml = ``;
        let rowcontactHtml = '';
        
       let targetLink = e.target.innerText;
       searchSection.classList.replace('d-flex',"d-none")
       if(!contactSection.classList.contains('d-none'))
       {
           contactSection.classList.add('d-none');

       }
       //console.log(targetLink)

       ///////search////////////////
       if(targetLink =="Search" ){

                searchSection.classList.replace('d-none',"d-flex")
                rowsearchHtml +=`
                <div class="col-md-6 ">
                    <div class="">
                        <input class="form-control bg-transparent text-white w-100" id="search-name" type="text" placeholder="Search By Name">
                    </div>
                
                </div>

                <div class="col-md-6">
                    <div class="">
                        <input  maxlength="1" class="form-control bg-transparent text-white " name='' id="first-letter" type="text" onk placeholder="Search By First Letter" w-100>
                    </div>
                
                </div>
                `
            /////////// // SEARCH BY FRIST LETTER/////////////////////
                searchRow.innerHTML = rowsearchHtml;
               let searchInput = document.getElementById("first-letter")
                searchInput.addEventListener('keyup',async function(e){
                 
                   
              let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.value}`;
            
              let apiResponse = await fetch(url)
              let res = await apiResponse.json()
              display(res.meals,false)

             
          
                })
                /////// SEARCH BY  NAME//////////////////////////////
                let searchName = document.getElementById("search-name")
                searchName.addEventListener('keyup',async function(e){                  
                let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName.value}`;                    
                let apibyName = await fetch(url)
                let resbyName = await apibyName.json()
                display(resbyName.meals,false)

         
      
            })
                    
                
       }
      ////////////CATEGORIES/////////////////////////////////////////
       if(targetLink=="Categories")
       {
      
        let resbyCat;
        (async function(){ resbyCat= await fetchData('https://www.themealdb.com/api/json/v1/1/categories.php')
    //    console.log(resbyCat)
       displayCategory(resbyCat.categories)
        
    
    
        }());
   
       
      
                           
            

       }
//  //////////// Area////////////
       if(targetLink=="Area")
       {
        let resbyCat;
        (async function(){ resbyArea= await fetchData('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      
        displayArea(resbyArea.meals)
       
        
    
    
        }());
   
       }

    /////////////////Ingradiant////////////////////////
    if(targetLink=="Ingerdients")
    {
     let resbyIng;
     (async function(){ resbyIng= await fetchData('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
     
     displayIng(resbyIng.meals)
    
     
 
 
     }());


    }
// ////////////////////CONTACT US //////////////////////////////////////////
    if(targetLink=="contact us")
    {

        
                if(contactSection.classList.contains('d-none'))
                {
                    contactSection.classList.remove('d-none');

                }
                rowcontactHtml +=`
            
                <div class="col-md-6">
                    <input id="nameInput"  type="text" class="form-control contactInput" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none ">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput"  type="email" class="form-control contactInput" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none  ">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" type="number"  class="form-control contactInput" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none ">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                   
                    <input id="ageInput" maxlength="2"  type="number" class="form-control contactInput" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none ">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput"  type="password" class="form-control contactInput" placeholder="Enter Your Password" >
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one small letter,one captial letter and one number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput"  type="password" class="form-control contactInput" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none ">
                    Enter valid password *Minimum eight characters, at least one small letter,one captial letter and one number
                    </div>
                    <div id="repasswordAlert2" class="alert alert-danger w-100 mt-2 d-none ">
                    Repassword is not the same as password 
                    </div>
                </div>

        
                `
            /////////// // SEARCH BY FRIST LETTER/////////////////////
                contactRow.innerHTML = rowcontactHtml;
            
          


    }
       
        homeRow.innerHTML = displayHtml;
        closeMenu()
        //////////CONTACT VALIDATION/////////////////////
        let inputContacts = document.querySelectorAll(".contactInput");
        let inputKey ;
           
     
        let repswRegex;
        let nameAlert = document.getElementById("nameAlert") ;
        let emailAlert = document.getElementById("emailAlert") ;
        let ageAlert = document.getElementById("ageAlert") ;
        let phoneAlert = document.getElementById("phoneAlert") ;
        let pswAlert = document.getElementById("passwordAlert") ;
        let repswAlert = document.getElementById("repasswordAlert") ;
        let repswAlert2 = document.getElementById("repasswordAlert2") ;
        let nameRegex =  /^[A-Za-z\s]*$/ ;
        let emailRegex =  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ ;
        let ageRegex =  /^(0?[1-9]|[1-9][0-9])$/
        //phone accept from 10 to 13 number 009660567894335 
        let phoneRegx = /^(\+?\d{0,2})?[\D]?\(?(\d{3})\)?[\D]?(\d{3})[\D]?(\d{4})$/
        // /^\d{8,13}$/;
       
        let pswRegx = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/     
    

            inputContacts.forEach((inp)=>{
                inp.addEventListener("keyup",function(e){
                inputKey = e.target.value
                inputName = e.target.id
               // document.getElementById("submitBtn").setAttribute('disabled', '');
                // valid = false;
                /////////NAME VALIDATION////////
                if(inputName=="nameInput" && inputKey!='')
                {
                   valid  = validation(inputName,inputKey,nameRegex,nameAlert)
                  

                }
                
                // ///////////EMAIL VALIDATION//////////////////////
                if(inputName=="emailInput" && inputKey!='')
                {
                    valid  = validation(inputName,inputKey,emailRegex,emailAlert)
         

                }
                //////////Age Validation ///////
                if(inputName=="ageInput" && inputKey!='')
                {
                   valid  = validation(inputName,inputKey,ageRegex,ageAlert)
             

                }
                 //////////phone Validation ///////
                 if(inputName=="phoneInput" && inputKey!='')
                 {
                    valid  = validation(inputName,inputKey,phoneRegx,phoneAlert)
                 
                 }

                 if(inputName=="passwordInput" && inputKey!='')
                 {
                    valid  = validation(inputName,inputKey,pswRegx,pswAlert)
                  
 
                 }
                 if(inputName=="repasswordInput" && inputKey!='')
                 {
                    valid  = validation(inputName,inputKey,pswRegx,repswAlert)
                    if(valid)
                    {
                      
                    
                 
                        if(inputKey!=document.getElementById('passwordInput').value)
                        {

                            if(repswAlert2.classList.contains('d-none'))
                            {
                                repswAlert2.classList.remove('d-none')  
                                valid=false  
                            }
                            
                            
                        }
                        else{
                            if(!repswAlert2.classList.contains('d-none'))
                            {
                                repswAlert2.classList.add('d-none')      
                            }
                        }
                    }
 
                 }
              
                 
              
                 if(valid==true)
                 {
                   // $(selected).removeAttr('" attribute you want to remove "');
                    $("#submitBtn").removeAttr("disabled")
                 }
                 

               

               
            })
         

        })
    

          
          

    

    })
        function display(allMeals,withLength)
        {
            displayHtml =''
            // displayHtml += 
            let len  ;
            if(withLength)
            {
                if(allMeals.length <20)
                {
                len =allMeals.length
                }
                else
                {
                len=20;
                }
            }
            else
            {
                len = allMeals.length
            }
            for(i=0;i<len;i++)
            {
                displayHtml +=`
                <div class="col-md-3 col-sm-6 ">
                <div class="meal overflow-hidden rounded-2 position-relative">
                <img class="meal-img-Home " src="${allMeals[i].strMealThumb}" />
                <div class="meal-layer d-flex align-items-center text-black  " id="layer">
                <h3>${allMeals[i].strMeal}</h3>
                </div>
                </div>

                </div>
                `
            }
            homeRow.innerHTML = displayHtml;
            getMealDesc()
            
        }
         
        function getMealDesc()
        {
              //get meal description
         let AllLayers = document.querySelectorAll('.meal-layer')
         AllLayers.forEach((layer)=>{
          layer.addEventListener("click",async function(e){
              let mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.innerText}`)
              let mealDesc = await mealRes.json();
              let mealDetails = mealDesc.meals[0];
             let arrIngrediants =[];

              // get Ingredient 
              for(let i = 1; mealDetails[`strIngredient${i}`]; i++){
                  const ingredients = `
                  ${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}
                  `
                  arrIngrediants.push(ingredients)
              }
               
              // get Tags in array
             let mealTag="" ;
             let arrTags=[];
             console.log(mealDetails.strTags)
              if(mealDetails.strTags!=null)
              {
                  mealTag =  mealDetails.strTags;
                  if(mealTag.includes(',')){
                       arrTags = mealTag.split(",");
                       
  
                  }
                  else{
                      arrTags.push(mealTag)
                  }
              }
              
            
              displayHtml =''
              displayHtml += `
              <div class="col-md-4">
                  <img class="w-100 rounded-3" src="${mealDetails.strMealThumb}" alt="">
                      <h2>${mealDetails.strMeal}</h2>
              </div>
              <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${mealDetails.strInstructions}</p>
                  <h3 class=""><span class="fw-bolder">Area : </span>${mealDetails.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${mealDetails.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex flex-wrap g-3 ">
                  ${arrIngrediants.map((ing) => `<li class="alert alert-info p-2 m-2" >${ing}</li>` )
                  .toString()
                  .replaceAll(",", "")}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${arrTags.map((tag) => `<li class="alert alert-danger p-2 m-2">${tag}</li>` )
                  .toString()
                  .replaceAll(",", "")}
                
                  </ul>  
                  <a target="_blank" href="${mealDetails.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-danger">Youtube</a>
                  
              </div>
              `
           
              homeRow.innerHTML = displayHtml;
          })
         

      })
        }

        function displayCategory(AllCategory)
        {
            displayHtml =''
            let strIng;
            // displayHtml += 
            for(i=0;i<AllCategory.length;i++)
            {
                 strIng =AllCategory[i].strCategoryDescription;
            if(strIng!=null && strIng.length>20){
                strIng = strIng.substring(0,(strIng.indexOf('.'))+30);

            }
            
                displayHtml +=`
                <div class="col-md-3 col-sm-6 ">
                <div class="meal overflow-hidden rounded-2 position-relative">
                <img class="meal-img-Home " src="${AllCategory[i].strCategoryThumb}" />
                <div class="meal-layer text-center text-black " id="layer">
                <h3>${AllCategory[i].strCategory}</h3>
                <p class="catDesc">${strIng}</p>
                </div>
                </div>

                </div>
                `
            }
     
            homeRow.innerHTML = displayHtml;
            getCatDesc()
            
        }

        function getCatDesc()
        {
              //get meal description
         let AllLayers = document.querySelectorAll('.meal-layer')
         AllLayers.forEach((layer)=>{
          layer.addEventListener("click",async function(){
             let searchKey = layer.firstElementChild.innerText

            
              let ResByCat = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchKey}`)
              let res = await ResByCat.json()       
              let  allmealsByCat = res.meals  
               
              displayHtml =''
              let len  ;
              if(allmealsByCat.length <20)
              {
                len = allmealsByCat.length
              }
              else
              {
                len=20;
              }
          

              for( i =0 ; i<len; i++)
              {
                displayHtml += `
            
              <div class="col-md-3 col-sm-6 ">
              <div class="meal overflow-hidden rounded-2 position-relative">
              <img class="meal-img-Home " src="${allmealsByCat[i].strMealThumb}" />
              <div class="meal-layer d-flex align-items-center  text-black " id="layer">
              <h3>${allmealsByCat[i].strMeal}</h3>
              
              </div>
              </div>

              </div>
              `

              }
              
              
           
              homeRow.innerHTML = displayHtml;

              getMealDesc()
          })
         

      })
        }

        function displayArea(allAreas)
        {
            displayHtml =''
           
            for(i=0;i<allAreas.length;i++)
            {
                displayHtml +=`
                <div class="col-md-3">
                <div class="rounded-2 text-center cursor-pointer area">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${allAreas[i].strArea}</h3>
                </div>
                </div>
                `
            }

            homeRow.innerHTML = displayHtml;
            /// when click area get meals for this area
            let allAreaLayer = document.querySelectorAll('.area')
            allAreaLayer.forEach((area)=>{
          area.addEventListener("click",async function(e){
            let areaname = area.getElementsByTagName("h3")[0].innerText
            console.log(areaname)
              let areaRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaname}`)
              let areaDesc = await areaRes.json();
         
             let areaMealsDetails= areaDesc.meals;
            display(areaMealsDetails,true)

            
        })})
    }

    function displayIng(allIng)
    {
        displayHtml =''
        let strIng;
        for(i=0;i<20;i++)
        {
             strIng =allIng[i].strDescription;
            if(strIng!=null && strIng.length>20){
                strIng = strIng.substring(0,(strIng.indexOf('.'))+20);

            }

         
         
            //console.log(allIng[i].strDescription)
          //  console.log(strIng)
         
            displayHtml +=`
           
            <div class="col-md-3">
            <div class="rounded-2 text-center cursor-pointer Ing">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${allIng[i].strIngredient}</h3>
                    
                    <p>${strIng}</p>
            </div>
            </div>
            `
        }

        homeRow.innerHTML = displayHtml;
        /// when click ingrediant get meals for this ingrediant
        let allIngLayer = document.querySelectorAll('.Ing')
        allIngLayer.forEach((ing)=>{
      ing.addEventListener("click",async function(e){
        let ingName = ing.getElementsByTagName("h3")[0].innerText
      
          let IngRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`)
          let IngDesc = await IngRes.json();     
         let ingMealsDetails= IngDesc.meals;
    
         
        display(ingMealsDetails,true)

        
    })})
    }


        async function fetchData(url){
                              
            let apiResponse = await fetch(url)
            let result = await apiResponse.json();
            console.log(result);
            return result;

        }     

        function validation(inputName,inputKey,Regex,alertName)
        {

            let validflag =true;         
               
             
            
               if(Regex.test(inputKey) == false )
               {
                    validflag =false;           
                    if(alertName.classList.contains('d-none'))
                    {
                        alertName.classList.remove('d-none')      
                    }
                                  
               }  
               else
               {
                validflag=true
                alertName.classList.add('d-none')     
               }
               return validflag;

            }
        

       
        
     })
