const climControl = {
    on: () => {
        post("/home/heat", { enable: true });
    },
    off: () => {
        post("/home/heat", { enable: false });
    },
    setJob: (enable, hours) => {
        post('/home/job', { enable, hours });

    },
    getJob: () => {
        return fetch('/home/job');
    }
}



const API = {
    post: (uri, data) => {
        const password = document.getElementById("password");
        data["password"] = password;
        const d = JSON.stringify(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Content-Length", d.length.toString());

        fetch(url, {
            method: "POST",
            body: d,
            headers: myHeaders,
        });
    }
}


const PasswordManager = {
    set: (password) => {
        console.log(password);
        localStorage.setItem("password", password);
    },
    get: () => {
        return localStorage.getItem("password");
    }
}
