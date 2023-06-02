document.addEventListener('DOMContentLoaded', () => {
  // Create our variables
  const searchInput = document.getElementById('search-input');
  const searchSkillInput = document.getElementById('search-skill-input');
  const searchLoreInput = document.getElementById('search-lore-input');
  const searchTypeInput = document.getElementById('search-type-input');
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

    const statsLabels = Object.keys(championData.stats);
    const statsValues = Object.values(championData.stats);

    new Chart(championStats, {
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

    championDetails.style.display = 'block'; // Show champion details in sidebar
  };

  // Function to filter champions by name
  const filterChampionsByName = () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredChampions = champions.filter(champion =>
      champion.name.toLowerCase().includes(searchValue)
    );

    championList.innerHTML = ''; // Clear champion list

    filteredChampions.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="champion-image">
                                   <div class="champion-name">${champion.name}</div>`;
      championList.appendChild(championElement);

      championElement.addEventListener('click', () => {
        displayChampionDetails(champion);
      });
    });
  };

  // Function to filter champions by skill name
  const filterChampionsBySkill = () => {
    const searchValue = searchSkillInput.value.toLowerCase();
    const filteredChampions = champions.filter(champion =>
      champion.spells.some(spell => spell.name.toLowerCase().includes(searchValue))
    );

    championList.innerHTML = ''; // Clear champion list

    filteredChampions.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="champion-image">
                                   <div class="champion-name">${champion.name}</div>`;
      championList.appendChild(championElement);

      championElement.addEventListener('click', () => {
        displayChampionDetails(champion);
      });
    });
  };

  // Function to filter champions by lore
  const filterChampionsByLore = () => {
    const searchValue = searchLoreInput.value.toLowerCase();
    const filteredChampions = champions.filter(champion =>
      champion.lore.toLowerCase().includes(searchValue)
    );

    championList.innerHTML = ''; // Clear champion list

    filteredChampions.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="champion-image">
                                   <div class="champion-name">${champion.name}</div>`;
      championList.appendChild(championElement);

      championElement.addEventListener('click', () => {
        displayChampionDetails(champion);
      });
    });
  };

  // Function to filter champions by type
  const filterChampionsByType = () => {
    const searchValue = searchTypeInput.value.toLowerCase();
    const filteredChampions = champions.filter(champion =>
      champion.tags.some(tag => tag.toLowerCase().includes(searchValue))
    );

    championList.innerHTML = ''; // Clear champion list

    filteredChampions.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="champion-image">
                                   <div class="champion-name">${champion.name}</div>`;
      championList.appendChild(championElement);

      championElement.addEventListener('click', () => {
        displayChampionDetails(champion);
      });
    });
  };

  // Close the champion modal when the close button is clicked
  closeBtn.addEventListener('click', () => {
    championModal.style.display = 'none';
  });

  // Fetch champion data from the API
  fetch('https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json')
    .then(response => response.json())
    .then(data => {
      champions = Object.values(data.data);

      // Display all champions by default
      champions.forEach(champion => {
        const championElement = document.createElement('div');
        championElement.classList.add('champion');
        championElement.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="champion-image">
                                     <div class="champion-name">${champion.name}</div>`;
        championList.appendChild(championElement);

        championElement.addEventListener('click', () => {
          displayChampionDetails(champion);
        });
      });
    });

  // Event listeners for search inputs
  searchInput.addEventListener('input', filterChampionsByName);
  searchSkillInput.addEventListener('input', filterChampionsBySkill);
  searchLoreInput.addEventListener('input', filterChampionsByLore);
  searchTypeInput.addEventListener('input', filterChampionsByType);
});
