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
        return fetch(uri)
        .then(response => response.json());
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
    
    function toggleActive() {
     document.getElementById("enable").setAttribute("class", "toggle active");
    }
    
    document
        .getElementById("enable")
        .addEventListener('toggle', (event) => {
            
            ClimPageControl.enable = event.detail.isActive;
        });

    climControl.getJob()
        .then((job) => {
            console.log(job);
            if (job.enable) {
                console.log(job.enable);
                ClimPageControl.enable = true;
                toggleActive();
            }
            if (job.hour) {
                console.log(job.hour);
                document.getElementById('hour').value = job.hour;
            }
        });

}

const ClimPageControl = {
    enable: undefined,
    validateJobForm: () => {
        const hour = document.getElementById("hour").value;
        climControl.setJob(enable, hour);
    }
}

window.addEventListener('push', (event) => {
  if(event.currentTarget.location.pathname === '/home/clim.html') {
      onClimControlLoad();
  }
});

