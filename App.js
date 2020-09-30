/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, Alert, StyleSheet, View} from 'react-native';

import Realm from 'realm';
import {Task} from './src/model/Task';
import {ObjectId} from 'bson';

let user;
let realm;

async function anonymousLogin() {
  try {
    const appConfig = {
      id: 'insotreadmin-jtmoy',
      timeout: 10000,
    };
    const app = new Realm.App(appConfig);
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
  } catch (error) {
    console.log('ERROR ==> ', error);
  }
}

async function openRealm() {
  try {
    await anonymousLogin();
    const config = {
      schema: [Task],
      sync: {
        user: user,
        partitionValue: 'instore',
      },
    };
    realm = await Realm.open(config);
    console.log('REALM OPEN SUCCEED');
    console.log(realm);
  } catch (error) {
    throw `Error opening realm: ${JSON.stringify(error, null, 2)}`;
  }
}

async function create() {
  realm.write(() => {
    realm.create('Task', {
      _id: new ObjectId(),
      title: 'go grocery shopping',
      status: 'Open',
      _partition: '',
    });
  });
}

const App: () => React$Node = () => {
  openRealm();
  return (
    <View style={styles.container}>
      <Button title="create" color="#000" onPress={create} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
