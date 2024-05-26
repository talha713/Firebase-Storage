// USING uploadBytes ------------------------------------------------------------------------------------------

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyBd69UI9bAna_NVO9LnQUvg8ibOy93Yv28",
//     authDomain: "fir-class1-424c0.firebaseapp.com",
//     projectId: "fir-class1-424c0",
//     storageBucket: "fir-class1-424c0.appspot.com",
//     messagingSenderId: "643394619425",
//     appId: "1:643394619425:web:8638ad5808bd39405bfb60",
//     measurementId: "G-QE5RQX7YKW"
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);


// let getBtn = document.querySelector("#btn")
// getBtn.addEventListener('click', () => {
//     let getFile = document.getElementById("file")
//     console.log(getFile.files[0]);
// })

// let getFile = document.getElementById("file")
// getFile.addEventListener('change', (data) => {
//     let getImage = document.querySelector("#image")
//     getImage.src = URL.createObjectURL(data.target.files[0])
//     console.log(getImage);
//     let getImgUrl = getImage.src
// })

// getFile.addEventListener('change', async (event) => {
//     const file = event.target.files[0];
    
//     // Create a reference to the file in Firebase Storage
//     const storageRef = ref(storage, `images/${file.name}`);

//     // Upload file to Firebase Storage
//     try {
//         const snapshot = await uploadBytes(storageRef, file);
//         console.log('File uploaded successfully');

//         // Get the download URL of the uploaded file
//         const downloadURL = await getDownloadURL(snapshot.ref);
//         console.log('File available at', downloadURL);

//         // Now you can use the downloadURL as needed
//     } catch (error) {
//         console.error('Error uploading file:', error);
//     }
// });



// USING uploadBytesResumable ------------------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBd69UI9bAna_NVO9LnQUvg8ibOy93Yv28",
    authDomain: "fir-class1-424c0.firebaseapp.com",
    projectId: "fir-class1-424c0",
    storageBucket: "fir-class1-424c0.appspot.com",
    messagingSenderId: "643394619425",
    appId: "1:643394619425:web:8638ad5808bd39405bfb60",
    measurementId: "G-QE5RQX7YKW"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


let getBtn = document.querySelector("#btn")
getBtn.addEventListener('click', () => {
    let getFile = document.getElementById("file")
    console.log(getFile.files[0]);
})

let getFile = document.getElementById("file")
getFile.addEventListener('change', (data) => {
    let getImage = document.querySelector("#image")
    getImage.src = URL.createObjectURL(data.target.files[0])
    console.log(getImage);
    let getImgUrl = getImage.src
})

getFile.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Error uploading file:', error);
        },
        async () => {
            // Handle successful uploads on complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
        }
    );
});
