import os from "node:os";

export default function () {
    return {
        platform: os.platform()
    }    
}