import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { Slider, Box, Button } from "@mui/material";
import "./App.css";

// Types for model and slider props
interface ModelProps {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
}

function Model({ scale, rotation, position }: ModelProps) {
  const gltf = useGLTF("/model/LNC.glb");
  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      rotation={rotation}
      position={position}
    />
  );
}

function App() {
  // State variables for transformations
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Capture button handler
  const captureTransformations = () => {
    console.log("Captured Transformations:");
    console.log("Scale:", scale);
    console.log("Rotation:", rotation);
    console.log("Position:", position);
  };

  // Reset transformations
  const Reset = () => {
    setScale([1, 1, 1]);
    setRotation([0, 0, 0]);
    setPosition([0, 0, 0]);
  };

  // Save to clipboard
  const saveToClipboard = () => {
    const transformations = {
      scale,
      rotation,
      position,
    };

    const transformationsText = JSON.stringify(transformations, null, 2);
    navigator.clipboard
      .writeText(transformationsText)
      .then(() => {
        alert("Transformations saved to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard: ", err);
      });
  };

  return (
    <div className="App">
      {/* 3D Canvas */}
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} color="white" />
        <Model scale={scale} rotation={rotation} position={position} />
      </Canvas>

      {/* Sliders */}
      <Box sx={{ padding: "1rem", background: "#f0f0f0", color: "#333" }}>
        <h3>Scale</h3>
        <Slider
          value={scale[0]}
          min={0.1}
          max={5}
          step={0.1}
          onChange={(_e, value) =>
            setScale([value as number, value as number, value as number])
          }
        />
        <h3>Rotation (X, Y, Z)</h3>
        <Slider
          value={rotation[0]}
          min={-Math.PI}
          max={Math.PI}
          step={0.1}
          onChange={(_e, value) =>
            setRotation([value as number, rotation[1], rotation[2]])
          }
        />
        <Slider
          value={rotation[1]}
          min={-Math.PI}
          max={Math.PI}
          step={0.1}
          onChange={(_e, value) =>
            setRotation([rotation[0], value as number, rotation[2]])
          }
        />
        <Slider
          value={rotation[2]}
          min={-Math.PI}
          max={Math.PI}
          step={0.1}
          onChange={(_e, value) =>
            setRotation([rotation[0], rotation[1], value as number])
          }
        />
        <h3>Position (X, Y, Z)</h3>
        <Slider
          value={position[0]}
          min={-10}
          max={10}
          step={0.1}
          onChange={(_e, value) =>
            setPosition([value as number, position[1], position[2]])
          }
        />
        <Slider
          value={position[1]}
          min={-10}
          max={10}
          step={0.1}
          onChange={(_e, value) =>
            setPosition([position[0], value as number, position[2]])
          }
        />
        <Slider
          value={position[2]}
          min={-10}
          max={10}
          step={0.1}
          onChange={(_e, value) =>
            setPosition([position[0], position[1], value as number])
          }
        />

        {/* Buttons */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={captureTransformations}
        >
          Capture Transformations
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={Reset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={saveToClipboard}
        >
          Save to Clipboard
        </Button>
      </Box>
    </div>
  );
}

export default App;
