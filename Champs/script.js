document.addEventListener('DOMContentLoaded', () => {
  // Create our variables
  const searchInput = document.getElementById('search-input');
  const championList = document.getElementById('champion-list');
  const championDetails = document.getElementById('champion-details');
  const championName = document.getElementById('champion-name');
  const championDetailsImage = document.getElementById('champion-details-image');
  const championSkills = document.getElementById('champion-skills');
  const championStats = document.getElementById('champion-stats');
  const championModal = document.getElementById('champion-modal');
  const championModalName = document.getElementById('champion-modal-name');
  const championModalImage = document.getElementById('champion-modal-image');
  const championModalSkills = document.getElementById('champion-modal-skills');
  const championModalStats = document.getElementById('champion-modal-stats');
  const closeBtn = document.getElementsByClassName('close')[0];

  let champions = [];

  // Function to display champion details in modal
  const displayChampionDetails = (championData) => {
    championModalName.textContent = championData.name;
    championModalImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`;

    // Clear previous skills and stats
    championModalSkills.innerHTML = '';
    championModalStats.innerHTML = '';

    if (championData.spells && Array.isArray(championData.spells)) {
      championData.spells.forEach(spell => {
        const skillImage = document.createElement('img');
        skillImage.src = `https://ddragon.leagueoflegends.com/cdn/${championData.version}/img/spell/${spell.image.full}`;
        championModalSkills.appendChild(skillImage);
      });
    }

    const statsChart = document.createElement('canvas');
    statsChart.width = 400;
    statsChart.height = 400;
    championModalStats.appendChild(statsChart);

    const statsLabels = Object.keys(championData.stats);
    const statsValues = Object.values(championData.stats);

    new Chart(statsChart, {
      type: 'line',
      data: {
        labels: statsLabels,
        datasets: [{
          label: 'Stats',
          data: statsValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    championModal.style.display = 'block'; // Show champion modal
  };

  // Function to display champion details in the sidebar
  const displayChampion = (championData) => {
    championName.textContent = championData.name;
    championDetailsImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`;

    // Clear previous skills and stats
    championSkills.innerHTML = '';
    championStats.innerHTML = '';

    if (championData.spells && Array.isArray(championData.spells)) {
      championData.spells.forEach(spell => {
        const skillImage = document.createElement('img');
        skillImage.src = `https://ddragon.leagueoflegends.com/cdn/${championData.version}/img/spell/${spell.image.full}`;
        championSkills.appendChild(skillImage);
      });
    }

    const statsChart = document.createElement('canvas');
    statsChart.width = 400;
    statsChart.height = 400;
    championStats.appendChild(statsChart);

    const statsLabels = Object.keys(championData.stats);
    const statsValues = Object.values(championData.stats);

    new Chart(statsChart, {
      type: 'line',
      data: {
        labels: statsLabels,
        datasets: [{
          label: 'Stats',
          data: statsValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  // Function to close the champion modal
  const closeModal = () => {
    championModal.style.display = 'none';
  };

  // Event listener for the close button
  closeBtn.addEventListener('click', closeModal);

  // Fetch champion data from the API
  fetch('https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json')
    .then(response => response.json())
    .then(data => {
      champions = Object.values(data.data);

      // Display champions in the sidebar
      championList.innerHTML = '';
      champions.forEach(champion => {
        const championElement = document.createElement('div');
        championElement.classList.add('champion');
        championElement.innerHTML = `
          <img class="champion-image" src="https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${champion.image.full}" alt="Champion Image">
          <h3 class="champion-name">${champion.name}</h3>
        `;
        championElement.style.width = '180px'; // Set the width of champion element
        championElement.style.height = '220px'; // Set the height of champion element
        championList.appendChild(championElement);

        // Add click event listener to champion element
        championElement.addEventListener('click', () => {
          displayChampionDetails(champion);
        });
      });
    });

  // Function to filter and display champions based on search input
  const filterChampions = () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredChampions = champions.filter(champion =>
      champion.name.toLowerCase().includes(searchValue)
    );

    // Display filtered champions in the sidebar
    championList.innerHTML = '';
    filteredChampions.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.innerHTML = `
        <img class="champion-image" src="https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${champion.image.full}" alt="Champion Image">
        <h3 class="champion-name">${champion.name}</h3>
      `;
      championElement.style.width = '180px'; // Set the width of champion element
      championElement.style.height = '220px'; // Set the height of champion element
      championList.appendChild(championElement);

      // Add click event listener to champion element
      championElement.addEventListener('click', () => {
        displayChampionDetails(champion);
      });
    });
  };

  // Search champion event listener
  searchInput.addEventListener('input', filterChampions);
});
