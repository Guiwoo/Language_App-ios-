## Start Interactive

1. Animated
   |useRef|
   |----------------------------------------------|
   |Set a State React Component will re-render|
   |if Protect the value persist object by useRef|
   |ex)useRef(new Animated.Value(0)).current|

   | Basic                               |
   | ----------------------------------- |
   | toValue: Set a Value to go where -- |
   | useNativeDriver: Always true ------ |

   | 1. timing                                                                      |
   | ------------------------------------------------------------------------------ |
   | duration: Length of animation (milliseconds). Default 500.--                   |
   | easing: Easing function to define curve. Default is Easing.inOut(Easing.ease). |
   | delay: Start the animation after delay (milliseconds). Default 0.--            |
   | useNativeDriver: Uses the native driver when true. Default false.--            |

   | 2. spring                                             |
   | ----------------------------------------------------- |
   | friction: Controls "bounciness"/overshoot. Default 7. |
   | tension: Controls speed. Default 40.                  |
   | speed: Controls speed of the animation. Default 12.   |
   | bounciness: Controls bounciness. Default 8.           |

   | 3. Interpolation                                      |
   | ----------------------------------------------------- |
   | 무언가를 대체할떄 300 을 1 로 ?                       |
   | input , output 항상 같은 수의 갯수를 받아야함         |
   | 그냥 함수 같음 y = 2x 이런느낌                        |
   | border,bgcolor,rotation awesome so cool               |
   | #When you need to change color check out nativeDriber |

   | 4. PanResponder Api                                 |
   | --------------------------------------------------- |
   | What is this ? Recognize gesture of fingers or move |
