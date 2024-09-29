// src/components/PieChart.jsx

import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const PieChart = ({ invested, roi }) => {
  const total = (invested || 0) + (roi || 0);

  // Always call hooks at the top level
  const investedAngle = useMemo(() => {
    return total > 0 ? (invested / total) * Math.PI * 2 : 0;
  }, [invested, total]);

  const roiAngle = useMemo(() => {
    return total > 0 ? (roi / total) * Math.PI * 2 : 0;
  }, [roi, total]);

  const investedShape = useMemo(() => {
    if (investedAngle === 0) return null;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, 1, 0, investedAngle, false);
    shape.closePath();
    return shape;
  }, [investedAngle]);

  const roiShape = useMemo(() => {
    if (roiAngle === 0) return null;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, 1, investedAngle, investedAngle + roiAngle, false);
    shape.closePath();
    return shape;
  }, [investedAngle, roiAngle]);

  // If total is zero, render nothing
  if (total === 0) return null;

  return (
    <>
      {/* Invested Slice */}
      {investedShape && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <extrudeGeometry args={[investedShape, { depth: 0.5, bevelEnabled: false }]} />
          <meshStandardMaterial color="#2ecc71" />
        </mesh>
      )}

      {/* ROI Slice */}
      {roiShape && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <extrudeGeometry args={[roiShape, { depth: 0.5, bevelEnabled: false }]} />
          <meshStandardMaterial color="#e74c3c" />
        </mesh>
      )}

      {/* Labels */}
      <Text
        position={[1.5, 0.25, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Invested
      </Text>
      <Text
        position={[-1.5, 0.25, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        ROI
      </Text>
    </>
  );
};

export default PieChart;
