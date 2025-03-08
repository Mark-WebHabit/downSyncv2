import * as React from "react";
import { Svg, Path, G, Image, Text } from "react-native-svg";

const ButtonBox1 = (props) => {
  console.log(props?.text?.toString()?.length, props.text);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      id="Layer_1"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 362.54 362.54"
      role="img" // Adding role for accessibility
      aria-label="Button Box" // Adding aria-label for accessibility
    >
      <Path
        id="wrapper"
        fill="#fff"
        d="M352.04 362.04H10.5c-5.52 0-10-4.48-10-10V10.5c0-5.52 4.48-10 10-10h341.54c5.52 0 10 4.48 10 10v341.54c0 5.52-4.48 10-10 10"
      />
      <Path
        id="container_00000073717055901443484520000012620668108039788427_"
        fill={props.color}
        d="M347.04 354.03H16.5c-5.52 0-10-4.48-10-10V13.49c0-5.52 4.48-10 10-10h330.54c5.52 0 10 4.48 10 10v330.54c0 5.52-4.48 10-10 10"
      />
      <G id="elements">
        <Image
          xlinkHref={require("../assets/images/E7E46F95.png")}
          width="285"
          height="513"
          overflow="visible"
          transform="translate(10.663 173.217)scale(.238)"
        />
        <Image
          xlinkHref={require("../assets/images/E7E46F97.png")}
          width="437"
          height="294"
          overflow="visible"
          transform="translate(5.5 261.301)scale(.3341)"
        />
        <Image
          xlinkHref={require("../assets/images/E7E46F92.png")}
          width="512"
          height="295"
          overflow="visible"
          transform="translate(115.808 255.976)scale(.351)"
        />
        <Image
          xlinkHref={require("../assets/images/E7E46F93.png")}
          width="437"
          height="294"
          overflow="visible"
          transform="matrix(-.3341 0 0 .3341 357.038 261.301)"
        />
      </G>
      <Text
        x={362.54 / 2} // Half of the viewBox width
        y="45%" // Maintain vertical position
        fill={props.textColor} // Text color
        fontSize={props.fontSize} // Font size
        textAnchor="middle" // Ensures the text aligns relative to its center point
        alignmentBaseline="middle" // Helps vertically align text better
        fontWeight={900}
      >
        {props.text}
      </Text>

      <Path
        id="shadow"
        d="M261.53,3.49h72.19h11.24c0,0,12.08-2,12.08,11.41s0,13.41,0,13.41V222.2
        c0,0-7.37-229.63-141.96-218.81L261.53,3.49z"
        opacity="0.2"
      />
    </Svg>
  );
};

export default ButtonBox1;
