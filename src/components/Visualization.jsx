// src/components/Visualization.jsx

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ErrorBoundary from './ErrorBoundary';

const Visualization = ({ data }) => {
  if (!data || data.growthData.length === 0) return null;

  const { growthData, totalInvested, profit } = data;

  return (
    <div className="w-full h-96 mt-6">
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[15, 20, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />

        {/* Decorative Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        {/* Orbit Controls for Interaction */}
        <OrbitControls />

        {/* Wrap visualizations with Suspense and ErrorBoundary */}
        <Suspense fallback={null}>
          <ErrorBoundary>
            {/* Line Chart positioned to the left */}
            <group position={[-5, 0, 0]}>
              <LineChart growthData={growthData} />
            </group>

            {/* Pie Chart positioned to the right */}
            <group position={[5, 0, 0]}>
              <PieChart invested={totalInvested} roi={profit} />
            </group>
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Visualization;
