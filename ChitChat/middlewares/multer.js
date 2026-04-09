// import multer from "multer";


// export const multerUpload = multer({
//  limits: {
//     fileSize: 1024 * 1024 * 5,}
// });


// const singleAvatar = multerUpload.single("avatar")
//  export { singleAvatar }


import multer from "multer";

const storage = multer.memoryStorage(); // or use diskStorage
export const multerUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

export const singleAvatar = multerUpload.single("avatar");

export const  attachmentsMulter = multerUpload.array("files", 5);
