document.addEventListener('DOMContentLoaded', () => {
    // Create our variables
    const searchInput = document.getElementById('search-input');
    const championList = document.getElementById('champion-list');
    const championDetails = document.getElementById('champion-details');
    const championName = document.getElementById('champion-name');
    const championImage = document.getElementById('champion-image');
    const championSkills = document.getElementById('champion-skills');
    const championStats = document.getElementById('champions-stats');
  
    let champions = [];
  
    // Load Riot API
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(versions => {
        const latestVersion = versions[0]; // Assuming the latest version is the first one
  
        fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`)
          .then(response => response.json())
          .then(data => {
            champions = Object.values(data.data);
  
            // Loop through all champions
            champions.forEach(championData => {
              const championDiv = document.createElement('div');
              championDiv.classList.add('champion');
  
              const championName = document.createElement('h3');
              championName.textContent = championData.name;
  
              const championImage = document.createElement('img');
              championImage.src = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championData.image.full}`;
  
              championDiv.appendChild(championName);
              championDiv.appendChild(championImage);
              championList.appendChild(championDiv);
            });
          });
      });
  });
  