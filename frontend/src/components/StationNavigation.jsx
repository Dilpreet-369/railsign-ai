import React, { useState, useEffect, useRef } from 'react';

/**
 * StationNavigation - Interactive Railway Station Navigation Map
 * Features:
 * - Visual station map with platforms and tracks
 * - Current position marker (blue dot) with pulse animation
 * - Destination marker (red dot)
 * - L-shaped navigation route (orange dashed animated line)
 * - Platform selection controls
 * - Smooth animated transitions
 * - Accessible with ARIA live regions
 */
export default function StationNavigation() {
  const [selectedPlatform, setSelectedPlatform] = useState(3);
  const [currentPosition, setCurrentPosition] = useState({ x: 130, y: 315 });
  const [movementStatus, setMovementStatus] = useState('Ready to navigate');
  const [isAnimating, setIsAnimating] = useState(false);

  const mapRef = useRef(null);
  const currentPositionRef = useRef(null);

  // Platform vertical positions (top values in px)
  const platformPositions = {
    1: 45,
    2: 155,
    3: 265,
    4: 375,
    5: 485,
  };

  // Calculate route elements positions
  const routePositions = {
    horizontal1Top: 340,
    verticalLeft: 255,
    crossingLeft: 230,
    crossingTop: 300,
  };

  const goToPlatform = (platform) => {
    if (isAnimating) return;

    setSelectedPlatform(platform);
    const targetY = platformPositions[platform];
    animateToDestination(targetY, platform);
    updateRoute(platform);
  };

  const animateToDestination = (targetY, platform) => {
    const map = mapRef.current;
    const currentPositionEl = currentPositionRef.current;
    if (!map || !currentPositionEl) return;

    setIsAnimating(true);
    setMovementStatus(`Moving to Platform ${platform}...`);

    const startX = 130;
    const startY = 315;
    const crossingX = 255;
    const destinationX = map.clientWidth - 70;

    // Cancel any existing animations
    currentPositionEl.getAnimations?.().forEach((animation) => animation.cancel());

    const movement = currentPositionEl.animate(
      [
        { left: `${startX}px`, top: `${startY}px` },
        { left: `${crossingX}px`, top: `${startY}px` },
        { left: `${crossingX}px`, top: `${targetY}px` },
        { left: `${destinationX}px`, top: `${targetY}px` },
      ],
      {
        duration: 1800,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    movement.addEventListener('finish', () => {
      setCurrentPosition({ x: destinationX, y: targetY });
      setMovementStatus('Arrived at destination');
      setIsAnimating(false);
    });
  };

  const updateRoute = (platform) => {
    const targetY = platformPositions[platform];

    // Update vertical route
    const verticalTop = Math.min(targetY, 340);
    const verticalHeight = Math.abs(targetY - 340);

    // Update second horizontal route
    const horizontal2Top = targetY;

    // These will be applied via refs or state
    // For simplicity, we'll use inline styles in the render
  };

  // Compute route styles dynamically
  const getRouteStyles = () => {
    const targetY = platformPositions[selectedPlatform];
    const verticalTop = Math.min(targetY, 340);
    const verticalHeight = Math.abs(targetY - 340);
    const horizontal2Top = targetY;

    return {
      horizontal1: { top: '340px' },
      vertical: { top: `${verticalTop}px`, height: `${verticalHeight}px` },
      horizontal2: { top: `${horizontal2Top}px` },
      crossing: {
        top: `${Math.min(targetY, 340) - 40}px`,
        left: '230px',
      },
      destination: { top: `${targetY}px` },
      destinationLabel: { top: `${targetY - 5}px` },
    };
  };

  const routeStyles = getRouteStyles();

  return (
    <div className="station-navigation" role="application" aria-label="Railway Station Navigation">
      {/* Header */}
      <div className="nav-header">
        <div>
          <h1 className="nav-title">🚆 Railway Station</h1>
          <p className="nav-subtitle">Accessible Station Navigation</p>
        </div>
        <div className="nav-status" aria-live="polite">
          ● Navigation Active
        </div>
      </div>

      {/* Map */}
      <div className="nav-map" ref={mapRef}>
        {/* Station Entrance */}
        <div className="nav-entrance">
          <div className="nav-entrance-icon">🚪</div>
          <span>Station Entrance</span>
        </div>

        {/* Tracks Area */}
        <div className="nav-tracks">
          {Object.entries(platformPositions).map(([platform, top]) => (
            <div
              key={platform}
              className="nav-platform"
              style={{ top: `${top}px` }}
            >
              <div className="nav-platform-name">Platform {platform}</div>
              <div className="nav-track">
                <div className="nav-sleepers" />
              </div>
            </div>
          ))}

          {/* L-Shaped Route */}
          <div className="nav-route">
            <div
              className="nav-route-horizontal"
              style={routeStyles.horizontal1}
            />
            <div
              className="nav-route-vertical"
              style={routeStyles.vertical}
            />
            <div
              className="nav-route-horizontal2"
              style={routeStyles.horizontal2}
            />
          </div>

          {/* Safe Crossing */}
          <div
            className="nav-crossing"
            style={routeStyles.crossing}
          >
            🚶<br />SAFE<br />CROSSING
          </div>

          {/* Current Position */}
          <div
            id="currentPosition"
            ref={currentPositionRef}
            className="nav-current-position"
            style={{
              left: `${currentPosition.x}px`,
              top: `${currentPosition.y}px`,
            }}
            aria-live="polite"
          >
            📍
          </div>

          {/* Movement Status */}
          <div
            id="movementStatus"
            className="nav-movement-status"
            aria-live="polite"
          >
            {movementStatus}
          </div>

          {/* Destination */}
          <div
            className="nav-destination"
            style={routeStyles.destination}
          >
            🚉
          </div>

          {/* Destination Label */}
          <div
            className="nav-destination-label"
            style={routeStyles.destinationLabel}
          >
            Platform {selectedPlatform}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="nav-controls" role="group" aria-label="Platform selection">
        {Object.keys(platformPositions).map((platform) => (
          <button
            key={platform}
            className={`nav-btn ${Number(platform) === selectedPlatform ? 'active' : ''}`}
            onClick={() => goToPlatform(Number(platform))}
            disabled={isAnimating}
            aria-pressed={Number(platform) === selectedPlatform}
          >
            Platform {platform}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="nav-legend">
        <div className="nav-legend-item">
          <span className="nav-legend-dot nav-blue-dot" />
          Current Position
        </div>
        <div className="nav-legend-item">
          <span className="nav-legend-dot nav-red-dot" />
          Destination
        </div>
        <div className="nav-legend-item">
          <span className="nav-legend-line nav-orange-line" />
          Walking Route
        </div>
      </div>

      {/* Status */}
      <div className="nav-status-bar" aria-live="polite">
        {movementStatus}
      </div>

      {/* Styles */}
      <style jsx>{`
        .station-navigation {
          width: 95%;
          max-width: 1200px;
          margin: 30px auto;
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
          font-family: Arial, sans-serif;
        }

        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .nav-title {
          margin: 0;
          font-size: 28px;
        }

        .nav-subtitle {
          margin: 5px 0 0;
          color: #666;
        }

        .nav-status {
          background: #e5f8ed;
          color: #168447;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
        }

        .nav-map {
          position: relative;
          height: 650px;
          border: 2px solid #d7ddd9;
          border-radius: 15px;
          overflow: hidden;
          background:
            linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .nav-entrance {
          position: absolute;
          left: 20px;
          top: 270px;
          width: 120px;
          height: 100px;
          background: #126b45;
          color: white;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          z-index: 20;
        }

        .nav-entrance-icon {
          font-size: 35px;
          margin-bottom: 5px;
        }

        .nav-tracks {
          position: absolute;
          left: 180px;
          right: 30px;
          top: 40px;
          bottom: 40px;
        }

        .nav-platform {
          position: absolute;
          left: 0;
          right: 0;
          height: 105px;
          display: flex;
          align-items: center;
        }

        .nav-platform-name {
          width: 100px;
          font-weight: bold;
          color: #333;
          z-index: 10;
        }

        .nav-track {
          position: relative;
          height: 65px;
          flex: 1;
          background: #e1e1e1;
          border-top: 8px solid #c7c7c7;
          border-bottom: 8px solid #c7c7c7;
          overflow: hidden;
        }

        .nav-track::before,
        .nav-track::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: #292929;
          z-index: 2;
        }

        .nav-track::before {
          top: 12px;
        }

        .nav-track::after {
          bottom: 12px;
        }

        .nav-sleepers {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 18px,
            #777 18px,
            #777 23px,
            transparent 23px,
            transparent 43px
          );
          opacity: 0.45;
          z-index: 1;
        }

        /* Route Styles */
        .nav-route {
          position: absolute;
          z-index: 80;
          pointer-events: none;
        }

        .nav-route-horizontal,
        .nav-route-vertical,
        .nav-route-horizontal2 {
          position: absolute;
          background: #ff7800;
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(255, 120, 0, 0.6);
          background: repeating-linear-gradient(
            90deg,
            #ff7800 0px,
            #ff7800 12px,
            #ffd19a 12px,
            #ffd19a 20px
          );
          animation: routeMove 1s linear infinite;
        }

        .nav-route-horizontal {
          height: 8px;
          left: 155px;
          width: 100px;
        }

        .nav-route-vertical {
          width: 8px;
          left: 255px;
          background: repeating-linear-gradient(
            0deg,
            #ff7800 0px,
            #ff7800 12px,
            #ffd19a 12px,
            #ffd19a 20px
          );
        }

        .nav-route-horizontal2 {
          height: 8px;
          left: 255px;
          width: 600px;
        }

        @keyframes routeMove {
          from {
            opacity: 0.65;
          }
          50% {
            opacity: 1;
          }
          to {
            opacity: 0.65;
          }
        }

        .nav-crossing {
          position: absolute;
          width: 50px;
          height: 80px;
          background: rgba(255, 193, 7, 0.18);
          border: 2px dashed #f0a900;
          border-radius: 8px;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 11px;
          font-weight: bold;
          text-align: center;
          line-height: 1.2;
        }

        .nav-current-position {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #087cff;
          border: 5px solid white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 22px;
          z-index: 100;
          transition: left 0.35s ease, top 0.35s ease;
        }

        .nav-current-position::before {
          content: '';
          position: absolute;
          width: 75px;
          height: 75px;
          border-radius: 50%;
          background: rgba(8, 124, 255, 0.25);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.7);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(0.7);
            opacity: 0;
          }
        }

        .nav-movement-status {
          position: absolute;
          bottom: 20px;
          left: 180px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 50;
          white-space: nowrap;
        }

        .nav-destination {
          position: absolute;
          right: 20px;
          width: 50px;
          height: 50px;
          background: #dc3545;
          color: white;
          border-radius: 50%;
          border: 5px solid white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          z-index: 100;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .nav-destination-label {
          position: absolute;
          right: 80px;
          background: #dc3545;
          color: white;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: bold;
          z-index: 110;
          white-space: nowrap;
        }

        .nav-controls {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-btn {
          border: none;
          background: #126b45;
          color: white;
          padding: 11px 17px;
          border-radius: 9px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }

        .nav-btn:hover:not(:disabled) {
          background: #0d5336;
        }

        .nav-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .nav-btn.active {
          background: #ff7800;
        }

        .nav-legend {
          margin-top: 20px;
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .nav-legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .nav-legend-dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }

        .nav-blue-dot {
          background: #087cff;
        }

        .nav-red-dot {
          background: #dc3545;
        }

        .nav-orange-line {
          width: 30px;
          height: 6px;
          background: #ff7800;
          border-radius: 5px;
        }

        .nav-status-bar {
          margin-top: 15px;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
        }

        /* Mobile responsive */
        @media (max-width: 700px) {
          .station-navigation {
            width: 98%;
            padding: 12px;
          }
          .nav-map {
            height: 550px;
          }
          .nav-tracks {
            left: 120px;
            right: 10px;
          }
          .nav-platform-name {
            width: 70px;
            font-size: 11px;
          }
          .nav-entrance {
            left: 5px;
            width: 90px;
          }
          .nav-route-horizontal {
            left: 100px;
          }
          .nav-route-vertical {
            left: 200px;
          }
          .nav-route-horizontal2 {
            left: 200px;
            width: 400px;
          }
          .nav-crossing {
            left: 175px;
          }
        }
      `}</style>
    </div>
  );
}