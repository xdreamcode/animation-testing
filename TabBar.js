import React from 'react';
import {
  Animated,
  NativeModules,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  I18nManager,
} from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';

export default class TabBar extends React.Component {
  _renderIndicator = props => {
    if (typeof this.props.renderIndicator !== 'undefined') {
      return this.props.renderIndicator(props);
    }
    const { width, position, navigationState, totalWidth, routeWidths } = props;
    // const { width, position, navigationState } = props;

    console.log('STATE _renderIndicator', this.state);

    // if(navigationState.routes.length ===  )

    const outputRangeTranslate = navigationState.routes
      .map(_ => _.key)
      .map(_ => this.state[_] || 0)
      .reduce(
        (acc, current, j) => [
          ...acc,
          new Array(acc.length - 1)
            .fill(0)
            .map((_, i) => this.state[navigationState.routes[i].key] + 20 || 0)
            .reduce((a, c) => a + c, 0) +
            19.5 +
            current,
        ],
        [0],
      )
      .splice(0, navigationState.routes.length);

    console.log({
      state: this.state,
      outputRangeTranslate,
    });

    const translateX = position.interpolate({
      inputRange: new Array(navigationState.routes.length)
        .fill(0)
        .map((_, i) => i),
      outputRange: outputRangeTranslate,
    });

    const outputRangeScale = navigationState.routes
      .map(_ => _.key)
      .map(_ => this.state[_] || 0)
      .reduce(
        (acc, current) => [
          ...acc,
          current /
            (this.state[navigationState.routes[navigationState.index].key] ||
              1),
        ],
        [],
      );

    const scaleX = position.interpolate({
      inputRange: [...Array(navigationState.routes.length).fill(0)].map(
        (_, i) => i,
      ),
      outputRange: outputRangeScale,
    });
    return (
      <Animated.View
        style={[
          {
            width:
              this.state[navigationState.routes[navigationState.index].key] ||
              0,
            marginHorizontal: 10,
            height: 10,
            transform: [{ translateX }, { scaleX }],
            backgroundColor: 'green',
          },
          this.props.indicatorStyle,
        ]}
      />
    );
  };

  state = {
    totalWidth: 0,
  };

  render() {
    console.log(this.props);
    const { position, navigationState, scrollEnabled, bounces } = this.props;
    const { routes, index } = navigationState;
    const tabWidth = 200;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    // const translateX = Animated.multiply(59, -1);

    return (
      <View>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            width: 'auto',
          }}
          onLayout={event => {
            const { width } = event.nativeEvent.layout;
            console.log('onLayout', { width });
          }}
        >
          {routes.map(route => (
            <Text
              style={{ color: 'black', margin: 10, fontSize: 10 }}
              onLayout={event => {
                const { width } = event.nativeEvent.layout;
                console.log({ width });

                this.setState({ [route.key]: width });
              }}
            >
              {route.title}
            </Text>
          ))}
        </View>

        {/* <Animated.View
          pointerEvents="none"
          style={[{ width: tabBarWidth,}]}
        > */}
        {this._renderIndicator({
          ...this.props,

          totalWidth: this.state.totalWidth,
          routeWidths: this.state.routeWidths,
        })}
        {/* </Animated.View> */}
      </View>
    );
  }
}
