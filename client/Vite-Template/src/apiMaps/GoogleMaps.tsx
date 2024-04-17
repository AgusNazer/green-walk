import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";


const MyMapComponent = ({ apiKey }) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen"> 
      <div style={{ width: '400px', height: '400px' }}> 
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }} 
          center={{ lat: -31.416668, lng: -64.183334 }}
          zoom={10}
        >
          
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(MyMapComponent);
