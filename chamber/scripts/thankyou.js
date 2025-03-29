document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const detailsContainer = document.getElementById('applicationDetails');
  
  const fieldsToShow = [
      { param: 'firstName', label: 'First Name' },
      { param: 'lastName', label: 'Last Name' },
      { param: 'email', label: 'Email' },
      { param: 'phone', label: 'Phone' },
      { param: 'organization', label: 'Organization' },
      { param: 'membershipLevel', label: 'Membership Level' },
      { param: 'timestamp', label: 'Application Date' }
  ];
  
  let detailsHTML = '<ul class="thankyou-details">';
  fieldsToShow.forEach(field => {
      const value = urlParams.get(field.param);
      if (value) {
          detailsHTML += `
              <li>
                  <strong>${field.label}:</strong> 
                  ${field.param === 'timestamp' ? new Date(value).toLocaleString() : value}
              </li>
          `;
      }
  });
  detailsHTML += '</ul>';
  
  detailsContainer.innerHTML = detailsHTML;
});