import * as React from "react";
import { Svg, Path, G, Image, Rect, Text } from "react-native-svg";

const ButtonBox2 = (props) => {
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
      aria-label="Custom SVG" // Adding aria-label for accessibility
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
        <Rect
          id="table"
          x="10.61"
          y="280.77"
          fill="#603813"
          width="343.06"
          height="74.27"
        />
        <Image
          xlinkHref={require("../assets/images/A1F2C3DF.png")}
          width="248"
          height="759"
          overflow="visible"
          transform="matrix(0.4725 0 0 0.4725 5.2474 1.9184)"
        />
        <Image
          xlinkHref={require("../assets/images/A1F2C3DF.png")}
          width="248"
          height="759"
          overflow="visible"
          transform="matrix(-0.4725 0 0 0.4725 359.0385 1.9718)"
        />
        <Image
          xlinkHref={require("../assets/images/flower-pot.png")}
          width="512"
          height="512"
          overflow="visible"
          transform="matrix(0.1581 0 0 0.1581 215.0792 273.0733)"
        />
        <Image
          xlinkHref={require("../assets/images/flower-pot.png")}
          width="512"
          height="512"
          overflow="visible"
          transform="matrix(0.1581 0 0 0.1581 60 273.0733)" // Adjusted position to move to the left
        />
      </G>
      <Text
        x={362.54 / 2} // Center horizontally
        y="29%" // Center vertically
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

export default ButtonBox2;
