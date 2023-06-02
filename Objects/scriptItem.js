document.addEventListener('DOMContentLoaded', () => {
    // Create our variables
    const searchInput = document.getElementById('search-input');
    const searchSkillInput = document.getElementById('search-skill-input');
    const searchLoreInput = document.getElementById('search-lore-input');
    const searchTypeInput = document.getElementById('search-type-input');
    const itemList = document.getElementById('item-list');
    const itemDetails = document.getElementById('item-details');
    const itemName = document.getElementById('item-name');
    const itemDetailsImage = document.getElementById('item-details-image');
    const itemSkills = document.getElementById('item-skills');
    const itemStats = document.getElementById('item-stats');
    const itemModal = document.getElementById('item-modal');
    const itemModalName = document.getElementById('item-modal-name');
    const itemModalImage = document.getElementById('item-modal-image');
    const itemModalSkills = document.getElementById('item-modal-skills');
    const itemModalStats = document.getElementById('item-modal-stats');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    let items = [];
  
    // Function to display item details in modal
    const displayItemDetails = (itemData) => {
      itemModalName.textContent = itemData.name;
      itemModalImage.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${itemData.image.full}`;
  
      // Clear previous skills and stats
      itemModalSkills.innerHTML = '';
      itemModalStats.innerHTML = '';
  
      if (itemData.description) {
        const itemDescription = document.createElement('p');
        itemDescription.textContent = itemData.description;
        itemModalSkills.appendChild(itemDescription);
      }
  
      if (itemData.stats) {
        const itemStatsList = document.createElement('ul');
        for (const stat in itemData.stats) {
          const statItem = document.createElement('li');
          statItem.textContent = `${stat}: ${itemData.stats[stat]}`;
          itemStatsList.appendChild(statItem);
        }
        itemModalStats.appendChild(itemStatsList);
      }
  
      itemModal.style.display = 'block'; // Show item modal
    };
  
    // Function to close the item modal
    const closeModal = () => {
      itemModal.style.display = 'none';
    };
  
    // Event listener for the close button
    closeBtn.addEventListener('click', closeModal);
  
    // Fetch items data from the API
    fetch('https://ddragon.leagueoflegends.com/cdn/13.10.1/data/fr_FR/item.json')
      .then(response => response.json())
      .then(data => {
        items = Object.values(data.data);
  
        // Display items in the sidebar
        itemList.innerHTML = '';
        items.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');
          itemElement.innerHTML = `
            <img class="item-image" src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${item.image.full}" alt="Item Image">
            <h3 class="item-name">${item.name}</h3>
          `;
          itemList.appendChild(itemElement);
  
          // Add click event listener to item element
          itemElement.addEventListener('click', () => {
            displayItemDetails(item);
          });
        });
      });
  
    // Function to filter and display items based on search input
    const filterItems = () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchValue)
      );
  
      // Display filtered items in the sidebar
      itemList.innerHTML = '';
      filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
          <img class="item-image" src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${item.image.full}" alt="Item Image">
          <h3 class="item-name">${item.name}</h3>
        `;
        itemList.appendChild(itemElement);
  
        // Add click event listener to item element
        itemElement.addEventListener('click', () => {
          displayItemDetails(item);
        });
      });
    };
  
    // Event listener for search input
    searchInput.addEventListener('input', filterItems);
  });
  