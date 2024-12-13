// References to DOM elements
const leftList = document.getElementById('left-list');
const rightList = document.getElementById('right-list');
const pickButton = document.getElementById('pick-activity');
const chosenActivityDisplay = document.getElementById('chosen-activity');

// URL to the static JSON file on GitHub Pages
const activitiesUrl = 'https://samueltegsten.github.io/AlbumAndActivity/activities.json';

// Function to fetch activities from the JSON file
function fetchActivities() {
    fetch(activitiesUrl)
        .then(response => response.json())
        .then(data => {
            renderList(leftList, data.left);
            renderList(rightList, data.right);
        })
        .catch(error => console.error('Error fetching activities:', error));
}

// Function to render a list
function renderList(listElement, activities) {
    listElement.innerHTML = ''; // Clear previous content
    activities.forEach(activity => {
        const listItem = document.createElement('li');
        listItem.textContent = activity;
        listElement.appendChild(listItem);
    });
}

// Function to pick a random activity from the combined list
pickButton.addEventListener('click', () => {
    fetch(activitiesUrl)
        .then(response => response.json())
        .then(data => {
            const combinedActivities = [...data.left, ...data.right];
            if (combinedActivities.length === 0) {
                chosenActivityDisplay.textContent = 'No activities available!';
                return;
            }

            const randomIndex = Math.floor(Math.random() * combinedActivities.length);
            const chosenActivity = combinedActivities[randomIndex];
            chosenActivityDisplay.textContent = chosenActivity;

            // Remove the chosen activity from the corresponding list
            if (data.left.includes(chosenActivity)) {
                data.left.splice(data.left.indexOf(chosenActivity), 1);
            } else {
                data.right.splice(data.right.indexOf(chosenActivity), 1);
            }

            // Update the JSON file (this step needs to be done manually, or you can use a GitHub API if you'd like)
            // (To update the file, push the updated `activities.json` manually to your repository)
            renderList(leftList, data.left);
            renderList(rightList, data.right);
        })
        .catch(error => console.error('Error fetching activities:', error));
});

// Fetch and render activities initially
fetchActivities();
