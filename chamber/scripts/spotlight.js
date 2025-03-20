const spotlightCards = document.querySelector('.spotlight-cards');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    const eligibleMembers = data.members.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);
    displaySpotlights(eligibleMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displaySpotlights(members) {
  const selectedmembers = [];
  while (selectedmembers.length < 2 && members.length > 0) {
    const randomIndex = Math.floor(Math.random() * members.length);
    selectedmembers.push(members.splice(randomIndex, 1)[0]);
  }

  spotlightCards.innerHTML = selectedmembers
    .map(member => `
      <div class="spotlight-card">
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name}">
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>Membership Level:</strong> ${member.membershipLevel === 1 ? '🥇 Gold' : '🥈 Silver'}</p>
      </div>
      `)
      .join('');
}

fetchMembers();