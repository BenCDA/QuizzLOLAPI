document.addEventListener('DOMContentLoaded', () => {
    // Create our variables
    const searchInput = document.getElementById('search-input');
    const championList = document.getElementById('champion-list');
    const championDetails = document.getElementById('champion-details');
    const championName = document.getElementById('champion-name');
    const championImage = document.getElementById('champion-image');
    const championSkills = document.getElementById('champion-skills');
    const championStats = document.getElementById('champion-stats');
  
    let champions = [];
  
    // Function to display champion details
    const displayChampionDetails = (championData) => {
      championName.textContent = championData.name;
      championImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`;
  
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
  
      championDetails.style.display = 'block'; // Show champion details
    };
  
    // Function to create champion elements and attach event listeners
    const createChampionElements = () => {
      championList.innerHTML = ''; // Clear previous champion elements
  
      champions.forEach(championData => {
        const championDiv = document.createElement('div');
        championDiv.classList.add('champion');
  
        const championNameElement = document.createElement('h3');
        championNameElement.textContent = championData.name;
  
        const championImageElement = document.createElement('img');
        championImageElement.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championData.id}_0.jpg`;
  
        championDiv.appendChild(championNameElement);
        championDiv.appendChild(championImageElement);
  
        championDiv.addEventListener('click', () => {
          displayChampionDetails(championData);
        });
  
        championList.appendChild(championDiv);
      });
    };
  
    // Load champions from Riot API
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(versions => {
        const latestVersion = versions[0];
  
        fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/fr_FR/champion.json`)
          .then(response => response.json())
          .then(data => {
            champions = Object.values(data.data);
            createChampionElements();
          });
      });
  });
  