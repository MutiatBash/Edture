import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { token } = useContext(userContext);
	const [cartItems, setCartItems] = useState([]);

	const fetchCartItems = async () => {
		if (!token) return;

		try {
			const response = await axios.get("https://edture.onrender.com/cart", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (
				response.data &&
				response.data.data &&
				response.data.data.courses
			) {
				setCartItems(response.data.data.courses);
			} else {
				console.error("Unexpected response structure:", response.data);
			}
		} catch (error) {
			console.error("Failed to fetch cart items:", error);
		}
	};

	useEffect(() => {
		fetchCartItems();
	}, [token]);

	const addItemToCart = async (item) => {
		if (!token) return false;

		const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);

		if (itemExists) {
			console.error("Item is already in the cart");
			return false;
		}

		try {
			await axios.post(
				"https://edture.onrender.com/cart",
				{ courseId: item.id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			await fetchCartItems();

			// Log the updated cart items
			console.log("Item added to cart:", item);
			console.log("Updated cart items:", cartItems);

			return true;
		} catch (error) {
			console.error("Failed to add item to cart:", error);
			return false;
		}
	};

	const removeItemFromCart = async (item) => {
		if (!token) return;

		try {
			await axios.delete(
				"https://edture.onrender.com/cart", 
				{
					headers: { Authorization: `Bearer ${token}` },
					data: { courseId: item.id }, 
				}
			);

			await fetchCartItems();
		} catch (error) {
			console.error("Failed to remove item from cart:", error);
		}
	};

	const clearCartItems = () => {
		setCartItems([]);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addItemToCart,
				removeItemFromCart,
				clearCartItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
