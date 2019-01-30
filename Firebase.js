import * as firebase from 'firebase';
import 'firebase/firestore';



const config = {
    apiKey: "AIzaSyCvBplieU6piwGCMld3Pv6AOj-5f2ski8I",
    authDomain: "wanderfood.firebaseapp.com",
    databaseURL: "https://wanderfood.firebaseio.com",
    projectId: "wanderfood",
    storageBucket: "wanderfood.appspot.com",
    messagingSenderId: "585903263066"
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;