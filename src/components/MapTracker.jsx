"use client";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const restaurantPos = [13.0827, 80.2707];
const userPos = [13.0504, 80.2396];
// A simple polyline path
const path = [
  restaurantPos,
  [13.0727, 80.2607],
  [13.0627, 80.2507],
  userPos
];

const createEmojiIcon = (emoji) => {
  return L.divIcon({
    html: `<div style="background-color: white; border-radius: 50%; padding: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 24px; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 2px solid #d4a853;">${emoji}</div>`,
    className: 'custom-emoji-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

export default function MapTracker({ trackingStep }) {
  const [currentPos, setCurrentPos] = useState(restaurantPos);
  
  useEffect(() => {
    if (trackingStep === 0 || trackingStep === 1) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setCurrentPos(restaurantPos);
    } else if (trackingStep === 2) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setCurrentPos(path[2]); // halfway
    } else if (trackingStep === 3) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setCurrentPos(userPos); // arrived
    }
  }, [trackingStep]);

  return (
    <div className="h-72 w-full rounded-2xl overflow-hidden border-2 border-gold/30 shadow-xl relative z-0">
      <MapContainer 
        center={[13.0665, 80.2551]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 0 }} 
        zoomControl={false} 
        dragging={false} 
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        <Polyline positions={path} color="#d4a853" weight={5} dashArray="10, 10" />
        
        <Marker position={restaurantPos} icon={createEmojiIcon('🏪')} />
        <Marker position={userPos} icon={createEmojiIcon('🏠')} />
        
        {trackingStep >= 2 && (
          <Marker position={currentPos} icon={createEmojiIcon('🛵')} />
        )}
      </MapContainer>
    </div>
  );
}
