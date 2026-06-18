import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzLb0IPoZDBhY_-nlwwztoSK4dWvPKnmvMBILROsEnN7_bJ414DGh7aus18dO6-DKkd/exec";

const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const firstName =
      document.getElementById("firstName").value.trim();

    const lastName =
      document.getElementById("lastName").value.trim();

    const dob =
      document.getElementById("dob").value;

    const mobile =
      document.getElementById("mobile").value.trim();

    const portalEmail =
      document.getElementById("portalEmail").value.trim();

    const portalPassword =
      document.getElementById("portalPassword").value.trim();

    const partner =
      document.getElementById("partner").value;

    const country =
      document.getElementById("country").value;

    const intake =
      document.getElementById("intake").value;

    const settingsRef =
      doc(db, "settings", "system");

    const settingsSnap =
      await getDoc(settingsRef);

    if (!settingsSnap.exists()) {
      throw new Error("System settings not found");
    }

    const settingsData =
      settingsSnap.data();

    const studentNumber =
      settingsData.nextStudentNumber;

    const prefix =
      settingsData.studentIdPrefix || "VE";

    const studentId =
      `${prefix}${studentNumber}`;

    await createUserWithEmailAndPassword(
      auth,
      portalEmail,
      portalPassword
    );

    let folderUrl = "";

    const folderResponse =
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          action: "createStudentFolders",
          studentId,
          firstName,
          lastName
        })
      });

    const folderResult =
      await folderResponse.json();

    if (folderResult.success) {
      folderUrl =
        folderResult.studentFolderUrl;
    }

    await setDoc(
      doc(db, "students", studentId),
      {
        studentId,

        firstName,
        lastName,

        dob,
        mobile,

        portalEmail,
        portalPassword,

        partner,
        country,
        intake,

        status: "New",

        folderUrl,

        role: "student",

        accountStatus: "active",

        profileCompletion: 0,

        createdAt:
          serverTimestamp(),

        lastActivity:
          serverTimestamp()
      }
    );

    await updateDoc(
      settingsRef,
      {
        nextStudentNumber:
          studentNumber + 1
      }
    );

    alert(
      `Student Created Successfully\n\n${studentId}`
    );

    form.reset();

  } catch (error) {

    console.error(error);

    alert(
      error.message ||
      "Student creation failed"
    );
  }

});
