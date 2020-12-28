const climControl = {
    on: () => {
        API.post("/api/v1/home/heat", { enable: true });
    },
    off: () => {
        API.post("/api/v1/home/heat", { enable: false });
    },
    setJob: (enable, hours) => {
        API.post('/api/v1/home/job', { enable, hours });

    },
    getJob: () => {
        return API.get('/api/v1/home/job');
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

        return fetch(uri, {
            method: "POST",
            body: d,
            headers: myHeaders,
        });
    },
    get: (uri) => {
        return fetch(uri);
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


function onClimControlLoad() {
    console.log("clim control load");
    let enable;

    document
        .getElementById("enable")
        .addEventListener('toggle', (event) => {
            console.log("test");
            enable = event.detail.isActive;
        });

    function form_update_job() {
        const hour = document.getElementById("hour").value;
        climControl.setJob(enable, hour);
    }

    climControl.getJob()
        .then((job) => {
            if (job.enable) {
                document.getElementById('enable').isActive = job.enable;
            }
            if (job.hour) {
                document.getElementById('hour').value = job.hour;
            }
        });

}


window.addEventListener('push', (event) => {
  if(event.currentTarget.location.pathname === '/home/clim.html') {
      onClimControlLoad();
  }
});

