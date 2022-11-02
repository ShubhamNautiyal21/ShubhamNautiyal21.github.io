
let deleteitem 
let addContent 
let userData
let renderData=()=>{
    userData=JSON.parse(localStorage.getItem('userData'))
    let parentElement  = document.getElementsByClassName('main-list')[0]


    if(userData){
     
        parentElement.innerHTML=userData
    }
    else{
       
        parentElement.innerHTML=''
        addNewGroupItem.classList.remove("add-new-group-original")
        addNewGroupItem.classList.add("add-new-group")
        main.style.display= "none"
    }

}


let saveData=(headingData='')=>{
    
    let heading = document.getElementsByClassName('heading')
    let userData=''
    let data=''
    
    if(headingData){
       
        
          

            activeTab   =`&bull; ${document.title}` 
            activeTabId   = document.URL
            let currentUrl=[activeTab,activeTabId]
            
            userData+=`<li class="heading main-heading">${headingData}
                                <button class="add-content"></button>
                                    <ul class="inner-list">
                                        <li><a href="${currentUrl[1]}" target='_blank'>${currentUrl[0]}</a>
                                        <button class="delete-list"></button>
                                        </li>
                                    </ul>
                           </li>`
                           for ( let i=0; i<heading.length; i++ ){
                            if(!heading[i].classList.contains('ignore')){
                                userData+=`<li class="heading">
                                                ${heading[i].innerHTML}
                                           </li>`
                               
                            }
                        }
                       
                   
                    data=JSON.stringify(userData)
                    localStorage.setItem('userData',data)
                    renderData()
                    window.location.reload()
            
       
       
                        }
                        else{
                            for ( let i=0; i<heading.length; i++ ){
                                if(!heading[i].classList.contains('ignore')){
                                    userData+=`<li class="heading">
                                                    ${heading[i].innerHTML}
                                               </li>`
                                   
                                }
                            }
                           
                       
                        data=JSON.stringify(userData)
                        localStorage.setItem('userData',data)
                        renderData()
                        window.location.reload()
                        }
        
        
}


let deleteEventListner=()=>{
    deleteitem = document.getElementsByClassName('delete-list')
    for(let i = 0;i<deleteitem.length;++i){

        if(deleteitem[i].getAttribute('listener') === 'true'){
            continue
        }
        deleteitem[i].title="Delete this link"
        deleteitem[i].addEventListener('click',()=>{
            
            let headingParent= deleteitem[i].parentElement.parentElement.parentElement
            let innerlistParent= deleteitem[i].parentElement.parentElement
            
            deleteitem[i].parentElement.style.display='none'
            let visibeChildCount=0
            for (let j=0; j<innerlistParent.children.length;++j){
                if( innerlistParent.children[j].style.display != 'none' ){
                    ++visibeChildCount
                } 
            }
            
            if(visibeChildCount<=0)
                    {
                        headingParent.style.display='none'
                        headingParent.classList.add('ignore')
                    }
            saveData()
        })
    }
   
}


let addEvent = ()=>{
    addContent = document.getElementsByClassName('add-content')
    for(let i = 0;i<addContent.length;++i){
       
        if(addContent[i].getAttribute('listener') === 'true'){
            continue
        }
      
         addContent[i].title="Add the current link to this group"
        // document.getElementById('add-new-link').style.display='none'
         addContent[i].addEventListener('click',()=>{
       
              
                activeTab   =`&bull; ${document.title}` 
                activeTabId   = document.URL
                let currentUrl=[activeTab,activeTabId]
               
                let data= `<li><a href="${currentUrl[1]}" target='_blank'>${currentUrl[0]}</a>
                           <button class="delete-list"></button>
                           </li>`
               addContent[i].parentElement.children[1].innerHTML+=data
               deleteEventListner()
               saveData()
                
           
            
           
         })
     }
     
     
}



let addNewGroup=()=>{
    let item= document.getElementById('add')
   
    if(!item.value)
    { 
        item.focus()
       
        // item.style.backgroundColor = 'white';
       
        
        // setTimeout(() => {
        //     item.style.backgroundColor='white'
           
        //     item.focus()
        // }, 500);
        
        return
    }

 
    document.getElementById('addNewGroupItem').classList.add("add-new-group-original")
    document.getElementById('addNewGroupItem').classList.remove("add-new-group")                      
    document.getElementById('main').style.display= "block"

    saveData(item.value)
}

let activateAddScreen=()=>{

    document.getElementById('addNewGroupItem').classList.remove("add-new-group-original")
    document.getElementById('addNewGroupItem').classList.add("add-new-group")
  
    document.getElementById('main').style.display= "none"


}
let awake=()=>{
    document.getElementById('addnewgroup').addEventListener('click',()=>{
        addNewGroup()
    })
    document.getElementById('addScrBtn').addEventListener('click',()=>{
        activateAddScreen()
    })
  
    renderData()
    deleteEventListner()
    addEvent()
}
awake()


