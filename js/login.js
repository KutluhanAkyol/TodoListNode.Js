//  /$$      /$$ /$$$$$$$         /$$$$$$                      /$$   /$$      
//  | $$$    /$$$| $$__  $$       /$$__  $$                    | $$  /$$/      
//  | $$$$  /$$$$| $$  \ $$      | $$  \__/  /$$$$$$  /$$$$$$$ | $$ /$$/       
//  | $$ $$/$$ $$| $$$$$$$/      | $$ /$$$$ |____  $$| $$__  $$| $$$$$/        
//  | $$  $$$| $$| $$__  $$      | $$|_  $$  /$$$$$$$| $$  \ $$| $$  $$        
//  | $$\  $ | $$| $$  \ $$      | $$  \ $$ /$$__  $$| $$  | $$| $$\  $$       
//  | $$ \/  | $$| $$  | $$      |  $$$$$$/|  $$$$$$$| $$  | $$| $$ \  $$      
//  |__/     |__/|__/  |__/       \______/  \_______/|__/  |__/|__/  \__/

let userName=document.getElementById('kAdi')
let userPassword=document.getElementById('kSifre')
let btnLogIn=document.getElementById('LogIn')

fetch("http://localhost:8080/data/userData.json")
.then(res=>res.json())
.then(result=>{
    btnLogIn.addEventListener("click",function(){
        let dbLenght=result.users.dbLenght
        for(let i=0;i<dbLenght;i++)
        {
            let kAdi=result.users[i].user_name
            let kSifre=result.users[i].user_password
            if(kAdi==userName.value && kSifre==userPassword.value){
                window.location.href="http://localhost:8080/todo";
            }
            else{
                alert("Giriş Başarısız")
            }
        }
    })
})