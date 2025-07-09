//auto text writting
/*  

/*<script>
    const text = "";
    const speed = 100;

    let i = 0

    function typescript(){
        if(i < text.length){
            document.getElementsById("p").textContent += text.charAt(i);
            i++;
            setTimeout(p, speed);
        }
    }

    typescript()
</script>*/

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(function(error) {
            console.error('Service Worker registration failed:', error);
          });
      }


      // Function to request permission for notifications and display a notification
function showNotification() {
  // Check if the browser supports the Notification API
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // If permission has already been granted, create and display the notification
    var notification = new Notification("Alert!", { body: "This is a mobile alert notification." });
  } else if (Notification.permission !== "denied") {
    // If permission has not been denied, request permission for notifications
    Notification.requestPermission().then(function (permission) {
      // If permission is granted, create and display the notification
      if (permission === "granted") {
        var notification = new Notification("Alert!", { body: "This is a mobile alert notification." });
      }
      Notification = alert('refresh for new notification')
    });
  }
}
 
showNotification();
