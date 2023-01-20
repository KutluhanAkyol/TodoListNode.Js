//  /$$      /$$ /$$$$$$$         /$$$$$$                      /$$   /$$      
//  | $$$    /$$$| $$__  $$       /$$__  $$                    | $$  /$$/      
//  | $$$$  /$$$$| $$  \ $$      | $$  \__/  /$$$$$$  /$$$$$$$ | $$ /$$/       
//  | $$ $$/$$ $$| $$$$$$$/      | $$ /$$$$ |____  $$| $$__  $$| $$$$$/        
//  | $$  $$$| $$| $$__  $$      | $$|_  $$  /$$$$$$$| $$  \ $$| $$  $$        
//  | $$\  $ | $$| $$  \ $$      | $$  \ $$ /$$__  $$| $$  | $$| $$\  $$       
//  | $$ \/  | $$| $$  | $$      |  $$$$$$/|  $$$$$$$| $$  | $$| $$ \  $$      
//  |__/     |__/|__/  |__/       \______/  \_______/|__/  |__/|__/  \__/
import fs from "fs"
import express from "express"
import bodyParser from "body-parser"



var app =express()
app.use(express.static("C:/Users/user/Desktop/TodoListOrLoginApp"))
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
app.use(bodyParser.json())
app.listen(8080, ()=> {
    console.log("Server running at http://localhost:8080")
})
//C:\Users\DC\Desktop\TodoListOrLoginApp\html\login.html evdeki pc
//C:\Users\user\Desktop\TodoListOrLoginApp\html\login.html stajdaki pc
app.get("/login",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/login.html")
})

app.get("/register",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/register.html")
})
//C:\Users\user\Desktop\TodoListOrLoginApp\html\todo.html
app.get("/todo",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/todo.html")
})

app.post("/register",urlencodedParser,(req,res)=>{
    
    fs.readFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/userData.json","utf-8",(err,file)=>{
        if(err){
            console.log(err)
        }
        else
        {
        let userData= JSON.parse(file)
        let bData= userData.users
        // console.log(bData)
        let IDS= userData.users.length
        let id=++IDS
        let kAdi= req.body.userName
        let kSifre= req.body.userPassword
      
        let newUsers ={"id":id,"user_name":kAdi, "user_password":kSifre}
        let newNotesData={"id":id,"todo":["Yeni Kullanıcı"]}
        bData.push(newUsers)


            fs.writeFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/userData.json",JSON.stringify(userData,null,2),(err)=>{
                if(err){
                    console.log(err)
                    
                }
                else{
                    console.log(`-------------\nNew Users Sign Up \nName:${kAdi} Password:${kSifre} \n-------------`)
                  
                }
            })

            fs.readFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/notes.json","utf-8",(err,file)=>{
                if(err){
                    console.log(err)
                }
                else{
                let notesData=JSON.parse(file)
                let notes= notesData.save
                notes.push(newNotesData)
                fs.writeFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/notes.json",JSON.stringify(notesData,null,2),(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(`----------\nNew Todo Added \nUser_ID=${id}\n-----------`)
                       
                    }
                })
                res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/login.html")
                }
            })
        }

        
    })
})

var followUp;
app.post("/login",urlencodedParser,(req,res)=>{
    fs.readFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/userData.json","utf-8",(err,file)=>{
        if(err){
            console.log(err)
        }
        else{
            let kAdi= req.body.userName
            let kSifre= req.body.userPassword
            let files= JSON.parse(file)
            let persons= files.users.length
            for(let i=0;i<persons;i++){
                if(kAdi==files.users[i].user_name && kSifre==files.users[i].user_password)
                {
                  followUp = files.users[i];
                  res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/todo.html")

                  console.log(`${kAdi} Logined`)
                  break;
                }
            }
        }
    })
})

app.get("/GanK",(req,res)=>{
    res.send(followUp)
    // console.log(followUp)
  })

app.post("/todo",urlencodedParser,(req,res)=>{
    let allItems=req.body
   fs.readFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/notes.json","utf-8",(err,file)=>{
    if(err){
        console.log(err)
    }else{
        let todoData=JSON.parse(file)
        let user_ID
        fetch("http://localhost:8080/GanK")
        .then(resq=>resq.json())
        .then(GanK=>{
            user_ID=GanK.id
             --user_ID
            let persons=todoData.save[user_ID].todo
            // console.log(persons)
            persons.length=0
            for(let i=0;i<allItems.todo.length;i++)
            {
                persons.push(allItems.todo[i])
            }
            fs.writeFile("C:/Users/user/Desktop/TodoListOrLoginApp/data/notes.json",JSON.stringify(todoData),(err)=>{
                if(err){
                    console.log(err)
                }
            })
            res.sendFile("C:/Users/user/Desktop/TodoListOrLoginApp/html/todo.html")
        })
        
    }
   })
            

})
// app.post('/todo',(req,res)=>{
    
//     fs.readFile("C:/Users/DC/Desktop/TodoListOrLoginApp/data/notes.json","utf-8",(err,file)=>{
//         let userID
//         let todoData=JSON.parse(file)
        
//         .then(res=>res.json())
//         .then(info=>{
//             userID=--info.id
//             let persons=todoData.save[userID].todo
//             persons.length=0
//             for(let i=0;i<allItems.todo.length;i++){
//                 persons.push(allItems.todo[i])
//             }
//             fs.watchFile("C:/Users/DC/Desktop/TodoListOrLoginApp/data/notes.json",JSON.stringify(todoData),(err)=>{
//                 if(err){
//                     console.log(err)
//                 }
//             })
//         })
//     })

    

// })




  