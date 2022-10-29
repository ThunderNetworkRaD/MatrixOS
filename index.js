const checkWeb = require('./modules/updates.js');
//std.createCin(process.stdin, process.stdout);
checkWeb()
.then(() => {
    const MapDB = require('@fiusdevelopment/map.db');
    const cdb = new MapDB('credentials.db');
    if (cdb.size() > 0) {
        const login = require('./modules/login.js');
        login();
    } else {
        const register = require('./modules/register.js');
        register();
    }
})

/*  _____     _____ ___ _   _ ____    ____                 _                                  _     ____   ___ ____  ____  
   / ___ \   |  ___|_ _| | | / ___|  |  _ \  _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_  |___ \ / _ \___ \|___ \ 
  / / __| \  | |_   | || | | \___ \  | | | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|   __) | | | |__) | __) |
 | | (__   | |  _|  | || |_| |___) | | |_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_   / __/| |_| / __/ / __/ 
  \ \___| /  |_|   |___|\___/|____/  |____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__| |_____|\___/_____|_____|
   \_____/                                                        |_| 
*/