// Course container
const courseContainer = document.querySelector('.courses');

// Showing function
function displayCourses(filter = 'all') {
    const filteredCourses = filter === 'all' 
        ? window.courses 
        : window.courses.filter(course => course.subject === filter);

    // Cleaning
    courseContainer.innerHTML = `
        <h2>Web and Computer Programming Certificate</h2>
        <div class="button-container-1">
            <button class="btn-1" onclick="displayCourses('all')">All</button>
            <button class="btn-1" onclick="displayCourses('CSE')">CSE</button>
            <button class="btn-1" onclick="displayCourses('WDD')">WDD</button>
        </div>
        <div class="button-container-2"></div>
    `;

    const buttonContainer2 = courseContainer.querySelector('.button-container-2');

    // Showing Filtered
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
            ${course.completed ? '✅' : '❌'} ${course.subject} ${course.number}
            
        `;
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        buttonContainer2.appendChild(courseCard);
    });

    // Credits ammount
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const creditsDisplay = document.createElement('p');
    creditsDisplay.innerHTML = `<strong>Total Credits:</strong> ${totalCredits}`;
    buttonContainer2.appendChild(creditsDisplay);
}

// Load page with all courses
displayCourses();