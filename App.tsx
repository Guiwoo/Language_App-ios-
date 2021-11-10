import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 250px;
  height: 250px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 100px;
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
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
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.8, 1],
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
  const goLeft = Animated.spring(position, {
    toValue: -400,
    tension: 5,
    useNativeDriver: true,
  });
  const goRight = Animated.spring(position, {
    toValue: 400,
    tension: 5,
    useNativeDriver: true,
  });
  //Panresponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -210) {
          goLeft.start();
        } else if (dx > 210) {
          goRight.start();
        } else {
          Animated.parallel([onPressOut, onGo]).start();
        }
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
    })
  ).current;
  //state
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    position.setValue(0);
    setIndex((prev) => prev + 1);
  };
  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };
  return (
    <Container>
      <CardContainer>
        <Card
          style={{
            transform: [{ scale: secondScale }],
          }}
        >
          <Ionicons name={icons[index + 1]} size={98} color="#ff5e57" />
        </Card>
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
          <Ionicons name={icons[index]} size={98} color="#ff5e57" />
        </Card>
      </CardContainer>
      <ButtonContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </ButtonContainer>
    </Container>
  );
}
