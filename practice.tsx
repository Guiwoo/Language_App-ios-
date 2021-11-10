import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, Pressable } from "react-native";
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
export default function Practice() {
  const position: any = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  // if you want to change color change false to useNativeDriver
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  //PanResponder useRef ? Wanna persist the values
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //able to listen tocuh
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
    })
  ).current;
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          transform: position.getTranslateTransform(),
          borderRadius: borderRadius,
          backgroundColor: bgColor,
        }}
      />
    </Container>
  );
}
