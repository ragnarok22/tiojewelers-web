import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import axios from "axios";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState({
    "amount": 0,
    "id": 0,
    "status": "",
    "sendStatus": "",
    "createdAt": "",
    "updatedAt": "",
    "userId": 0,
    "products": []
  });
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  const [lastCart, setLastCart] = useState([])

  useEffect(() => {
    setCartTotal(cartItems.amount);
    //const Total = cartItems.reduce((a, b) => a + b.total, 0);
    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/carts', {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          }
        })
        if (res.status != 401) {
          if (!res.data) {
            setCartItems({
              "amount": 0,
              "id": 0,
              "status": "",
              "sendStatus": "",
              "createdAt": "",
              "updatedAt": "",
              "userId": 0,
              "products": []
            })
          } else {
            setCartItems(res.data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  //Agregar al carro
  const addToCart2 = async (item, quantity) => {
    const res = await axios.post(`/carts/${item.id}`, { quantity: quantity }, {
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      }
    })
    if (res.status === 204) {
      const mycart = await axios.get('/carts/')
      if (mycart.status === 200) {
        setCartItems(mycart.data)
        toast.success('Product Added Successfully !');
      } else {
        toast.success('Error add to cart');
      }
    } else if (res.status === 404) {
      toast.warning("The product not exist !")
    }
  }

  const addToCart = (item) => {
    setCartItems(item);
    /*   axios.post(`/carts/${item.id}`, { quantity: quantity })
        .then(res => {
          console.log(res.data);
          /* if (res.status === 204) {
            setCartItems(res.data)
            console.log(res.data);
            toast.success("Product Added Successfully !");
          } else {
            toast.error('Error add to cart')
          } */
    /*  }).catch(error => {
       toast.error(error)
     })
  
  */
    /* const index = cartItems.findIndex((itm) => itm.id === item?.id);
  
    if (index !== -1) {
      cartItems[index] = {
        ...item,
        qty: quantity,
        total: item.price * quantity,
      };
      setCartItems([...cartItems]);
    } else {
      const product = {
        ...item,
        qty: quantity,
        total: item.price * quantity,
      };
  
      
    } */

  };
  // Eliminar de carro
  const removeFromCart = async (item) => {
    try {
      const remove = await axios.post(`/carts/remove/${item.copyOf}`, {
        validateStatus: (status) => {
          return status >= 200 && status < 500;
        }
      })
      if (remove.status === 204) {
        const cart = await axios.get("/carts")
        if (cart.status === 200) {
          setCartItems(cart.data)
          toast.success("Product deleted Successfully !")
        } else {
          toast.error("Error deleted product");
        }
      } else {
        toast.error('Error deleted product')
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Actualizar cantidad
  const updateQty = async (item, quantity) => {
    try {
      if (quantity >= 1) {
        const res = await axios.post(`/carts/${item.id}`, { quantity: quantity }, {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          }
        })
        if (res.status === 204) {
          setQuantity(quantity)
          const cart = await axios.get("/carts")
          setCartItems(cart.data)
          toast.success("Product Added Successfully !")
        } else if (res.status === 400) {
          toast.warning('Out of Stock!')
        } else if (res.status === 404) {
          toast.warning('Out of Stock!')
        }
      }
    } catch (error) {
      toast.warning(error)
    }

    /*  const res = await axios.post(`/carts/${item.id}`, { quantity: quantity })
     if (res.status === 200) {
       const mycart = await axios.get('/carts')
       setCartItems(mycart.data)
       toast.success("Producto agregado !!!")
     }
     if (res.status > 399) {
       toast.warning("Out of Stock!")
     } */
  };
  const setQty = (item, quantity) => {
    setQuantity(quantity);
    if (quantity > 0 && quantity <= item.quantity) {
      setStock("InStock");
    } else {
      setStock("Out of Stock !");
    }
  };
  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item) => {
    if (item.quantity >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };



  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
        setQty: setQty,
        addToCart2, addToCart2,
        setCartItems: setCartItems,
        lastCart: lastCart
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
