document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('timestamp').value = new Date().toISOString();
  
  // Membership cards data
  const membershipLevels = [
    {
      id: 'np',
      title: 'NP Membership',
      price: 'Free',
      desc: 'For non-profit organizations',
      benefits: [
        'Listing in our member directory',
        'Access to member-only resources',
        'Monthly newsletter'
      ],
      price: 'Free membership for non-profit organizations'
    },
    {
      id: 'bronze',
      title: 'Bronze Membership',
      price: '$200/year',
      desc: 'Basic membership benefits',
      benefits: [
        'All NP benefits plus:',
        'Business listing with logo',
        '10% discount on chamber events',
        'Quarterly business training',
      ],
      price: 'Annual cost: $200'
    },
    {
      id: 'silver',
      title: 'Silver Membership',
      price: '$400/year',
      desc: 'Enhanced benefits package',
      benefits: [
        'All Bronze benefits plus:',
        'Featured listing in directory',
        '20% discount on chamber events',
        'Monthly business training',
        'One free event sponsorship per year',
      ],
      price: 'Annual cost: $400'
    },
    {
      id: 'gold',
      title: 'Gold Membership',
      price: '$600/year',
      desc: 'Premium membership tier',
      benefits: [
        'All Silver benefits plus:',
        'Premium featured listing',
        '30% discount on chamber events',
        'Weekly business training',
        'Three event sponsorships per year',
        'Homepage spotlight feature'
      ],
      price: 'Annual cost: $600'
    }
  ];
  
  // Generate membership cards
  const cardsContainer = document.querySelector('.membership-cards');
  membershipLevels.forEach(level => {
    const card = document.createElement('div');
    card.className = 'membership-card';
    card.innerHTML = `
      <h3>${level.title}</h3>
      <p><strong>${level.price}</strong></p>
      <p>${level.desc}</p>
      <button class="learn-more" data-level="${level.id}">Learn More</button>
    `;
    cardsContainer.appendChild(card);
  });
  
  // Modal functionality
  const membershipDialog = document.getElementById('membership-info');
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const levelId = this.getAttribute('data-level');
      const level = membershipLevels.find(l => l.id === levelId);
      
      membershipDialog.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>${level.title} Benefits</h3>
          </div>
          <ul>
            ${level.benefits.map(benefit => `<li>* ${benefit}</li>`).join('')}
          </ul>
          <p><strong>Price:</strong> ${level.price}
        </div>
      `;
      
      membershipDialog.showModal();
    });
  });
  
  // Close modal
  membershipDialog.addEventListener('click', (e) => {
    if (e.target === membershipDialog) {
      membershipDialog.close();
    }
  });
});

