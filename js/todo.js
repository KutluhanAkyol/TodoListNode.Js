//  /$$      /$$ /$$$$$$$         /$$$$$$                      /$$   /$$      
//  | $$$    /$$$| $$__  $$       /$$__  $$                    | $$  /$$/      
//  | $$$$  /$$$$| $$  \ $$      | $$  \__/  /$$$$$$  /$$$$$$$ | $$ /$$/       
//  | $$ $$/$$ $$| $$$$$$$/      | $$ /$$$$ |____  $$| $$__  $$| $$$$$/        
//  | $$  $$$| $$| $$__  $$      | $$|_  $$  /$$$$$$$| $$  \ $$| $$  $$        
//  | $$\  $ | $$| $$  \ $$      | $$  \ $$ /$$__  $$| $$  | $$| $$\  $$       
//  | $$ \/  | $$| $$  | $$      |  $$$$$$/|  $$$$$$$| $$  | $$| $$ \  $$      
//  |__/     |__/|__/  |__/       \______/  \_______/|__/  |__/|__/  \__/

let items=[]
const txtBox= document.getElementById("txtBox")
const textArea=document.getElementById("textArea")
const addBtn=document.getElementById("add")
const saveBtn =document.getElementById("saveBtn")
const wlcm=document.getElementById("welcome")
let userinfos
fetch("http://localhost:8080/GanK")
.then(res=>res.json())
.then(reso=>{
   userinfos=reso

//C:\Users\user\Desktop\TodoListOrLoginApp\data\notes.json
fetch("http://localhost:8080/data/notes.json")
.then(ress=>ress.json())
.then(info=>{
let user_ID=userinfos.id
--user_ID

        let userName=reso.user_name
        wlcm.innerHTML=`To Do'ya Hoşgeldin ${userName} 💪`
    for(let i=0;i<info.save[user_ID].todo.length;i++){
        
        items.push(info.save[user_ID].todo[i])
        
        let saves=document.createElement('input')
        saves.name=`todo`
        saves.classList='parag-style';
        saves.value=items[i];
        textArea.appendChild(saves);
        saves.value=info.save[user_ID].todo[i]

        saves.addEventListener('dblclick',function(){
            textArea.removeChild(saves)
            let search= saves.value
            let find=items.indexOf(search)
            items.splice(find,1)

        })

    }
})
})

addBtn.addEventListener('click',function(){
    items.push(txtBox.value)
    txtBox.value=""
    textArea.innerHTML=""

    for(let i=0;i<items.length;i++){

        let saves=document.createElement('input')
        saves.name=`todo`
        saves.classList='parag-style';
        saves.value=items[i];
        textArea.appendChild(saves);
       console.log(saves.value);

       saves.addEventListener('dblclick',function(){
            textArea.removeChild(saves)
            let search= saves.value
            let find=items.indexOf(search)
            items.splice(find,1)

        })
    }
})


// fetch("http://localhost:8080/data/notes.json")
// .then(response=>response.json())
// .then(result=>{
// let userId=userInfo.id
// --userId
// for(let i=0;i<result.save[userId].todo.length;i++){
// addBtn.addEventListener('click',function(){
    
//     itemList.push(txtBox.value)
//     txtBox.value=""
//     textArea.innerHTML=""
    
//     for(let i=0;i<itemList.length;i++){
        
//     let parag=document.createElement('p')
//     parag.classList.add('parag-style')
//     textArea.appendChild(parag)
//     parag.innerHTML=itemList[i]
//     parag.value=result.save[userId].todo[i]
//     parag.addEventListener('dblclick',function(){
//         textArea.removeChild(parag)
//         let search= parag.innerHTML
//         let find=itemList.indexOf(search)
//         itemList.splice(find,1)
//     })
//     }
//     }
    
// )}
// })
