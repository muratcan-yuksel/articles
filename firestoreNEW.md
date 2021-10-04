To start with, you have this link that actually works => https://github.com/muratcan-yuksel/firestore-works/blob/main/index.html

For some reason, the current firebase sdk doesn't work. I need to change it whiles using it with html/css/js (the usual structure). Now, for instance, I'm doing a tutorial and this is the way that actually works:

## Structure that works

```
  <body>
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></script>
        <!-- without this one, firestore won't work -->
    <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-analytics.js"></script>
    <script>
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyAhRRF2s1vCFIYo3g8r1t4JouD7uIKIMmU",
        authDomain: "ninja2-6d88b.firebaseapp.com",
        projectId: "ninja2-6d88b",
        storageBucket: "ninja2-6d88b.appspot.com",
        messagingSenderId: "475746638473",
        appId: "1:475746638473:web:401b096f9f0fd688560458",
        measurementId: "G-CB8GCQ6ZVC",
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    </script>
    <script src="./app.js"></script>
  </body>
```

## Getting documents & data

we have our `const db = firebase.firestore();`

-to get the data stored in various documents (the middle one in the firestore console) in a collection (the 1st part of the console):

```
db.collection("cafes")
.get()
.then((snapshot) => {
//snapshot is the representation of the data at that particular time
// console.log(snapshot.docs);
//this docs above gets the documents
//the middle one on the firestore console
//check below: this is how we get the data in each document
snapshot.docs.forEach((doc) => {
console.log(doc.data());
});
});
```

## Adding documents to firestore

to add documents, we'll use `add({})` method instead of `get()` method.

As you can see, "add" method takes in an object as a parameter. I'm not sure if that's the case all the time, but you can check it for yourself later on. Now, how to add data?

In the example of the Net Ninja, we use a form to submit the data to firestore. It's not extremely important tho. Check this out:

```
  db.collection("cafes").add({
    name: "a namey",
    city: "Milan",
    glock: "hit",
  });

```

That's all.

## Deleting documents from firestore

Simply: ` db.collection("cafes").doc(id).delete();`
Here, the "id" in "doc" is the id of the document I want to delete. That's all.
