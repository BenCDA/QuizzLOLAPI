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
                <img class="item-image" src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${item.image.full}" alt="item image">
                <h3 class="item-name">${item.name}</h3>
            `;
            itemList.appendChild(itemElement);

            // Add click event listener to item element
            itemElement.addEventListener('click', () => {
                displayItemDetails(item);
            });
        });
    });

    // Display item details
    function displayItemDetails(item) {
        itemName.textContent = item.name;
        itemDetailsImage.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${item.image.full}`;

        // Clear previous item details
        itemSkills.innerHTML = '';
        itemStats.innerHTML = '';

        // Display item skills
        if (item.description) {
            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;
            itemSkills.appendChild(itemDescription);
        }

        // Display item stats
        if (item.stats) {
            const itemStatsList = document.createElement('ul');
            for (const stat in item.stats) {
                const statItem = document.createElement('li');
                statItem.textContent = `${stat}: ${item.stats[stat]}`;
                itemStatsList.appendChild(statItem);
            }
            itemStats.appendChild(itemStatsList);
        }

        // Show item details
        itemDetails.style.display = 'block';
    }
});
