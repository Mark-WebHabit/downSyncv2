import * as React from "react";
import {
  Svg,
  Rect,
  Path,
  Defs,
  ClipPath,
  Image as SvgImage,
  Text,
} from "react-native-svg";
import { View, StyleSheet } from "react-native";

const ButtonSvg = (props) => (
  <View style={styles.container}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600.5 201.25"
      style={{
        enableBackground: "new 0 0 600.5 201.25",
      }}
      {...props}
    >
      <Rect width={600} height={200} fill="none" />

      {/* Clip Path Definition */}
      <Defs>
        <ClipPath id="clip">
          <Path d="M181,201H21c-11.05,0-20-8.95-20-20V21C1,9.95,9.95,1,21,1h160c11.05,0,20,8.95,20,20v160C201,192.05,192.05,201,181,201z" />
        </ClipPath>
      </Defs>

      {/* Original img_x5F_container path */}
      <Path
        id="img_x5F_container"
        fill={props.bgColor}
        stroke="#000000"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M181,201H21c-11.05,0-20-8.95-20-20V21C1,9.95,9.95,1,21,1h160c11.05,0,20,8.95,20,20v160C201,192.05,192.05,201,181,201z"
      />

      {/* Image inside img_x5F_container using ClipPath */}
      <SvgImage
        href={props.img}
        x="1"
        y="1"
        width="200"
        height="200"
        clipPath="url(#clip)" // Mask the image inside the path
      />

      <Path
        fill="#FFFFFF"
        stroke="#000000"
        strokeMiterlimit="10"
        d="M580,182H201V22h379c11.05,0,20,8.95,20,20v120C600,173.05,591.05,182,580,182z"
      />
      <Path
        fill={props.bgColor}
        d="M576,177H201V27h375c11.05,0,20,8.95,20,20v110C596,168.05,587.05,177,576,177z"
      />
      <Path
        id="shadow_x5F_container"
        fill={"rgba(0,0,0,0.4)"}
        d="M541.62,177h32.12c0,0,20.26,2,22.26-20l-0.32-113.54c0,0-2.8-15.46-18.24-16.46S584.24,169,541.62,177z"
      />
      <Rect
        id="text_x5F_container"
        x={201.5}
        y={26.5}
        width={340}
        height={151}
        fill={props.bgColor}
      />

      {/* Adding text inside text_x5F_container */}
      <Text
        x={371.5} // Centering the text horizontally
        y={130.5} // Centering the text vertically
        fontSize="70"
        fontWeight="bold"
        fill={`${props.isBlack ? "#000000" : "#FFFFFF"}`} // Text color
        textAnchor="middle" // Center the text
        transform={`${
          props?.index % 2 === 1 ? "translate(743, 0) scale(-1, 1)" : ""
        }`} // Flip the text horizontally
      >
        {props.text}
      </Text>
    </Svg>
  </View>
);

export default ButtonSvg;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
});
