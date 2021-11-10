import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
export default function App() {
  const position = useRef(
    new Animated.ValueXY({ x: -SCREEN_W / 2 + 100, y: -SCREEN_H / 2 + 100 })
  ).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_W / 2 + 100,
      y: -SCREEN_H / 2 + 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_W / 2 - 100,
      y: -SCREEN_H / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_W / 2 + 100,
      y: SCREEN_H / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_W / 2 - 100,
      y: SCREEN_H / 2 - 100,
    },
    useNativeDriver: false,
  });
  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };
  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  // if you want to change color change false to useNativeDriver
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [
              // { rotateY: rotation },
              ...position.getTranslateTransform(),
            ],
            borderRadius: borderRadius,
            backgroundColor: bgColor,
          }}
        />
      </Pressable>
    </Container>
  );
}
