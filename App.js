/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
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
      schema: [Task.schema],
      sync: {
        user: user,
        partitionValue: 'insotreadmin-jtmoy'
      },
    };
    realm = await Realm.open(config);
    console.log('REALM OPEN SUCCEED');
  } catch (error) {
    console.log(error);
  }
}

async function create() {
  realm.write(() => {
    const task = {
      title: 'Manolo',
      status: 'open',
      _partitionValue: 'insotreadmin-jtmoy',
      _id: new ObjectId()
    };
    const newTask = realm.create('Task', task);
    console.log(realm.objects('Task'))
  });
}

function getTasks() {
  if (realm) {
    const tasks = realm.objects('Task');
    console.log(tasks);
  }
}

const App = () => {
  useEffect(() => {
    openRealm();
  }, []);
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
