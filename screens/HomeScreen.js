import React from 'react';
import { Card, Title, Paragraph, Button} from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <PaperProvider theme={theme}>
      <ScrollView>
      <Card style={styles.card}>
          <Card.Cover source={require('../assets/images/la.jpeg')} />
          <Card.Content>
              <Title style={styles.headings}>Los Angeles</Title>
              <Paragraph>Say goodbye to these, because it's the last time! Not tricks, Michael, illusions. No… but I'd like to be asked! Did you enjoy your meal, Mom? You drank it fast enough. No, I did not kill Kitty. However, I am going to oblige and answer the nice officer's questions because I am an honest man with no secrets to hide.</Paragraph>
              <Card.Actions style={styles.button}><Button mode="contained">Find Delicious Food</Button></Card.Actions>
          </Card.Content>
      </Card>
      <Card style={styles.card}>
          <Card.Cover source={require('../assets/images/sf.jpeg')} />
          <Card.Content>
              <Title style={styles.headings}>San Francisco</Title>
              <Paragraph>Say goodbye to these, because it's the last time! Not tricks, Michael, illusions. No… but I'd like to be asked! Did you enjoy your meal, Mom? You drank it fast enough. No, I did not kill Kitty. However, I am going to oblige and answer the nice officer's questions because I am an honest man with no secrets to hide.</Paragraph>
              <Card.Actions style={styles.button}><Button mode="contained">Find Delcious Food</Button></Card.Actions>
          </Card.Content>
      </Card>
      <Card style={styles.card}>
          <Card.Cover source={require('../assets/images/ny.jpg')} />
          <Card.Content>
              <Title style={styles.headings}>New York</Title>
              <Paragraph>Say goodbye to these, because it's the last time! Not tricks, Michael, illusions. No… but I'd like to be asked! Did you enjoy your meal, Mom? You drank it fast enough. No, I did not kill Kitty. However, I am going to oblige and answer the nice officer's questions because I am an honest man with no secrets to hide.</Paragraph>
              <Card.Actions style={styles.button}><Button mode="contained">Find Delicious Food</Button></Card.Actions>
          </Card.Content>
      </Card>
  </ScrollView>
  </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  card: {
      justifyContent: 'space-between',
      margin: 5,
  },
  button: {
      justifyContent: 'center',
  },
  headings: {
      textAlign: 'center'
  }
})