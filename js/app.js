if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js").then(function(sw) {
    }).catch(function(err) {
      console.error("Failed to register serviceworker", err);
    })
  }
  
  /**
   * Takes advantage of delaying the images from the map, until the map-container
   * is within the viewport.
   */
  var mapObserver = new IntersectionObserver(changes => {
    for (const change of changes) {
      if (!change.isIntersecting) return;
      requestAnimationFrame(() => {
        document.getElementById("map").classList.remove("hidden");
        google.maps.event.trigger(map, 'resize');
      })
        mapObserver.unobserve(change.target);
    }
  });
  
