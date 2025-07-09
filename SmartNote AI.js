import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
    import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAs-woLjwy4BhQzyutYh8I2h3-jzhe_kY4",
      authDomain: "smartnote-ai-d2dd1.firebaseapp.com",
      projectId: "smartnote-ai-d2dd1",
      storageBucket: "smartnote-ai-d2dd1.firebasestorage.app",
      messagingSenderId: "982239102580",
      appId: "1:982239102580:web:0f38bccf724cf6e5a17321",
      measurementId: "G-79Y1C2GMLC"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const storage = getStorage(app);
    const provider = new GoogleAuthProvider();

    window.auth = auth;
    window.provider = provider;
    window.storage = storage;
    window.ref = ref;
    window.uploadBytes = uploadBytes;
    window.listAll = listAll;
    window.getDownloadURL = getDownloadURL;
    window.deleteObject = deleteObject;

    window.onload = () => {
      const loginBtn = document.getElementById("loginBtn");
      const logoutBtn = document.getElementById("logoutBtn");
      const userStatus = document.getElementById("userStatus");
      const uploadsList = document.getElementById("uploadsList");

      loginBtn.onclick = () => signInWithPopup(auth, provider);
      logoutBtn.onclick = () => signOut(auth);

      onAuthStateChanged(auth, async user => {
        if (user) {
          userStatus.textContent = `Hello, ${user.displayName}`;
          loginBtn.classList.add("hidden");
          logoutBtn.classList.remove("hidden");
          loadUserUploads(user.uid);
        } else {
          userStatus.textContent = "You are not logged in.";
          loginBtn.classList.remove("hidden");
          logoutBtn.classList.add("hidden");
          uploadsList.innerHTML = "";
        }
      });

      async function loadUserUploads(uid) {
        const userRef = ref(storage, `pdfs/${uid}`);
        uploadsList.innerHTML = "Loading...";
        try {
          const res = await listAll(userRef);
          if (res.items.length === 0) {
            uploadsList.innerHTML = "No uploads found.";
            return;
          }
          const links = await Promise.all(
            res.items.map(async item => {
              const url = await getDownloadURL(item);
              return `<li class='flex justify-between items-center'>
                <a href='${url}' target='_blank' class='text-blue-600 underline'>${item.name}</a>
                <button data-path='${item.fullPath}' class='delete-btn text-red-500 text-sm ml-4'>Delete</button>
              </li>`;
            })
          );
          uploadsList.innerHTML = `<ul class="list-disc pl-5 space-y-2">${links.join("")}</ul>`;

          document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async () => {
              const path = button.dataset.path;
              if (confirm(`Delete file ${path}?`)) {
                await deleteObject(ref(storage, path));
                loadUserUploads(uid);
              }
            };
          });
        } catch (err) {
          uploadsList.innerHTML = `Error fetching uploads: ${err.message}`;
        }
      }
    };
