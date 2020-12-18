// bulma js
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }

    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        var $notification = $delete.parentNode;
    
        $delete.addEventListener('click', () => {
          $notification.parentNode.removeChild($notification);
        });
    });
  
});

// prevent mobile page from overflowing
$.each( $('*'), function() { 
    if( $(this).width() > $('body').width()) {
    console.log("Wide Element: ", $(this), "Width: ",   
        $(this).width()); 
    } 
});

// prevents multiple form submissions
var wasSubmitted = false;    
function checkBeforeSubmit(){
    if(!wasSubmitted) {
        wasSubmitted = true;
        return wasSubmitted;
    }
    return false;
}  

