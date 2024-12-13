// References to DOM elements
const leftList = document.getElementById('left-list');
const rightList = document.getElementById('right-list');
const pickButton = document.getElementById('pick-activity');
const chosenActivityDisplay = document.getElementById('chosen-activity');
const showAlbumButton = document.getElementById('show-album');

// Fetch activities from localStorage or use default values
function fetchActivitiesFromLocalStorage() {
    const activities = JSON.parse(localStorage.getItem('activities'));
    if (activities) {
        renderList(leftList, activities.left);
        renderList(rightList, activities.right);
    } else {
        // Default data if no activities exist
        const defaultActivities = {
            left: ['Template 1'],
            right: ['Template 2']
        };
        renderList(leftList, defaultActivities.left);
        renderList(rightList, defaultActivities.right);
        localStorage.setItem('activities', JSON.stringify(defaultActivities));  // Save default data to localStorage
    }
}

// Function to update localStorage with the new activities
function updateLocalStorage(newActivities) {
    localStorage.setItem('activities', JSON.stringify(newActivities));
}

// Function to render a list
function renderList(listElement, activities) {
    listElement.innerHTML = '';  // Clear previous content
    activities.forEach(activity => {
        const listItem = document.createElement('li');
        listItem.textContent = activity;
        listElement.appendChild(listItem);
    });
}

// Pick a random activity
pickButton.addEventListener('click', () => {
    const activities = JSON.parse(localStorage.getItem('activities'));
    const combinedActivities = [...activities.left, ...activities.right];

    if (combinedActivities.length === 0) {
        chosenActivityDisplay.textContent = 'No activities available!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * combinedActivities.length);
    const chosenActivity = combinedActivities[randomIndex];
    chosenActivityDisplay.textContent = chosenActivity;

    // Remove the chosen activity from the corresponding list
    if (activities.left.includes(chosenActivity)) {
        activities.left.splice(activities.left.indexOf(chosenActivity), 1);
    } else {
        activities.right.splice(activities.right.indexOf(chosenActivity), 1);
    }

    // Update localStorage with the modified lists
    updateLocalStorage({ left: activities.left, right: activities.right });
    renderList(leftList, activities.left);
    renderList(rightList, activities.right);
});

// Handle new activity input
document.getElementById('left-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const newActivity = event.target.value.trim();
        if (newActivity) {
            const activities = JSON.parse(localStorage.getItem('activities'));
            activities.left.push(newActivity);
            updateLocalStorage({ left: activities.left, right: activities.right });
            renderList(leftList, activities.left);
            event.target.value = '';  // Clear input
        }
    }
});

document.getElementById('right-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const newActivity = event.target.value.trim();
        if (newActivity) {
            const activities = JSON.parse(localStorage.getItem('activities'));
            activities.right.push(newActivity);
            updateLocalStorage({ left: activities.left, right: activities.right });
            renderList(rightList, activities.right);
            event.target.value = '';  // Clear input
        }
    }
});

// Add the link back for the album button
showAlbumButton.addEventListener('click', () => {
    window.location.href = 'https://drive.google.com/drive/folders/1z2ig2oRRcLraw5KlAoZ-_XSM_Xde9Wl_?usp=drive_link';
});


// Initial fetching and rendering of activities
fetchActivitiesFromLocalStorage();
