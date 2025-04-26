import React, { useState } from 'react';

const Transform: React.FC = () => {
    const [transform, setTransform] = useState({
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
    });

    return (
        <div className="transform-sidebar">
            <h2>Transform</h2>
            <div>
                <h3>Position</h3>
                <p>X: {transform.position.x}</p>
                <p>Y: {transform.position.y}</p>
                <p>Z: {transform.position.z}</p>
            </div>
            <div>
                <h3>Rotation</h3>
                <p>X: {transform.rotation.x}</p>
                <p>Y: {transform.rotation.y}</p>
                <p>Z: {transform.rotation.z}</p>
            </div>
            <div>
                <h3>Scale</h3>
                <p>X: {transform.scale.x}</p>
                <p>Y: {transform.scale.y}</p>
                <p>Z: {transform.scale.z}</p>
            </div>
        </div>
    );
};

export default Transform;