# WanderFood
WanderFood is a mobile application that lets users sign up and post their favorite restaurants and food items in various cities.

### Technologies Used
* React
* React-Native
* Expo
* Firebase
* Firestore

### Libraries Used
* react-native-elements
* react-native-maps
* react-native-swipeout
* react-navigation


### What I'm proud of
Apart from being proud of the entire app, there was one issue that took me a few hours to figure out. At first, the state of my map component would have the latitude and longitude of the city the user clicked on, and if the map was moved, the state would update. However, this was an issue because any tiny swipe of the map would cause the state to change, and so it looked like every city was having a mini earthquake. I eventually figured out that the location that the map pulled up didn't have to live in the component's state, and rather just have an initial region set for when the user navigates to that screen. 

```javascript
    <Button onPress={() => this.props.navigation.navigate('City', {latitude: item.latitude, longitude: item.longitude})}
        backgroundColor='#4267B2'
        title='Find the best local dish' />`
```
```javascript
    <MapView 
        style={{marginBottom: 10, height:160}}
        initialRegion={{
        latitude: this.props.navigation.state.params.latitude,
        longitude: this.props.navigation.state.params.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }} />`
```

### What was challenging
Honestly, the entire process of making a mobile application was challenging to me. I chose to learn React-Native AND Firebase in two weeks. I had to figure out how the navigational system worked (it wasn't just routers), learn what libraries I could and couldn't use with Expo, and on top of that, figure out how to utilize Google's Firebase as my back-end. While I don't regret it, I certaintly wasn't able to finish everything I envisioned for my app. 

### Unsolved Problems/Future Features
* I want to have users be able to navigate to the restaurant's page and be able to see all of the posts associated with that restaurant, and add to it if they choose. 
* I wanted to implement the Google Maps API into my project, and then the Google Places API, but I couldn't figure out how to hide my API key from the client-side, so I had to scratch that idea for now. However, in the future, users will be able to see where on the map the restaurants are located, as well as additional info about the restaurant. 



