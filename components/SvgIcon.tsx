import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface SvgIconProps {
  svgString: string;
  size?: number;
  color?: string;
}

export function SvgIcon({ svgString, size = 24, color }: SvgIconProps) {
  // Replace the stroke/fill color in the SVG string if color is provided
  let modifiedSvg = svgString;
  if (color) {
    // Replace stroke color
    modifiedSvg = modifiedSvg.replace(/stroke="#[^"]*"/g, `stroke="${color}"`);
    // Replace fill color
    modifiedSvg = modifiedSvg.replace(/fill="#[^"]*"/g, `fill="${color}"`);
  }

  return (
    <View style={{ width: size, height: size }}>
      <SvgXml xml={modifiedSvg} width={size} height={size} />
    </View>
  );
}

