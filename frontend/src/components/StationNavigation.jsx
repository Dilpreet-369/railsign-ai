import { useEffect, useRef, useState } from 'react';
import './StationNavigation.css';

const PLATFORM_POSITIONS = {
  1: 45,
  2: 155,
  3: 265,
  4: 375,
  5: 485,
};

export default function StationNavigation() {
  const [selectedPlatform, setSelectedPlatform] = useState(3);
  const [movementStatus, setMovementStatus] = useState('Ready to navigate');

  const mapRef = useRef(null);
  const currentPositionRef = useRef(null);
  const destinationRef = useRef(null);
  const destinationLabelRef = useRef(null);
  const routeHorizontalRef = useRef(null);
  const routeVerticalRef = useRef(null);
  const routeHorizontal2Ref = useRef(null);

  const updateRoute = (platform) => {
    const targetY = PLATFORM_POSITIONS[platform];
    const horizontal1 = routeHorizontalRef.current;
    const vertical = routeVerticalRef.current;
    const horizontal2 = routeHorizontal2Ref.current;

    if (!horizontal1 || !vertical || !horizontal2) return;

    horizontal1.style.top = '340px';
    vertical.style.top = `${Math.min(targetY, 340)}px`;
    vertical.style.height = `${Math.abs(targetY - 340)}px`;
    horizontal2.style.top = `${targetY}px`;
  };

  const animateToDestination = (targetY, platform) => {
    const map = mapRef.current;
    const currentPosition = currentPositionRef.current;

    if (!map || !currentPosition) return;

    const startX = 130;
    const startY = 315;
    const crossingX = 255;
    const destinationX = map.clientWidth - 70;

    currentPosition.getAnimations?.().forEach((animation) => animation.cancel());

    setMovementStatus(`Moving to Platform ${platform}...`);

    const movement = currentPosition.animate(
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
      },
    );

    movement.addEventListener('finish', () => {
      setMovementStatus('Arrived at destination');
    });
  };

  const goToPlatform = (platform) => {
    const destination = destinationRef.current;
    const label = destinationLabelRef.current;
    const y = PLATFORM_POSITIONS[platform];

    setSelectedPlatform(platform);

    if (destination) destination.style.top = `${y}px`;
    if (label) {
      label.style.top = `${y - 5}px`;
      label.textContent = `Platform ${platform}`;
    }

    animateToDestination(y, platform);
    updateRoute(platform);
  };

  useEffect(() => {
    goToPlatform(3);
  }, []);

  return (
    <div className="station-navigation" role="application" aria-label="Railway Station Navigation">
      <div className="header">
        <div>
          <h1>🚆 Railway Station</h1>
          <p>Accessible Station Navigation</p>
        </div>
        <div className="status">● Navigation Active</div>
      </div>

      <div className="map" ref={mapRef}>
        <div className="entrance">
          <div className="entrance-icon">🚪</div>
          Station Entrance
        </div>

        <div className="tracks">
          {[1, 2, 3, 4, 5].map((platform) => (
            <div key={platform} className={`platform platform${platform}`}>
              <div className="platform-name">Platform {platform}</div>
              <div className="track">
                <div className="sleepers" />
              </div>
            </div>
          ))}
        </div>

        <div className="route">
          <div className="route-horizontal" ref={routeHorizontalRef} />
          <div className="route-vertical" ref={routeVerticalRef} />
          <div className="route-horizontal2" ref={routeHorizontal2Ref} />
        </div>

        <div className="crossing">
          🚶
          <br />
          SAFE
          <br />
          CROSSING
        </div>

        <div
          id="currentPosition"
          ref={currentPositionRef}
          className="current-position"
        >
          📍
        </div>

        <div id="movementStatus" className="movement-status" aria-live="polite">
          {movementStatus}
        </div>

        <div ref={destinationRef} className="destination">
          🚉
        </div>

        <div ref={destinationLabelRef} className="destination-label">
          Platform {selectedPlatform}
        </div>
      </div>

      <div className="controls" role="group" aria-label="Platform selection">
        {[1, 2, 3, 4, 5].map((platform) => (
          <button
            key={platform}
            type="button"
            className={platform === selectedPlatform ? 'active' : ''}
            onClick={() => goToPlatform(platform)}
            aria-pressed={platform === selectedPlatform}
          >
            Platform {platform}
          </button>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <span className="blue-dot" />
          Current Position
        </div>
        <div className="legend-item">
          <span className="red-dot" />
          Destination
        </div>
        <div className="legend-item">
          <span className="orange-line" />
          Walking Route
        </div>
      </div>
    </div>
  );
}
