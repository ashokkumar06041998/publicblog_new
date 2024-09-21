document.addEventListener('DOMContentLoaded', function() {
    

    //TABBAR Script  
    
    const languageButton = document.getElementById('language-button');
        const categoryButton = document.getElementById('category-button');
        const categoryTab = document.getElementById('category-tab');
        const languageTab = document.getElementById('language-tab');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const lcSelectBtn = document.querySelector('.lc-select-btn');
    
        // Function to set the active tab
        function setActiveTab(tabType, tabName) {
            const tabBar = document.getElementById(tabType);
            tabBar.style.display = 'flex';
            tabBar.querySelectorAll('span').forEach(span => {
                span.classList.remove('active');
                if (span.textContent === tabName) {
                    span.classList.add('active');
                }
            });
        }
    
        // Function to send data to the server
        function sendSelection() {
            fetch(getUrl(), { // Replace with your local server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify({
                    language: localStorage.getItem('selectedLanguage'),
                    category: localStorage.getItem('selectedCategory'),
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigateToHome();
                refreshPostsContainer(); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        
        //refresh the post grid container
        function refreshPostsContainer() {
            fetch(window.location.href)  
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newContent = doc.getElementById('refresh-main-posts').innerHTML;
                    document.getElementById('refresh-main-posts').innerHTML = newContent;
                })
                .catch(error => {
                    console.error('Error refreshing the posts:', error);
                });
        }

    
        // Toggle dropdown visibility
        lcSelectBtn.addEventListener('click', function() {
            const isVisible = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
        });
    
        // Hide dropdown menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!lcSelectBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    
        // Switch between language and category tabs
        languageButton.addEventListener('click', function() {
            categoryTab.style.display = 'none';
            languageTab.style.display = 'flex';
            localStorage.setItem('selectedTab', 'language');
           
        });
    
        categoryButton.addEventListener('click', function() {
            languageTab.style.display = 'none';
            categoryTab.style.display = 'flex';
            localStorage.setItem('selectedTab', 'category');
          
        });
    
        // Scroll left
        document.querySelector('.lc-scroll-button.left').addEventListener('click', function() {
            document.querySelector('.lc-tab-bar:not([style*="display: none"])').scrollBy({ left: -100, behavior: 'smooth' });
        });
    
        // Scroll right
        document.querySelector('.lc-scroll-button.right').addEventListener('click', function() {
            document.querySelector('.lc-tab-bar:not([style*="display: none"])').scrollBy({ left: 100, behavior: 'smooth' });
        });
    
        // Move underline to the clicked item and store selection locally
        document.querySelectorAll('.lc-tab-bar span').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.lc-tab-bar span').forEach(function(item) {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                const tabType = categoryTab.style.display === 'none' ? 'language' : 'category';
                if (tabType === 'language') {
                    localStorage.setItem('selectedLanguage', this.textContent);
                } else {
                    localStorage.setItem('selectedCategory', this.textContent);
                }
                sendSelection(); 
            });
        });


        // function refreshMainPosts() {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'your-endpoint-or-file.html', true);
        //     xhr.onload = function () {
        //         if (xhr.status === 200) {
        //             document.getElementById('refresh-main-posts').innerHTML = xhr.responseText;
        //         }
        //     };
        //     xhr.send();
        // }
    
        // Set the active tab on page load
        const selectedCategory = localStorage.getItem('selectedCategory');
        const selectedLanguage = localStorage.getItem('selectedLanguage');
    
        if (selectedCategory) {
            setActiveTab('category-tab', selectedCategory);

        }
    
        if (selectedLanguage) {
            setActiveTab('language-tab', selectedLanguage);

        }
    
        // Always display category tab on page load or re-open
        categoryTab.style.display = 'flex';
        languageTab.style.display = 'none';
    

        //TABBAR Script   END




        // Function to clear the search input
        function clearSearchInput() {
            var searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = ''; // Clear the input
            }
        }

        // Function to clear the search query from the URL
        function clearSearchQuery() {
            clearSearchInput(); // Clear the search input
            
            // Update the URL to remove the query parameter
            const url = new URL(window.location.href);
            url.searchParams.delete('q'); // Remove the 'q' parameter
            window.history.pushState({}, document.title, url); // Update the URL
        }

        function navigateToHome() {
            clearSearchQuery(); // Clear the search input and URL
            
            // Use a timeout to ensure the clearing happens before navigation
            setTimeout(function() {
                window.location.href =getUrl(); // Navigate to the post home URL
            }, 100); // Adjust the delay if needed
        }


});
