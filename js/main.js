let siteName=document.getElementById("sitename");
let siteUrl=document.getElementById("siteurl");
let sites=[];
let tBody=document.getElementById("data")
let index=null;
let storage=localStorage.getItem("sites");
let invMsg=document.getElementById("invalid-msg");


//check whether there is data in local storage or not to display 
if(JSON.parse(localStorage.getItem("sites"))!==null){
    sites=JSON.parse(localStorage.getItem("sites"));
    displayData();
}

// checking name and url on input 
siteName.addEventListener("input",function(){

    userNameValidation()===false?siteName.style="border-color: rgb(25, 135, 84);box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);":siteName.style=" border-color: #198754;box-shadow: 0 0 0 0.25rem rgba(25,135,84,0.25);"
})
siteUrl.addEventListener("input",function(){

    urlValidation()===false?siteUrl.style="border-color:#dc3545;box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);":siteUrl.style=" border-color: #198754;box-shadow: 0 0 0 0.25rem rgba(25,135,84,.25);"
})



function userNameValidation(){
    let userNameRe=/^[a-zA-Z0-9]{3,}$/gi;
    
    return userNameRe.test(siteName.value);
}
function urlValidation(){
    let urlRe=/^(https?:\/\/)?(www.)([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/gi;
    
    return urlRe.test(siteUrl.value);
}

//add dat
function addSite(){

   let modal=document.getElementById("modal");
    if(userNameValidation()===false||urlValidation()===false){
        return modal.style="display:block;" 
    }
    
    
    
    let siteData={
        name:siteName.value,
        url: siteUrl.value,
     }

//check whether there is data in local storage or not to add and display or check if url name is repeated 
    if(JSON.parse(localStorage.getItem("sites"))===null){
        // console.log("add when no storage and length of storage")
    sites.push(siteData);
    clearData();
    localStorage.setItem("sites",JSON.stringify(sites))
    displayData();
    console.log(JSON.parse(localStorage.getItem("sites")).length)
    console.log(JSON.parse(localStorage.getItem("sites")))
    }
    else{
        //check if url name is repeated or not
       let flag=0;
        // console.log("add when there is data in storage and length of storage")
        // console.log(JSON.parse(localStorage.getItem("sites")).length)
        // console.log(sites)
        sites.forEach(e=>{
            e.name===document.getElementById("sitename").value?flag=1:'';
        })

        if(flag===1){
            invMsg.style="display:block";
        }
        else{
            invMsg.style="display:none";
                sites.push(siteData);
                clearData();
                localStorage.setItem("sites",JSON.stringify(sites))
                displayData();
        }

        // for(let i=0;i<sites.length;i++){
        //     if(document.getElementById("sitename").value===sites[i].name)
        //     {
        //         invMsg.style="display:block";
        //         break;
        //     }
        //     else{
        //         invMsg.style="display:none";
        //         sites.push(siteData);
        //         clearData();
        //         localStorage.setItem("sites",JSON.stringify(sites))
        //         displayData();
        //         break;
        //         }
        // }
        
       
    }
}
closeModal()

function closeModal(){
    document.getElementById("modal-close").addEventListener("click",function(){
        document.getElementById("modal").style="display:none;"
    })
}

function clearData(){
    siteName.value='';
    siteUrl.value='';
}

function displayData(){
    let trs="";  
    for(let i=0;i<sites.length;i++){
        index=i;
        trs+=`<tr><td>${i+1}</td>
        <td>${sites[i].name}</td>
        <td><button class="visit-button btn btn-warning"><a class="link" href="https://${sites[i].url}/" ><i class="fa-regular fa-eye me-1"></i>Visit</a></button></td>
        <td><button class="delete-button btn btn-danger" onclick="remove()"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td><tr>`;
        
    }
    tBody.innerHTML=trs;

}

function remove (){
    sites.splice(index,1);
    localStorage.setItem("sites",JSON.stringify(sites));
    displayData();
}
