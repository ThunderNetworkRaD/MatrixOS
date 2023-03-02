import fs from "node:fs/promises";

import system from "./system";

let
fileArray: any,
fileObject: any,
fileMap: any

export default function (path: string, recursive: boolean) {
    return new Promise((resolve, reject) => {
        if (recursive) {

        } else {
            fileArray = fs.readdir(path);

            

            fileArray.forEach((element: string) => {
                eval(`fileObject.${(system.info()).platform}`);
            });
        }
    })
}