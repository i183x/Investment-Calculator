// src/components/LineChart.jsx

import React, { useMemo } from 'react';
import { Line, Text } from '@react-three/drei';
import { Vector3 } from 'three';

const LineChart = ({ growthData }) => {
  // Determine scaling factor based on max amount to fit within the scene
  const maxAmount = Math.max(...growthData);
  const scalingFactor = maxAmount > 0 ? 5 / maxAmount : 1; // Adjust 5 based on your scene's scale

  // Prepare the points for the line
  const points = useMemo(() => {
    return growthData.map((amount, index) => new Vector3(index * 2, amount * scalingFactor, 0));
  }, [growthData, scalingFactor]);

  // Prepare Y-axis labels at 0%, 50%, 100%
  const yLabels = useMemo(() => {
    return [
      { label: '₹0', position: [-1, 0, 0] },
      { label: `₹${(maxAmount / 2).toLocaleString('en-IN')}`, position: [-1, (maxAmount / 2) * scalingFactor, 0] },
      { label: `₹${maxAmount.toLocaleString('en-IN')}`, position: [-1, maxAmount * scalingFactor, 0] },
    ];
  }, [maxAmount, scalingFactor]);

  return (
    <>
      {/* Axes Helpers */}
      <axesHelper args={[10]} />

      {/* X-Axis Labels */}
      {growthData.map((_, index) => (
        <Text
          key={`x-label-${index}`}
          position={[index * 2, -0.5, 0]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Year {index}
        </Text>
      ))}

      {/* Y-Axis Labels */}
      {yLabels.map((item, index) => (
        <Text
          key={`y-label-${index}`}
          position={item.position}
          fontSize={0.3}
          color="black"
          anchorX="end"
          anchorY="middle"
        >
          {item.label}
        </Text>
      ))}

      {/* Line Chart */}
      <Line
        points={points}
        color="#3498db"
        lineWidth={2}
        dashed={false}
        opacity={1}
        transparent={false}
      />

      {/* Data Points */}
      {points.map((point, index) => (
        <mesh key={`point-${index}`} position={point} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#e74c3c" />
        </mesh>
      ))}
    </>
  );
};

export default LineChart;
