// src/components/ErrorBoundary.jsx

import React from 'react';
import { Text } from '@react-three/drei'; // Import Text component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI in the 3D Canvas
      return (
        <mesh>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial color="#e74c3c" />
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Something went wrong.
          </Text>
        </mesh>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
