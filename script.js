// Initialize arrays for activities
const leftActivities = JSON.parse(localStorage.getItem('leftActivities')) || [];
const rightActivities = JSON.parse(localStorage.getItem('rightActivities')) || [];

// References to DOM elements
const leftInput = document.getElementById('left-input');
const leftList = document.getElementById('left-list');
const rightInput = document.getElementById('right-input');
const rightList = document.getElementById('right-list');
const pickButton = document.getElementById('pick-activity');
const chosenActivityDisplay = document.getElementById('chosen-activity');
const showAlbumButton = document.getElementById('show-album');

// Function to render a list
function renderList(listElement, activities) {
    listElement.innerHTML = '';
    activities.forEach(activity => {
        const listItem = document.createElement('li');
        listItem.textContent = activity;
        listElement.appendChild(listItem);
    });
}

// Update localStorage and render list
function updateActivities(storageKey, activities, listElement) {
    localStorage.setItem(storageKey, JSON.stringify(activities));
    renderList(listElement, activities);
    // Also update on Pastebin
    updateOnPastebin(activities);
}

// Add activity to left list
leftInput.addEventListener('keypress', event => {
    if (event.key === 'Enter' && leftInput.value.trim() !== '') {
        leftActivities.push(leftInput.value.trim());
        updateActivities('leftActivities', leftActivities, leftList);
        leftInput.value = '';
    }
});

// Add activity to right list
rightInput.addEventListener('keypress', event => {
    if (event.key === 'Enter' && rightInput.value.trim() !== '') {
        rightActivities.push(rightInput.value.trim());
        updateActivities('rightActivities', rightActivities, rightList);
        rightInput.value = '';
    }
});

// Pick a random activity
pickButton.addEventListener('click', () => {
    const combinedActivities = [...leftActivities, ...rightActivities];
    if (combinedActivities.length === 0) {
        chosenActivityDisplay.textContent = 'No activities available!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * combinedActivities.length);
    const chosenActivity = combinedActivities[randomIndex];

    chosenActivityDisplay.textContent = chosenActivity;

    if (leftActivities.includes(chosenActivity)) {
        leftActivities.splice(leftActivities.indexOf(chosenActivity), 1);
        updateActivities('leftActivities', leftActivities, leftList);
    } else {
        rightActivities.splice(rightActivities.indexOf(chosenActivity), 1);
        updateActivities('rightActivities', rightActivities, rightList);
    }
});

// Redirect to album page
showAlbumButton.addEventListener('click', () => {
    window.location.href = 'https://drive.google.com/drive/folders/1z2ig2oRRcLraw5KlAoZ-_XSM_Xde9Wl_?usp=drive_link';
});

// Function to update activities on Pastebin
function updateOnPastebin(activities) {
    const pastebinApiUrl = 'https://pastebin.com/api/api_post.php';
    const pasteData = `Left Activities:\n${leftActivities.join('\n')}\n\nRight Activities:\n${rightActivities.join('\n')}`;

    const formData = new FormData();
    formData.append('api_option', 'paste');
    formData.append('api_dev_key', 'H9AfAC-bfz6wNnh3xMeMmpVIIu5H2PuA'); // Your Pastebin API key
    formData.append('api_paste_data', pasteData);
    formData.append('api_paste_name', 'Activity List');
    formData.append('api_paste_expire_date', 'N'); // No expiry
    formData.append('api_paste_private', '0'); // Public paste

    fetch(pastebinApiUrl, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(data => {
            console.log('Paste URL:', `https://pastebin.com/${data}`);
        })
        .catch(error => {
            console.error('Error creating paste:', error);
        });
}

// Initial rendering of lists
renderList(leftList, leftActivities);
renderList(rightList, rightActivities);
