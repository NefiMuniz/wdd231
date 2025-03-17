const directory = document.getElementById('directory');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
let members = [];

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    members = data.members
    displayMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  directory.innerHTML = ''; // Clear existing content
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <h2>${member.name}</h2>
      <img src="images/${member.image}" alt="${member.name}">
      <p>Membership Level: ${member.membershipLevel}</p>
      <p>${member.address}</p>
      <a href="${member.mapLink}" target="_blank">View on Map</a>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    directory.appendChild(card);
  });
}

function displayMembersInList() {
  directory.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
    <h2>${member.name}</h2>
    <div class="info">
    <p>${member.address}</p>
    <p>${member.phone}</p>
    </div>
    <div class="level">Level: ${member.membershipLevel}</div>
    <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    directory.appendChild(card);
  });

}
gridViewBtn.addEventListener('click', () => {
  directory.classList.remove('list-view');
  directory.classList.add('grid-view');
  displayMembers(members);
});

listViewBtn.addEventListener('click', () => {
  directory.classList.remove('grid-view');
  directory.classList.add('list-view');
  displayMembersInList(members);
});

getMembers();