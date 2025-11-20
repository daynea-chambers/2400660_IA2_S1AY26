/*3. Integration & Presentation
a. CSS + JS Integration
•	CSS and JS are correctly linked as external files.
•	HTML remains clean and semantic (no inline styling or inline JS).
*/
/*Registration Page*/
/*==================
2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
==================*/
function Register() {
    let form = document.getElementById('register');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get input values
        let username = document.getElementById("new-username").value.trim().toLowerCase();
        let password = document.getElementById("new-password").value;
        let email = document.getElementById("new-email").value;
        
        // Basic validation
        if (!username || !password || !email) {
            alert('Please fill in all fields');
            return;
        }
        if(password.length<8)
        {
            alert("Password must be atleast 8 characters long");
            return;
        }
       // Retrieve users array from localStorage or create empty
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists - compare with the entered username
        if (users.some(user => user.username === username)) {
            alert('User already exists');
            return;
        }
        // Add new user and save to localStorage
        users.push({username,email,password});
        try{
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful');
            window.location.href = "login.html";

        }
        catch(e)
        {
            alert("An error occured while saving. Please try again...")
        }
        
    });
}
/*==================
2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
3. Integration & Presentation
b. User Experience & Accessibility 
•	Clear navigation and readable design.
•	Use of alt text, labels, proper color contrast
==================*/
/*Login Page Functionality*/
function Login() {
  let form = document.getElementById('login');
  if (!form) return; // not on login page

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('p-username').value.trim().toLowerCase();
    let password = document.getElementById('p-password').value;
    
    if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
    // Get registered users
    let users = JSON.parse(localStorage.getItem('users'));
    
    // Find matching user
    let user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert('Login successful!');
        // On login
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("cart", JSON.stringify(user.cart || []));
    window.location.href = 'products.html';
    } else {
      alert('Invalid username or password');
    }
  });
}
//This function allows the user to log out of the website
function Logout()
{
    localStorage.removeItem("currentUser");
    alert("You have been logged out!");
    window.location.href = "index.html";
}

//This function ensures that only registered users are allowed to shop
function requireLogin() {
  const currentPage = window.location.pathname;
  const publicPages = ["login.html", "aboutus.html", "index.html","registration.html"];

  if (publicPages.some(page => currentPage.includes(page))) return;

  if (!localStorage.getItem("currentUser")) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
  }
}
requireLogin();

/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	
==================*/

//This function allows the information from the localStorage to populate the cart table
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Rendering cart with items:", cart);
    const cartBody = document.getElementById('cartBody');
    const grandTotalCell = document.getElementById('grandTotal');

    // If we're not on the cart page (no cart table present), don't attempt to render.
    if (!cartBody) {
        return;
    }

    // renderCart() responsibility:
    // - build the cart table rows from localStorage.cart
    // - create interactive controls (qty input, size select) and persist changes immediately

    cartBody.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td>Your cart is empty.</td></tr>';
        grandTotalCell.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');

        const name = item.name || '';
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.qty) || 0;
        const size = item.size || '';
        const subtotal = price * quantity;
        grandTotal += subtotal;

        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${size}</td>
            <td>${price.toFixed(2)}</td>
            <td>${subtotal.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
        console.log(cart)
    });
    grandTotalCell.textContent = `$${grandTotal.toFixed(2)}`;
}
// Ensure the cart is rendered when the cart page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartBody')) {
        renderCart();
    }
});

/*2. JavaScript Knowledge & Application 
b. Event Handling 
•	At least two (2) working event listeners and respective handlers
*/
// Attach non-inline event handlers and initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handlers (they attach submit listeners internally)
    if (document.getElementById('register')) {
        Register();
    }
    if (document.getElementById('login')) {
        Login();
    }
    if (document.getElementById('shipping')) {
        Submit();
    }
});
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
// AddtoCart1 — handler for Floral Journal
function AddtoCart1()
{
    // AddtoCart1 — product-specific handler for the Floral Journal
    // Reads DOM values (name, price, selected size and quantity), validates them,
    // updates localStorage.cart (merging qty if same product+size exists), then re-renders the cart.

    const name=document.getElementById("floral").textContent;
    const priceText = document.getElementById("floralp").textContent||"0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity=parseInt(document.getElementById("fnumber").value);
    const size = document.getElementById("florals").value;
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }
    if(quantity<=0)
    {
        alert("Negative quantity not allowed!");
        return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty = (parseInt(existingItem.qty) || 0) + quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();

}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.

d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
// AddtoCart2 — handler for Wellness Journal (see notes above)
function AddtoCart2()
{
    const name=document.getElementById("wellness").textContent;
    const priceText = document.getElementById('wellnessp').textContent||"0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity=parseInt(document.getElementById("wnumber").value);
    const size = document.getElementById("wellnesss").value;
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }

    if(quantity<=0)
    {
        alert("Negative quantity not allowed!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
// AddtoCart3 — handler for Minimalist Journal
function AddtoCart3()
{
    const name=document.getElementById("minimalist").textContent;
    const priceText = document.getElementById('minimalistp').textContent||"0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity=parseInt(document.getElementById("mnumber").value);
    const size = document.getElementById("minimalists").value;    
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }

    if(quantity<=0)
    {
        alert("Negative quantity not allowed!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.

d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
// AddtoCart4 — handler for Artistic Journal
function AddtoCart4()
{
    const name=document.getElementById("artistic").textContent;
    const priceText = document.getElementById('artisticp').textContent||"0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity=parseInt(document.getElementById("anumber").value);
    const size = document.getElementById("artistics").value;
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }

    if(quantity<=0)
    {
        alert("Negative quantity not allowed!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();

}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
function AddtoCart5()
{
    // AddtoCart5 — handler for Travel Journal
    const name=document.getElementById("travel").textContent;
    const priceText = document.getElementById('travelp').textContent || "0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity=parseInt(document.getElementById("tnumber").value);
    const size = document.getElementById("travels").value;
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }

    if(quantity<=0)
    {
        alert("Negative quantity not allowed!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
function AddtoCart6() {
    // AddtoCart6 — handler for Personalized Journal
    const name = document.getElementById("personalized").textContent;
    const priceText = document.getElementById("personalizedp").textContent || "0";
    const price = parseFloat(priceText.replace(/[^0-9.\-]/g, "")) || 0;
    const quantity = parseInt(document.getElementById("pnumber").value);
    const size = document.getElementById("personalizeds").value;
    
    if (size==="Select Size") {
    alert("Please select a size.");
    return;
    }

    if (quantity <= 0) {
        alert("Negative quantity not allowed!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ name, price, qty: quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} (Size: ${size}) added to cart!`);
    renderCart();
}


/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
//remove from cart
function RemovefromCart1()
{
    // RemovefromCart1 — removes the Floral Journal of the selected size from localStorage.cart
    let name=document.getElementById("floral").textContent.trim();
    let size=document.getElementById("florals").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  

    const itemExists = cart.some(item =>
        String(item.name || '').trim()=== name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } 
    else 
        {
        const newCart = cart.filter(item =>!(String(item.name || '').trim()=== name && String(item.size || '').trim() === size)
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
//remove from cart
function RemovefromCart2()
{
    // RemovefromCart2 — removes the Wellness Journal of the selected size from localStorage.cart
    let name=document.getElementById("wellness").textContent.trim();
    let size=document.getElementById("wellnesss").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  

    const itemExists = cart.some(item =>
        String(item.name || '').trim()=== name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } 
    else 
        {
        const newCart = cart.filter(item =>!(String(item.name || '').trim() === name && String(item.size || '').trim()=== size)
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/

function RemovefromCart3()
{
    // RemovefromCart3 — removes the Minimalist Journal of the selected size from localStorage.cart
    let name=document.getElementById("minimalist").textContent.trim();
    let size=document.getElementById("minimalists").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  

    const itemExists = cart.some(item =>
        String(item.name || '').trim()=== name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } 
    else 
        {
        const newCart = cart.filter(item =>!(String(item.name || '').trim() === name && String(item.size || '').trim() === size)
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
function RemovefromCart4()
{
    // RemovefromCart4 — removes the Artistic Journal of the selected size from localStorage.cart
    let name=document.getElementById("artistic").textContent.trim();
    let size=document.getElementById("artistics").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  

    const itemExists = cart.some(item =>
        String(item.name || '').trim() === name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } 
    else 
        {
        const newCart = cart.filter(item =>!(String(item.name || '').trim() === name && String(item.size || '').trim()=== size)
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
        renderCart();
    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
function RemovefromCart5()
{
    // RemovefromCart5 — removes the Travel Journal of the selected size from localStorage.cart
    let name=document.getElementById("travel").textContent.trim();
    let size=document.getElementById("travels").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  

    const itemExists = cart.some(item =>
        String(item.name || '').trim() === name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } 
    else 
        {
        const newCart = cart.filter(item =>!(String(item.name || '').trim()=== name && String(item.size || '').trim()=== size)
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
        renderCart();

    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	

*/
function RemovefromCart6() {
    // RemovefromCart6 — removes the Personalized Journal of the selected size from localStorage.cart
    let name = document.getElementById("personalized").textContent.trim();
    let size = document.getElementById("personalizeds").value.trim();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let itemExists = cart.some(item =>
        String(item.name || '').trim()=== name &&
        String(item.size || '').trim()=== size
    );

    if (!itemExists) {
        alert(`No "${name}" of size "${size}" found in the cart to remove`);
    } else {
        const newCart = cart.filter(item => !(
            String(item.name || '').trim() === name &&
            String(item.size || '').trim()=== size
        ));

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${name} of size ${size} removed from cart`);
    }
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
*/
function Submit()
{
    // Submit — handles the shipping form on checkout.html
    // Adds the submitted shipping details to localStorage.shipping and resets the form
    let form = document.getElementById('shipping');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get input values
        let name = document.getElementById("sname").value.trim();
        let address = document.getElementById("saddress").value;
        let amount = document.getElementById("sprice").value;
        let method = document.getElementById("smethod").value;
        
        // Basic validation
        if (!name || !address||!amount||!method) {
            alert('Please fill in all fields');
            return;
        }
       // Retrieve users array from localStorage or create empty
        let shipping = JSON.parse(localStorage.getItem('shipping')) || [];

        // Add new user and save to localStorage
        shipping.push({name,address,amount,method});
        localStorage.setItem('shipping', JSON.stringify(shipping));
        alert('Shipping details entered successfully');
        form.reset();
    });   
}
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.	
3. Integration & Presentation
b. User Experience & Accessibility 
•	Clear navigation and readable design.
•	Use of alt text, labels, proper color contrast
*/
function Cancel()
{
    // Cancel — removes a shipping entry (by name) from localStorage.shipping when user confirms
    let name=document.getElementById("sname").value.trim();
    const shipping = JSON.parse(localStorage.getItem('shipping')) || [];
    const newShipping = shipping.filter(item => item.name !== name);
    if(newShipping.length===shipping.length)
    {
        alert(`No shipping entry found for "${name}"`);
        return;
    }
    const confirmDelete = confirm(`Are you sure you want to remove shipping and payment details for "${name}"?`);
    if (!confirmDelete) return;

    localStorage.setItem('shipping', JSON.stringify(newShipping));
  alert("Your details were removed");
}


document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('shopCard')) {
        Checkout();
    }
});
/*2. JavaScript Knowledge & Application 
a. DOM Manipulation
•	Correct use of DOM functions, eg getElementById(), querySelector(), etc
•	Dynamically update HTML and CSS using Js.
b. Event Handling 
•	At least two (2) working event listeners and respective handlers.
c. Form Validation / Input Handling 
•	Simple validation (e.g., check if a field is empty, validate email format, etc).
•	Uses JavaScript functions or updates the DOM with error messages.
d. Basic Interactivity / Logic
•	Evidence of correct control structures being used.
•	Correct arithmetic calculations.
3. Integration & Presentation
b. User Experience & Accessibility 
•	Clear navigation and readable design.
•	Use of alt text, labels, proper color contrast

*/
//Creating constants to use for the arithmetic operations
const DEFAULT_DISCOUNT_RATE = 10; // %
const DEFAULT_TAX_RATE = 15;      //
const DEFAULT_SHIPPING_PRICE=150;

// Checkout — reads the cart from localStorage and computes subtotal, discount, tax and total
// Also populates the checkout preview with the cart items (name, qty, size, price, subtotal)
function Checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });
    
    const discount = subtotal * (DEFAULT_DISCOUNT_RATE / 100);
    const tax = (subtotal - discount) * (DEFAULT_TAX_RATE / 100);
    const total = subtotal - discount + tax+(DEFAULT_SHIPPING_PRICE);

    // Display summary
    document.getElementById("previewSubTotal").textContent = `Sub-total: $${subtotal.toFixed(2)}`;
    document.getElementById("previewDiscount").textContent = `Discount (${DEFAULT_DISCOUNT_RATE}%): $${discount.toFixed(2)}`;
    document.getElementById("previewTax").textContent = `Tax (${DEFAULT_TAX_RATE}%): $${tax.toFixed(2)}`;
    document.getElementById("previewTotalCost").textContent = `Total Cost with shipping: $${total.toFixed(2)}`;

    const previewItems = document.getElementById('previewItems');
    if (previewItems) {
        previewItems.innerHTML = '';
        cart.forEach(item => {
            const line = document.createElement('div');
            line.textContent = `${item.name} — Qty: ${item.qty} — Size: ${item.size} — $${(item.price).toFixed(2)} each — Subtotal: $${(item.price * item.qty).toFixed(2)}`;
            previewItems.appendChild(line);
        });
    }
}


function ClearAll() {
    // ClearAll — empties the shopping cart stored in localStorage
    localStorage.removeItem('cart');
    alert("Your cart has been cleared");
}

function Confirm() {
    // Confirm — simulates payment processing and clears the cart after confirmation
    localStorage.removeItem('cart');
    alert("Your payment has been processed");
    alert("Thank you for shopping with us!")
}

