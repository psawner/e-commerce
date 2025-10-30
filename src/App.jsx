import { useEffect, useState} from "react";
import './App.css'

function App() {
  const [products, setproducts] = useState([])

  useEffect(() => {
    const products = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })

        const data = await res.json()
        console.log("data got")
        setproducts(data);
      } catch (err) {
        console.error(err)
      }
    }
    products()
  }, [])

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const cart = async () => {
    setShowCart(!showCart)

    if (!showCart) {
      try {
        const res = await fetch("http://localhost:3001/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await res.json();
        setCartItems(data.result || []);
        setTotal(data.result1?.[0]?.total_price || 0);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  }

  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  const clickCart = () => {
    setShowForm(true);
  }
  const submitInput = async () => {

    try {
      const res = await fetch("http://localhost:3001/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, item_qty: qty }),
      });
      if (productId && qty) {
        const data = await res.json();
        console.log("Added:", data);
        alert("Item added successfully!");
        setShowForm(false);
      } else {
        alert("product_id or qty is missing!");
      }

    } catch (err) {
      console.error(err);
    }
  }

  const removeCartItem = async (product_id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/cart/${product_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert(`Item ${product_id} removed successfully!`);
        const updated = await fetch("http://localhost:3001/api/cart");
        const data = await updated.json();
        setCartItems(data.result || []);
        setTotal(data.result1?.[0]?.total_price || 0);
      } else {
        alert("Failed to remove");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  }

  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = async () => {
    const user_name = document.getElementById("user_name").value.trim();
    const user_email = document.getElementById("email").value.trim();

    if (!user_name || !user_email) {
      alert("Please enter both name and email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name, user_email }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`${data.message}\nTotal: ₹${data.data.total}\nTime: ${data.data.timestamp}`);
        setShowCheckout(false);
        setCartItems([]); // Empty cart after purchase
        setTotal(0);
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Internal server error");
    }
  };

  return (
    <div>
      <header className='e_header'>
        <h3>e-commerce</h3>
        <i class="fa-solid fa-cart-arrow-down" onClick={cart}></i>
      </header>
      <section className='breakdown'>
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="product">
              <h4>{p.id}</h4>
              <h4>{p.item_name}</h4>
              <p>price: ₹{p.item_price}</p>
              <div className="rep"><button className="add" onClick={clickCart}><i class="fa-solid fa-cart-plus"></i></button></div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </section>
      {showCart && (<div className="cartlist">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="cart_item">
                <span>{item.item_name}</span>
                <span>Price: ₹{item.item_price}</span>
                <span>Qty: {item.item_qty}</span>
                <div className="remove_item"><i class="fa-solid fa-trash-can" onClick={() => removeCartItem(item.product_id)}></i></div>
              </div>
            ))}

            <div className="cart_total">
              <strong>Total: ₹{total}</strong>
              <button className="buy" onClick={() => setShowCheckout(true)}>Buy</button>
            </div>
          </>
        ) : (
          <p>cart is empty</p>
        )}
      </div>)}

      {showForm && (
        <div className="item_addtocart">
          <button className="close_btn" onClick={() => setShowForm(false)}><i class="fa-solid fa-xmark"></i></button>
          <input id="product_id" placeholder="Enter Product ID"
            value={productId} onChange={(e) => setProductId(e.target.value)}></input>
          <input id="qty" placeholder="Enter Quantity"
            type="number"
            value={qty} onChange={(e) => setQty(e.target.value)}></input>
          <button className="add_btn" onClick={submitInput}>Add</button>
        </div>
      )}

      {showCheckout && (
        <div className="checkout_model">
          <button className="close_btn" onClick={() => setShowCheckout(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <input id="user_name" placeholder="User Name" />
          <input id="email" placeholder="Email" />
          <button className="buy_item" onClick={handleCheckout}>
            Add
          </button>
        </div>
      )}
    </div>
  )
}

export default App
