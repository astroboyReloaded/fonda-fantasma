const calcDelivery_Container = document.getElementById('calcDelivery_section');
console.log(calcDelivery_Container);
let map; // Google Maps object
let marker; // Marker on the map

function initMap(lat, lng) {
  const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
  if (!map) {
    map = new google.maps.Map(createMapContainer(), {
      zoom: 14,
      center: location,
    });
    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Your Location',
    });
  } else {
    map.setCenter(location);
    marker.setPosition(location);
  }
}

function createMapContainer() {
  const map_Container = document.createElement('div');
  map_Container.id = 'map';
  map_Container.style.width = '100%';
  map_Container.style.height = '180px';
  calcDelivery_Container.appendChild(map_Container);
}
