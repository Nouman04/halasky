const multer = require('multer');
const fs = require('fs');


const ensureFilePathExist = (folderPath) => {
    if(!fs.existsSync(folderPath)){
        fs.mkdir(folderPath , {recursive : true});
    }
}


const createMulterStorage = (destinationPath)=>{
    ensureFilePathExist(destinationPath);
    return multer.diskStorage({
        destination :  (req, file , cb) => {
            cb(null , destinationPath);
        },
        filename : (req , file , cb ) => {
            const uniqueName = `${Date.now()} - ${file.originalname}`;
            cb(null , uniqueName);
        }
    });
}

const dynamicUploader = (destinationPath) =>{
    const storage = createMulterStorage(destinationPath);
    return multer({storage});
}


module.exports = {dynamicUploader};