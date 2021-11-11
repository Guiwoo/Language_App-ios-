import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";
import { Easing } from "react-native-reanimated";

interface colorInterface {
  color: string;
}

const color = {
  black: "#1e272e",
  grey: "#485460",
  green: "#2ecc71",
  red: "#e74c3c",
};

const Container = styled.View`
  flex: 1;
  background-color: ${color.black};
`;
const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${color.grey};
  border-radius: 50px;
`;
const Word = styled.Text<colorInterface>`
  font-size: 28px;
  font-weight: 500;
  color: ${(props) => props.color};
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

export default function App() {
  //Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-250, -70],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [70, 250],
    outputRange: [1, 2],
    extrapolate: "clamp",
  });
  //Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    useNativeDriver: true,
    easing: Easing.linear,
    duration: 80,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    useNativeDriver: true,
    easing: Easing.linear,
    duration: 80,
  });
  //Panresponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        console.log(dy);
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -230 || dy > 230) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              useNativeDriver: true,
              duration: 80,
              easing: Easing.linear,
            }),
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;
  //state
  const [index, setIndex] = useState(0);
  const nextIcon = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    Animated.spring(opacity, { toValue: 1, useNativeDriver: true }).start();
    setIndex((prev) => prev + 1);
  };
  return (
    <Container>
      <Edge>
        <WordContainer
          style={{
            transform: [{ scale: scaleOne }],
          }}
        >
          <Word color={color.green}>알아</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name={icons[index]} size={66} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer
          style={{
            transform: [{ scale: scaleTwo }],
          }}
        >
          <Word color={color.red}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
