steps from this tutorial => https://www.youtube.com/watch?v=tkvQVt2sX7Y
-he created a firebase folder in src folder
-created a file named db.js inside of it
-imported the following inside of that db.js file

```
import firebase from "firebase";
import "firebase/firestore" ;
```

-then created a firebase web app inside the firebase console
-copied the firebaseeConfig part (starting with var firebaseConfig={})
-at the end of that config, there's an initialize firebase section. He changed it as follows=>

```
export const db= firebase.initializepp(firebaseConfig).firestore()

```

## main.js

-in main js, he added the following:

```
import {firestorePlugin} from "vuefire";
Vue.use{firestorePlugin};
```
