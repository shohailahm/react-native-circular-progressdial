import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { Svg, Path, G,Circle } from 'react-native-svg';
var start1;
var end1;
export default class CircularProgress extends React.PureComponent {

  
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  circlePath(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
 
   
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ];
   
    return d.join(' ');
  }
  getxy(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    start1=start.x;
    end1=start.y;
    console.log(start1,end1);
    return {x:start1,y:end1} 
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      children,
    } = this.props;

    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const circlePoints=this.getxy(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const offset = size - (width * 2);
    console.log(circlePath);
    const childContainerStyle = {
      position: 'absolute',
      left: width,
      top: width,
      width: offset-4,
      height: offset,
      borderRadius: offset / 4,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    };

    return (
      <View style={[style,{justifyContent:'center',alignItems:'center'}]}>
        <Svg
          width={size+8}
          height={size}
          style={{ backgroundColor: 'transparent',width:size+4}}
        >
          <G rotation={rotation} originX={(size/2)+3} originY={size/2}>
            { backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth+4 || width+4}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
            <Path
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeLinecap={lineCap}
              fill="transparent"
            />
               <Circle cx={circlePoints.x} cy={circlePoints.y} r={18} fill="#fff"  />
          <Circle cx={circlePoints.x} cy={circlePoints.y} r={10} fill="#89a3f8" />
          </G>
       
        </Svg>
        {children && (
          <View style={childContainerStyle}>
            {children(fill)}
          </View>
        )}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};
