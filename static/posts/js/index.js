// document.addEventListener('DOMContentLoaded', function() {


//         // Track the previous scroll position
//         let lastScrollTop = 0;
//         const header = document.querySelector('.header-wrapper');

//         // Get the viewport height (in pixels)
//         const viewportHeight = window.innerHeight;

//         window.addEventListener('scroll', function() {
//             const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

//             // Check if the user has scrolled down more than the height of the viewport
//             if (currentScrollTop > viewportHeight) {
//                 if (currentScrollTop > lastScrollTop) {
//                     // Scrolling down after passing viewport height
//                     header.style.transform = 'translateY(-100%)'; // Hide the header
//                 } else {
//                     // Scrolling up
//                     header.style.transform = 'translateY(0)'; // Show the header
//                 }
//             } else {
//                 // If within the viewport height, always show the header
//                 header.style.transform = 'translateY(0)';
//             }

//             // Update the last scroll position
//             lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
//         });



//         // SEARCH Script
//         const searchOverlay = document.getElementById('search-overlay');
//         const searchIcon = document.getElementById('search-icon');

//         searchIcon.addEventListener('click', function() {
//             // Toggle between showing and hiding the searchOverlay
//             if (searchOverlay.style.display === 'flex') {
//                 searchOverlay.style.display = 'none';
//             } else {
//                 searchOverlay.style.display = 'flex';

//                 // Hide the searchOverlay after 5 seconds (optional)
//                 setTimeout(function() {
//                     searchOverlay.style.display = 'none';
//                 }, 10000);
//             }
//         });

//         searchOverlay.addEventListener('click', function(e) {
//             if (e.target === searchOverlay) {
//                 searchOverlay.style.display = 'none';
//             }
//         });

//         document.addEventListener('click', function(event) {
//             const isClickInside = searchOverlay.contains(event.target) || searchIcon.contains(event.target);

//             if (!isClickInside) {
//                 searchOverlay.style.display = 'none';
//             }
//         });

//         // SEARCH Script END


     
//         // MENU Script
//         const menuBtn = document.querySelector('.menu-btn');
//         const menuBox = document.querySelector('.menu-box');
//         const menuOverlay = document.querySelector('.menu-overlay');
//         const menuBoxItems = document.querySelectorAll('.menu-box .menu-box-item');

//         // Function to close the menu
//         function closeMenu() {
//             if (menuBox.classList.contains('active')) {
//                 // Ensure active class is removed before adding inactive class
//                 menuBox.classList.remove('active');
//                 menuBox.classList.add('inactive');
//                 menuOverlay.classList.remove('active');

//                 // Apply closing animation to menu items
//                 menuBoxItems.forEach(item => {
//                     item.style.animation = 'rotateOut 0.5s forwards';
//                 });

//                 // Ensure inactive class is removed after animation
//                 setTimeout(() => {
//                     menuBox.classList.remove('inactive');
//                 }, 500); // Match this with the duration of the rotateOut animation
//             }
//         }

//         // Function to open the menu
//         function openMenu() {
//             // Add active class and apply opening animation to menu items
//             menuBox.classList.add('active');
//             menuBoxItems.forEach((item, index) => {
//                 item.style.animation = `rotateIn 0.5s ${index * 0.1}s forwards`;
//             });
//             menuOverlay.classList.add('active');
//         }

//         // Function to toggle the menu state
//         function toggleMenu() {
//             // Toggle menu based on current state
//             if (menuBox.classList.contains('active')) {
//                 closeMenu();
//             } else {
//                 openMenu();
//             }
//         }

//         // Event listeners for toggling menu and closing it
//         menuBtn.addEventListener('click', toggleMenu);
//         menuOverlay.addEventListener('click', closeMenu);

//         // Close menu when clicking on any other element outside the menu box
//         document.addEventListener('click', (event) => {
//             const targetElement = event.target;
//             // Check if the click is outside the menuBox and not on the menuBtn
//             if (!menuBox.contains(targetElement) && !menuBtn.contains(targetElement)) {
//                 closeMenu();
//             }
//         });

//         // Stop the menu from closing when clicking inside the menu box or on the menu button
//         menuBox.addEventListener('click', function(event) {
//             event.stopPropagation();
//         });

//         // Close menu when clicking on menu items
//         menuBoxItems.forEach(function(item) {
//             item.addEventListener('click', function() {
//                 closeMenu();
//             });
//         });

//         // MENU Script END


//         // Scroll To Top Script 
//             const scrollToTopBtn = document.getElementById('scrollToTopBtn');

//             window.addEventListener('scroll', () => {
//                 if (window.scrollY > 300) { // Show button after scrolling down 300px
//                     scrollToTopBtn.classList.add('show');
//                 } else {
//                     scrollToTopBtn.classList.remove('show');
//                 }
//             });
    
//             scrollToTopBtn.addEventListener('click', () => {
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             });
//          // Scroll To Top Script END

// });






document.addEventListener('DOMContentLoaded', function () {



    // SEARCH Script
    const searchOverlay = document.getElementById('search-overlay');
    const searchIcon = document.getElementById('search-icon');

    function toggleSearch() {
        if (searchOverlay.style.display === 'flex') {
            searchOverlay.style.display = 'none';
        } else {
            searchOverlay.style.display = 'flex';
            closeMenu(); // Ensure menu is closed when search is opened

            // Hide the searchOverlay after 10 seconds (optional)
            // setTimeout(function () {
            //     searchOverlay.style.display = 'none';
            // }, 10000);
        }
    }

    searchIcon.addEventListener('click', function (e) {
        e.stopPropagation(); // Stop event propagation to prevent conflicts
        toggleSearch();
    });

    searchOverlay.addEventListener('click', function (e) {
        if (e.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        const isClickInside = searchOverlay.contains(event.target) || searchIcon.contains(event.target);

        if (!isClickInside) {
            searchOverlay.style.display = 'none';
        }
    });

    // MENU Script
    const menuBtn = document.querySelector('.menu-btn');
    const menuBox = document.querySelector('.menu-box');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuBoxItems = document.querySelectorAll('.menu-box .menu-box-item');

    // Function to close the menu
    function closeMenu() {
        if (menuBox.classList.contains('active')) {
            // Ensure active class is removed before adding inactive class
            menuBox.classList.remove('active');
            menuBox.classList.add('inactive');
            menuOverlay.classList.remove('active');

            // Apply closing animation to menu items
            menuBoxItems.forEach(item => {
                item.style.animation = 'rotateOut 0.5s forwards';
            });

            // Ensure inactive class is removed after animation
            setTimeout(() => {
                menuBox.classList.remove('inactive');
            }, 500); // Match this with the duration of the rotateOut animation
        }
    }

    // Function to open the menu
    function openMenu() {
        // Add active class and apply opening animation to menu items
        menuBox.classList.add('active');
        menuBoxItems.forEach((item, index) => {
            item.style.animation = `rotateIn 0.5s ${index * 0.1}s forwards`;
        });
        menuOverlay.classList.add('active');
    }

    // Function to toggle the menu state
    function toggleMenu() {
        // Close search overlay if it's open
        if (searchOverlay.style.display === 'flex') {
            searchOverlay.style.display = 'none';
        }

        // Toggle menu based on current state
        if (menuBox.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event listeners for toggling menu and closing it
    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent conflicts with document-level click listener
        toggleMenu();
    });

    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on any other element outside the menu box
    document.addEventListener('click', (event) => {
        const targetElement = event.target;
        // Check if the click is outside the menuBox and not on the menuBtn
        if (!menuBox.contains(targetElement) && !menuBtn.contains(targetElement)) {
            closeMenu();
        }
    });

    // Stop the menu from closing when clicking inside the menu box
    menuBox.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Close menu when clicking on menu items
    menuBoxItems.forEach(function (item) {
        item.addEventListener('click', function () {
            closeMenu();
        });
    });













        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        const footer = document.querySelector('footer'); // Adjust if footer has a different selector
        const floatingArrow = document.querySelector('.floating-arrow span');
        let isOverlayActive = false; // Flag to track if overlay is active
    
        // Function to update the position of the scroll-to-top button
        function updateButtonPosition() {
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (footerRect.top < viewportHeight && footerRect.bottom > 0) {
                    scrollToTopBtn.style.bottom = `${Math.max(10, viewportHeight - footerRect.top + 10)}px`;
                } else {
                    scrollToTopBtn.style.bottom = '10px';
                }
            }
        }
    
        // Function for floating arrow animation
        function cycleAnimation() {
            if (floatingArrow) {
                floatingArrow.classList.add('animate');
                setTimeout(() => {
                    floatingArrow.classList.remove('animate');
                    setTimeout(() => {
                        cycleAnimation(); 
                    }, 10000); 
                }, 5000); 
            } else {
                console.error('Element with class .floating-arrow span not found.');
            }
        }
    
        window.addEventListener('scroll', () => {
            if (!isOverlayActive) {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('show');
                    updateButtonPosition(); // Update position on scroll
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            }
        });
    
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    
        // Initial position update
        updateButtonPosition();
    
        // Update button position on window resize to account for footer size changes
        window.addEventListener('resize', updateButtonPosition);
    
        // Start floating arrow animation
        setTimeout(cycleAnimation, 10000); 






});




document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.post').forEach(function(div) {
        div.addEventListener('click', function() {
            var url = div.getAttribute('data-url');
            window.location.href = url;
        });
    });

    document.querySelectorAll('.smallpost').forEach(function(div) {
        div.addEventListener('click', function() {
            var url = div.getAttribute('data-url');
            window.location.href = url;
        });
    });




});



document.addEventListener('DOMContentLoaded', function() {
    const signoutLink = document.getElementById('signout-link');
    const signoutLinkTwo = document.getElementById('signout-link-two');
    
    if (signoutLink) {
        signoutLink.addEventListener('click', handleLogout);
    }
    
    if (signoutLinkTwo) {
        signoutLinkTwo.addEventListener('click', handleLogout);
    }
});

function getCsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

function getLogoutUrl() {
    return '{% url "account_app:logout" %}'; // Adjust the URL as needed
}

function handleLogout() {
    fetch(getLogoutUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken()
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect_url; // Redirect after successful logout
        } else {
            console.error('Logout failed:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
