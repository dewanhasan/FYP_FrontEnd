// pages/Map.js
import { useEffect, useRef } from "react";


export default function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMapWithLocation = (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 14,
      });

      const handleLocationError = (error) => {
        console.error("Geolocation error:", error);
      
        // Fallback to Dublin if location access is denied
        const fallbackLocation = { lat: 53.3498, lng: -6.2603 };
        initMapWithLocation({ coords: fallbackLocation });
      
        alert("Unable to retrieve your location. Showing default map.");
      };
      

      const infoWindow = new window.google.maps.InfoWindow();

      // Your Location Marker
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map,
        title: "Your Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      });

      userMarker.addListener("click", () => {
        infoWindow.setContent(`<div><strong>You are here</strong></div>`);
        infoWindow.open(map, userMarker);
      });

      // Search for nearby EV stations
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: userLocation,
        radius: 30000,
        keyword: "EV charging station",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            const marker = new window.google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name,
            });

            // Add info window for EV station
            marker.addListener("click", () => {
              const content = `
                <div>
                  <strong>${place.name}</strong><br/>
                  ${place.vicinity || ""}
                </div>
              `;
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            });
          });
        } else {
          console.error("Places search failed:", status);
        }
      });
    };

    const handleLocationError = (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location. Please allow location access.");
    };

    const loadMapScript = () => {
      if (document.getElementById("google-maps-script")) {
        navigator.geolocation.getCurrentPosition(initMapWithLocation, handleLocationError);
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDuHnWUHn-TSbZefZOo22YhU_QpbYlrBmI&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () =>
        navigator.geolocation.getCurrentPosition(initMapWithLocation, handleLocationError);
      document.head.appendChild(script);
    };

    loadMapScript();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
