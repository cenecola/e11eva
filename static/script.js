// JavaScript code for handling form submission and form toggling
const authForm = document.getElementById('authForm');
const regForm = document.getElementById('regForm');
const testForm = document.querySelector('form:not([style*="display: none"])')
console.log(testForm)

// Alternativa de visible form select Auth<>Reg
//Array.from(document.querySelectorAll('form')).filter(form =>
//	window.getComputedStyle(form).getPropertyValue('display') != 'none'
//);
//

//function authenticateForm() {
document.querySelector('form:not([style*="display: none"])').addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent the form from submitting normally
	const form = event.target;
	const username = form.elements.username.value;
	const password = form.elements.password.value;
	console.log('username:', username)

	if (form === authForm) {
		// Send the form data to the server for authentication
		fetch('/authenticate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `username=${username}&password=${password}`,
		})
			.then((response) => {
				if (response.redirected) {
					window.location.href = response.url; // Redirect to the article page
				} else {
					// Handle authentication failure (e.g., display error message)
					console.log('Authentication failed');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}}) 

document.querySelector('form:not([style*="display: none"])').addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent the form from submitting normally
	const form = event.target;
	const username = form.elements.username.value;
	const password = form.elements.password.value;
	console.log('username:', username)
	
	if (form === regForm) {
		
		const confirmPassword = form.elements.confirm_password.value;
		if (password !== confirmPassword) {
			console.log('Passwords do not match'); // Handle password mismatch error
			
		}
		
		// Send the form data to the server for registration
		fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `username=${username}&password=${password}`,
		})
			.then((response) => {
				if (response.redirected) {
					window.location.href = response.url; // Redirect to the article page
				} else {
					// Handle registration failure (e.g., display error message)
					console.log('Registration failed');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	}
);
//}

function toggleForm() {
	authForm.style.display = authForm.style.display === 'none' ? 'block' : 'none';
	regForm.style.display = regForm.style.display === 'none' ? 'block' : 'none';
	//authenticateForm()
	const testForm = document.querySelector('form:not([style*="display: none"])')
	console.log(testForm)
}

// if (typeof auth !== 'undefined' && auth === true) {
// 	document.body.style.display = 'block';
//   } else {
// 	// Or display an error message:
// 	document.body.innerHTML = "<h1>Not authorized.</h1>";
//   }

function redirectToPage() {
    window.location.href = 'contents';
}


function toggleChapter(index) {
	var chapters = document.getElementsByClassName('chapter');
	var menuItems = document.getElementById('menu').getElementsByTagName('li');
  
	// Hide all chapters
	for (var i = 0; i < chapters.length; i++) {
	  chapters[i].style.display = 'none';
	}
  
	// Show selected chapter
	chapters[index].style.display = 'block';
  
	// Remove active class from all menu items
	for (var j = 0; j < menuItems.length; j++) {
	  menuItems[j].classList.remove('active');
	}
  
	// Add active class to selected menu item
	menuItems[index].classList.add('active');
  }
  
