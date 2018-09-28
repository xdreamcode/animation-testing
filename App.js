import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBar from './TabBar';

const Red = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;
const Yellow = () => <View style={{ flex: 1, backgroundColor: 'yellow' }} />;
const Green = () => <View style={{ flex: 1, backgroundColor: 'green' }} />;
const Blue = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />;
const Gray = () => <View style={{ flex: 1, backgroundColor: 'gray' }} />;
const Blanchedalmond = () => (
  <View style={{ flex: 1, backgroundColor: 'blanchedalmond' }} />
);

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'red', title: 'Red' },
      { key: 'yellow', title: 'Yellow' },
      { key: 'green', title: 'Green' },
      { key: 'blue', title: 'Blue' },
      { key: 'gray', title: 'Gray' },
      { key: 'blanchedalmond', title: 'Blanchedalmond' },
    ],
  };

  _renderTabBar = props => <TabBar {...props} />;

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          red: Red,
          yellow: Yellow,
          blanchedalmond: Blanchedalmond,
          green: Green,
          blue: Blue,
          gray: Gray,
        })}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
