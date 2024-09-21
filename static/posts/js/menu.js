document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.menu-box-item[data-url]').forEach(function(item) {
        item.addEventListener('click', function() {
            var url = item.getAttribute('data-url');
            window.location.href = url; 
        });
    });
    


});
