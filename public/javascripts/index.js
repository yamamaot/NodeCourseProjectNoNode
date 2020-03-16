document.addEventListener("DOMContentLoaded", function(event){

    var ProductObject = function (pProductName, pPrice) {
        this.ProductName = pProductName;
        this.Price = pPrice;
    }

    var OrderObject = function (pArray){
        this.Array = pArray;
    }

    //productList array is full of actual product objects.
    //however, user cart is simply integers indicating how many of each [indexed product] is in cart.
    //protections for going under 0 should be in place when at the cart page.
    let productList = [];
    let userCart = [];
    let orderList = [Array];
    
    //create products
    let product0 = new ProductObject("Stereo", 200);
    let product1 = new ProductObject("Speakers", 150);
    let product2 = new ProductObject("Remote control", 20);
    

    //push each product to the product list
    productList.push(product0);
    productList.push(product1);
    productList.push(product2);

    //fill cart with 0, as the cart is empty
    for (var i = 0; i < productList.length; i++){
        userCart.push(0);
    }

    //empty the cart after purchase
    //new functionality; convert the user cart into an array object, then push this object to an array storing orders
    function emptyCart(){
        let orderPlaceholder = [];
        for (var j = 0; j < userCart.length; j++){
            orderPlaceholder.push(userCart[j]);
        }
        //let orderObject1 = orderPlaceholder;
        orderList.push(orderPlaceholder);
        //console.log(orderList.length);
        
        //actually empty the cart
        for (var i = 0; i < userCart.length; i++){
            userCart[i] = 0;
        }
    }

    document.getElementById("btnRecommend").addEventListener("click", displayRandomProduct);

    function displayRandomProduct(){
        let rnd = Math.floor((Math.random() * productList.length));
        document.getElementById("recommended").innerHTML = "Try the " + productList[rnd].ProductName + " for only " + productList[rnd].Price + " yollars today!";
        document.getElementById("recommendedImg").src = "public/images/" + productList[rnd].ProductName + ".jpg";
    }

    displayRandomProduct();


    function addToCartFirst(pProduct){
        for (var i = 0; i < productList.length; i++){
            if (pProduct == productList[i]){
                userCart[i] = userCart[i] + 1;
            }
        }
        alert("Added one " + pProduct.ProductName + " to cart!");
        console.log(userCart);
    }

    //display name, picture, and price along with a button to buy
    function displayProduct(pProduct, pHtmlName, pHtmlPrice, pImage, pButton){
        document.getElementById(pHtmlName).innerHTML = pProduct.ProductName;
        document.getElementById(pHtmlPrice).innerHTML = "$" + pProduct.Price;  
        document.getElementById(pImage).src = "public/images/" + pProduct.ProductName + ".jpg";
        document.getElementById(pButton).addEventListener("click", function(){ addToCartFirst(pProduct)});
    }

    //displayProduct method used on page1
    displayProduct(productList[0], "productName0", "productPrice0", "productImg0", "btnCart0");
    displayProduct(productList[1], "productName1", "productPrice1", "productImg1", "btnCart1");
    displayProduct(productList[2], "productName2", "productPrice2", "productImg2", "btnCart2");

    //inflexible display cart method
    function displayCart(){
        document.getElementById("stereoAmt").innerHTML = userCart[0];
        document.getElementById("speakerAmt").innerHTML = userCart[1];
        document.getElementById("remoteAmt").innerHTML = userCart[2];
    }

    //flexible add and subtract from cart methods
    function addToCart(productInt){
        userCart[productInt]++;
        displayCart();
    }
    function subtractFromCart(productInt){
        if (userCart[productInt] == 0){
            alert("There are no items to remove!");
        } else {
            userCart[productInt]--;
            displayCart();
        }
    }

    //get price total of all items in cart
    function getTotal(pArray) {
        let total = 0;
        for(var i = 0; i < pArray.length; i++){
            total += (productList[i].Price * pArray[i]);
        }
        return total;
    }

    //show the current total on the purchase page
    function displayPurchase(){
        let cartTotal = getTotal(userCart);
        if (cartTotal > 0){
            document.getElementById("cartMessage").innerHTML = "Your total is: $" + cartTotal;
        } else {
            document.getElementById("cartMessage").innerHTML = "There's nothing in your cart! Please add something to it.";
        }
    }

    //purchase all items in cart when button is pressed
    function purchaseItems(){
        if (getTotal(userCart) > 0){
            alert("Thank you for your purchase! $" + getTotal(userCart) + " has been deducted from your account. See you soon!");
            emptyCart();
            displayPurchase();
        } else {
            alert("Nothing in cart!");
        }

    }

    //create a list item
    function createPrevOrderListItem(index){
        let stringOutput = "Order number " + (index) + " consisted of "
                + orderList[index][0] + " Stereo(s), "
                + orderList[index][1] + " Speaker(s), and "
                + orderList[index][2] + " Remote(s) for a grand total of $"
                + getTotal(orderList[index]) + ".";
        return stringOutput;        
    }
    //display all list items on the previous orders page
    //for whatever reason, I had to start the for loop at 1 because starting at 0 would
    //always return a garbage value
    function displayPrevOrdersInList(){
        if(orderList[0] != null){
            for (i = 1; i < orderList.length; i++) {
                var li = document.createElement("li");
                console.log(orderList[0][0]);
                var text = document.createTextNode(createPrevOrderListItem(i));
                li.appendChild(text);
                document.getElementById("myUl").appendChild(li);
            }
        }
    }


    //activate all buttons on the cart page
    document.getElementById("btnStereoMinus").addEventListener("click", function(){subtractFromCart(0)});
    document.getElementById("btnStereoPlus").addEventListener("click", function(){addToCart(0)});
    document.getElementById("btnSpeakerMinus").addEventListener("click", function(){subtractFromCart(1)});
    document.getElementById("btnSpeakerPlus").addEventListener("click", function(){addToCart(1)});
    document.getElementById("btnRemoteMinus").addEventListener("click", function(){subtractFromCart(2)});
    document.getElementById("btnRemotePlus").addEventListener("click", function(){addToCart(2)});
    document.getElementById("btnPurchase").addEventListener("click", function(){purchaseItems()});

    //load up amounts on the cart page and purchase page
    $(document).on("pagebeforeshow", "#page2", function(){
        displayCart();
    });
    $(document).on("pagebeforeshow", "#page3", function(){
        displayPurchase();
    });
    
    $(document).on("pagebeforeshow", "#page4", function(){
        displayPrevOrdersInList();
    });

});