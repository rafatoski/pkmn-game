document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu-items');

    menuBtn.addEventListener('click', () =>{
        menu.classList.toggle('active');

    });

});