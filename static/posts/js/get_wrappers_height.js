document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-wrapper');
    const footer = document.querySelector('.footer');
    const contentWrapper = document.querySelector('.content-wrapper');

    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;



    // Update content-wrapper styles
    contentWrapper.style.marginTop = `${headerHeight + 10}px`;
    contentWrapper.style.marginBottom = `${footerHeight + 10}px`;
    contentWrapper.style.minHeight = `calc(100vh - ${headerHeight + footerHeight + 200}px)`;
    contentWrapper.style.marginLeft = 'auto';
    contentWrapper.style.marginRight = 'auto';

        // Log heights to console
        console.log(`Header Height: ${headerHeight}px`);
        console.log(`Footer Height: ${footerHeight}px`);
        console.log(`Content Wrapper  Height: ${contentWrapper.style.minHeight}px`);
        console.log(`Content Wrapper  marginLeft: ${contentWrapper.style.marginLeft}px`);
        console.log(`Content Wrapper  marginRight: ${contentWrapper.style.marginRight}px`);
});



// window.onload = function() {
//     const header = document.querySelector('.header-wrapper');
//     const footer = document.querySelector('.footer');
//     const contentWrapper = document.querySelector('.content-wrapper');

//     const headerHeight = header.offsetHeight;
//     const footerHeight = footer.offsetHeight;

//     // Log heights to console
//     console.log(`Header Height: ${headerHeight}px`);
//     console.log(`Footer Height: ${footerHeight}px`);

//     // Update content-wrapper styles
//     contentWrapper.style.marginTop = `${headerHeight + 100}px`;
//     contentWrapper.style.marginBottom = `${footerHeight + 100}px`;
//     contentWrapper.style.minHeight = `calc(100vh - ${headerHeight + footerHeight + 200}px)`;
//     contentWrapper.style.marginLeft = 'auto';
//     contentWrapper.style.marginRight = 'auto';
// };