//UNDERSTANDING THE DOCUMENTATION
//- MEANS THE START OF A SPECIFIC OPERATION
//-- MEANS A SUB-COMPONENT/BLOCK OF THE MAIN OPERATION


document.addEventListener('DOMContentLoaded', function() {

//-Code for referencing another HTML document
    fetch('./1 Common.html')
      .then(response => response.text())
      .then(html => {
//--Insert the fetched HTML content into the current page
            document.body.innerHTML += html;
          })
      .catch(error => {
          console.error('Error fetching document.html:', error);
        });
  

        
//-DROPDOWN MENU
    const dropdownButtons = document.querySelectorAll('.has-main-nav-dropdown button');
  
    dropdownButtons.forEach(button => {
      button.addEventListener('click', function() {
        const menu = this.nextElementSibling;
        const expanded = this.getAttribute('aria-expanded') === 'true';
  
  //--Toggle the aria-expanded attribute
        this.setAttribute('aria-expanded', !expanded);
  
  //--Toggle the aria-hidden attribute of the menu
        menu.setAttribute('aria-hidden', expanded ? 'true' : 'false');
  
  //--Toggle the aria-hidden attribute of all submenu items
        const subMenuItems = menu.querySelectorAll('a');
        subMenuItems.forEach(item => {
          item.setAttribute('aria-hidden', expanded ? 'true' : 'false');
        });
  
        if (!expanded) {
  //--Expand the menu
          menu.classList.add('expanded');
  
  //--Focus on the first focusable element within the menu
          const firstFocusableElement = menu.querySelector('a');
          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        } else {
  //--Collapse the menu
          menu.classList.remove('expanded');
        }
      });
  
  //--Add keyboard event listener to handle arrow key navigation
      button.addEventListener('keydown', function(event) {
        const menu = this.nextElementSibling;
        const expanded = this.getAttribute('aria-expanded') === 'true';
        const menuItems = menu.querySelectorAll('a');
  
        if (event.key === 'ArrowDown' && !expanded) {
  //--Expand the menu
          menu.classList.add('expanded');
  
  //--Focus on the first focusable element within the menu
          const firstFocusableElement = menu.querySelector('a');
          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        } else if (event.key === 'ArrowUp' && expanded) {
  //--Collapse the menu
          menu.classList.remove('expanded');
        } else if (event.key === 'ArrowDown' && expanded) {
  //--Focus on the next focusable element within the menu
          event.preventDefault(); // Prevent scrolling
          const currentFocusedIndex = Array.from(menuItems).indexOf(document.activeElement);
          const nextIndex = (currentFocusedIndex + 1) % menuItems.length;
          menuItems[nextIndex].focus();
        } else if (event.key === 'ArrowUp' && expanded) {
  //--Focus on the previous focusable element within the menu
          event.preventDefault(); // Prevent scrolling
          const currentFocusedIndex = Array.from(menuItems).indexOf(document.activeElement);
          const previousIndex = (currentFocusedIndex - 1 + menuItems.length) % menuItems.length;
          menuItems[previousIndex].focus();
        }
      });
    });
  });
  