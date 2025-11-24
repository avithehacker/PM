document.addEventListener('DOMContentLoaded', () => {
    const zoneTabsContainer = document.getElementById('zone-tabs');
    const contentArea = document.getElementById('content-area');
    const searchInput = document.getElementById('search-input');

    let currentZone = Object.keys(directoryData)[0]; // Default to first zone

    // Initialize UI
    renderTabs();
    renderContent(currentZone);

    // Event Listeners
    searchInput.addEventListener('input', handleSearch);

    function renderTabs() {
        zoneTabsContainer.innerHTML = '';
        Object.keys(directoryData).forEach(zone => {
            const tab = document.createElement('button');
            tab.className = `zone-tab ${zone === currentZone ? 'active' : ''}`;
            tab.textContent = zone;
            tab.onclick = () => switchZone(zone);
            zoneTabsContainer.appendChild(tab);
        });
    }

    function switchZone(zone) {
        currentZone = zone;
        searchInput.value = ''; // Clear search on zone switch
        renderTabs();
        renderContent(zone);
    }

    function renderContent(zone) {
        contentArea.innerHTML = '';
        const states = directoryData[zone];

        if (!states || Object.keys(states).length === 0) {
            contentArea.innerHTML = '<div class="empty-state">No data available for this zone.</div>';
            return;
        }

        Object.entries(states).forEach(([stateName, contacts]) => {
            const stateItem = createStateItem(stateName, contacts);
            contentArea.appendChild(stateItem);
        });
    }

    function createStateItem(stateName, contacts) {
        const item = document.createElement('div');
        item.className = 'state-item';

        const header = document.createElement('div');
        header.className = 'state-header';
        header.innerHTML = `
            <h3>${stateName}</h3>
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;
        header.onclick = () => toggleState(item);

        const list = document.createElement('div');
        list.className = 'contact-list';

        if (contacts.length === 0) {
            list.innerHTML = '<div class="contact-card"><div class="contact-info"><h4>No contacts listed</h4></div></div>';
        } else {
            contacts.forEach(contact => {
                const card = document.createElement('div');
                card.className = 'contact-card';
                card.innerHTML = `
                    <div class="contact-info">
                        <h4>${contact.name}</h4>
                        <div class="contact-number">${contact.number}</div>
                    </div>
                    <a href="tel:${contact.number}" class="call-btn" aria-label="Call ${contact.name}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </a>
                `;
                list.appendChild(card);
            });
        }

        item.appendChild(header);
        item.appendChild(list);
        return item;
    }

    function toggleState(item) {
        const wasExpanded = item.classList.contains('expanded');
        // Optional: Close others
        // document.querySelectorAll('.state-item').forEach(i => i.classList.remove('expanded'));

        if (!wasExpanded) {
            item.classList.add('expanded');
        } else {
            item.classList.remove('expanded');
        }
    }

    function handleSearch(e) {
        const term = e.target.value.toLowerCase();

        if (!term) {
            renderContent(currentZone);
            return;
        }

        contentArea.innerHTML = '';
        let hasResults = false;

        // Search across ALL zones
        Object.entries(directoryData).forEach(([zoneName, states]) => {
            Object.entries(states).forEach(([stateName, contacts]) => {
                // Check if state matches
                const stateMatch = stateName.toLowerCase().includes(term);

                // Check if any contact matches
                const matchingContacts = contacts.filter(c =>
                    c.name.toLowerCase().includes(term) ||
                    c.number.includes(term)
                );

                if (stateMatch || matchingContacts.length > 0) {
                    // If state matches, show all contacts. If only contacts match, show those.
                    const contactsToShow = stateMatch ? contacts : matchingContacts;

                    if (contactsToShow.length > 0 || stateMatch) {
                        const item = createStateItem(`${stateName} (${zoneName})`, contactsToShow);
                        // Auto expand if searching
                        item.classList.add('expanded');
                        contentArea.appendChild(item);
                        hasResults = true;
                    }
                }
            });
        });

        if (!hasResults) {
            contentArea.innerHTML = '<div class="empty-state">No matching contacts found.</div>';
        }
    }
});
