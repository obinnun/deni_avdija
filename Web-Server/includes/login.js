async function createUser(e){
    await adminLogin()
    const usernameValue = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const pwValue = document.getElementById('userpw').value;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${window.secretToken}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"first_name":first_name,"last_name":last_name,"email":usernameValue,"password":pwValue});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
	//mode: 'no-cors',
    };

    try {
        const response = await fetch("http://vmedu260.mtacloud.co.il:8091/users/insert", requestOptions)
        console.log(await response.json())
        if(response.ok){

            alert("המשתמש נוצר בהצלחה")
            window.location.replace(window.location.href.replace("createuser","login"))

        } else {
            alert("שגיאה ביצירת המשתמש")

        }
    }catch (e) {
        alert("שגיאה ביצירת המשתמש")
        console.error(e)
    }

}


async function adminLogin(){
    const usernameValue = "myemail";
    const pwValue ="12345"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic Og==");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", usernameValue);
    urlencoded.append("password", pwValue);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
	//mode: 'no-cors',
    };

    try {
        const response = await fetch("http://vmedu260.mtacloud.co.il:8091/login", requestOptions)
        //const response = await fetch("/login", requestOptions)
	window.secretToken =  (await response.json()).access_token

    } catch (e){
        console.error("Error")
        console.log(e)
    }
}



async function login() {
    const usernameValue = document.getElementById('username').value;
    const pwValue = document.getElementById('userpw').value;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic Og==");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", usernameValue);
    urlencoded.append("password", pwValue);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
	//mode: 'no-cors',
    };



    try {
        const response = await fetch("http://vmedu260.mtacloud.co.il:8091/login", requestOptions)
	console.log(response)
        if(response.ok){
            const token = (await response.json()).access_token
            window.secretToken = token
            window.localStorage.setItem("token", token);
            alert("ההתחברות בוצעה בהצלחה")
            window.location.replace(window.location.href.replace("login","store"))
        } else {

            alert("ההתחברות נכשלה")
        }

    } catch (e){
        console.log("Error")
        console.log(e)
    }


    //NEED TO VALIDATE IF THE USER IS EXIST OR NOT//
    // window.open("../includes/store.html");
}
