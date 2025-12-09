'use client';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaArrowLeft, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, removeFromCart, total, clearCart } = useCart();
    const deliveryFee = 2.00;

    const { user, token } = useAuth();
    const router = useRouter();

    const handleOrder = async () => {
        if (!user || !token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total: total + deliveryFee,
                    deliveryAddress: "Home • 742 Evergreen Terrace, Springfield" // Hardcoded for now per plan
                })
            });

            if (res.ok) {
                alert('Order Placed Successfully!');
                clearCart();
                router.push('/tracking');
            } else {
                const data = await res.json();
                alert(data.msg || 'Order Failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <Link href="/" className="primary-btn">Go Shopping</Link>
            </div>
        );
    }

    return (
        <div className="pb-24 min-h-screen bg-white dark:bg-black p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/" className="bg-gray-100 p-3 rounded-full">
                    <FaArrowLeft />
                </Link>
                <h1 className="text-xl font-bold">Checkout</h1>
            </div>

            {/* Delivery Address */}
            <div className="mb-6">
                <h2 className="font-bold mb-2">Delivery To</h2>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <div className="bg-[var(--primary)] p-3 rounded-full text-black">
                        <FaMapMarkerAlt />
                    </div>
                    <div>
                        <h3 className="font-bold">Home</h3>
                        <p className="text-sm text-gray-500">Imamganj, Dhaka-1211</p>
                    </div>
                    <button className="text-[var(--primary)] font-bold ml-auto text-sm">Change</button>
                </div>
            </div>

            {/* Cart Items */}
            <div className="mb-6 space-y-4">
                {cart.map(item => (
                    <div key={item._id} className="flex gap-4 items-center bg-white dark:bg-gray-900 shadow-sm p-4 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                            🍕
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-[var(--primary)] font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => removeFromCart(item._id)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">-</button>
                            <span className="font-bold">{item.quantity}</span>
                            <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold" disabled>+</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
