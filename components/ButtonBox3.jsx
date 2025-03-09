import * as React from "react";
import { Svg, Path, G, Image, Rect, Text } from "react-native-svg";

const ButtonBox3 = (props) => {
  return (
    <Svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 362.54 362.54"
      xmlSpace="preserve"
    >
      <Path
        id="wrapper"
        fill="#FFFFFF"
        d="M352.04 362.04H10.5c-5.52 0-10-4.48-10-10V10.5c0-5.52 4.48-10 10-10h341.54c5.52 0 10 4.48 10 10v341.54c0 5.52-4.48 10-10 10"
      />
      <Path
        id="container_00000073717055901443484520000012620668108039788427_"
        fill={props.color || "#FF0000"}
        d="M347.04 354.03H16.5c-5.52 0-10-4.48-10-10V13.49c0-5.52 4.48-10 10-10h330.54c5.52 0 10 4.48 10 10v330.54c0 5.52-4.48 10-10 10"
      />
      <Path
        id="shadow"
        d="M261.53,3.49h72.19h11.24c0,0,12.08-2,12.08,11.41s0,13.41,0,13.41V222.2
        c0,0-7.37-229.63-141.96-218.81L261.53,3.49z"
        opacity="0.2"
      />
      <G id="elements">
        <Image
          xlinkHref={require("../assets/images/mountain.png")}
          width="512"
          height="512"
          overflow="visible"
          transform="matrix(0.2811 0 0 0.2811 6.5 210.1199)"
        />
        <Image
          xlinkHref={require("../assets/images/mountain.png")}
          width="512"
          height="512"
          overflow="visible"
          transform="matrix(0.2811 0 0 0.2811 148.4063 210.1199)"
        />
        <Image
          xlinkHref={require("../assets/images/5C01182B.png")}
          width="236"
          height="513"
          overflow="visible"
          transform="matrix(0.2811 0 0 0.2811 290.6623 212.0167)"
        />
        <Image
          xlinkHref={require("../assets/images/sun.png")}
          width="512"
          height="512"
          overflow="visible"
          transform="matrix(0.1075 0 0 0.1075 14.138 11.0611)"
        />
      </G>
      <Text
        x={362.54 / 2} // Center horizontally
        y="32%" // Center vertically
        dy=".35em" // Adjust vertical alignment
        fontSize={props.fontSize} // Font size
        textAnchor="middle" // Ensures the text aligns relative to its center point
        alignmentBaseline="middle" // Helps vertically align text better
        fontWeight={900}
        fill={props.textColor}
      >
        {props.text}
      </Text>
    </Svg>
  );
};

export default ButtonBox3;
