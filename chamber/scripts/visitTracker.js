document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const visitMessage = document.querySelector('.visit-message');
  const messageText = document.getElementById('visit-message-text');
  const closeButton = document.querySelector('.close-message');
  
  // Check if message was previously closed
  const messageClosed = localStorage.getItem('visitMessageClosed') === 'true';
  
  if (!messageClosed) {
      // Calculate days since last visit
      const lastVisit = localStorage.getItem('lastVisit');
      const now = Date.now();
      localStorage.setItem('lastVisit', now.toString());

      let message;
      
      if (!lastVisit) {
          // First visit
          message = "Welcome! Let us know if you have any questions.";
      } else {
          const daysSince =
        //   12; testing message
          Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
          
          if (daysSince < 1) {
              message = "Back so soon! Awesome!";
          } else {
              message = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
          }
      }
      
      // Display message
      messageText.textContent = message;
      visitMessage.classList.remove('hidden');
  }
  
  // Close button handler
  closeButton.addEventListener('click', function() {
      visitMessage.classList.add('hidden');
      localStorage.setItem('visitMessageClosed', 'true');
  });
});