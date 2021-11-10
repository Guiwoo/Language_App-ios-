import React, { useRef } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export default function App() {
  //Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-210, 210],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp",
  });

  //Animations
  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onGo = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  //Panresponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -210) {
          Animated.spring(position, {
            toValue: -400,
            useNativeDriver: true,
          }).start();
        } else if (dx > 210) {
          Animated.spring(position, {
            toValue: 400,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.parallel([onPressOut, onGo]).start();
        }
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
    })
  ).current;
  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
      >
        <Ionicons name="pizza" size={98} color="#ff5e57" />
      </Card>
    </Container>
  );
}
