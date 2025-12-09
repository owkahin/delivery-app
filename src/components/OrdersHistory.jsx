import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function OrdersHistory() {
	const { token } = useAuth();
	const router = useRouter();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (token) {
			fetchOrders();
		}
	}, [token]);

	const fetchOrders = async () => {
		try {
			const res = await fetch('http://localhost:5000/api/orders', {
				headers: {
					'x-auth-token': token
				}
			});
			const data = await res.json();
			setOrders(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen bg-[#07263A] text-white antialiased">
			<header className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
				<button className="p-2 rounded-lg bg-[#0B394D]" onClick={() => router.back()}>
					<svg
						className="w-5 h-5 text-[#FFC700]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							d="M15 18l-6-6 6-6"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<h1 className="font-semibold text-lg">Orders</h1>
				<div className="w-8" />
			</header>

			<main className="max-w-xl mx-auto px-4 pb-28 space-y-4">
				<section className="bg-white text-black rounded-2xl p-3 shadow-sm">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm text-gray-600">Past orders</div>
							<div className="font-semibold">Your order history</div>
						</div>
						<button className="bg-[#FFC700] text-black px-3 py-2 rounded-lg font-medium" onClick={() => console.log('Filter orders')}>
							Filter
						</button>
					</div>
				</section>

				<section className="space-y-3">
					{orders.length === 0 ? (
						<div className="text-center py-8 text-gray-400">No orders found</div>
					) : (
						orders.map((o) => (
							<article
								key={o._id}
								className="bg-white text-black rounded-xl overflow-hidden shadow-sm flex"
							>
								<div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-gray-200">
									<img
										src="https://picsum.photos/seed/order/200/200"
										alt="order"
										className="w-full h-full object-cover"
									/>
								</div>

								<div className="flex-1 p-3">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="font-medium">Order #{o._id.slice(-6)}</h3>
											<div className="text-sm text-gray-600 mt-1">
												{o.items.length} item{o.items.length > 1 ? "s" : ""} • {new Date(o.date).toLocaleDateString()}
											</div>
										</div>

										<div className="text-right">
											<div
												className={`text-sm ${o.status === "Delivered"
														? "text-green-600 font-semibold"
														: "text-[#FFC700] font-semibold"
													}`}
											>
												{o.status}
											</div>
											<div className="text-sm text-gray-500 mt-1">
												ETB {o.total.toFixed(2)}
											</div>
										</div>
									</div>

									<div className="mt-3 flex items-center justify-between">
										<div className="text-sm text-gray-600">
											items: {o.items.map(i => i.name).join(', ')}
										</div>
									</div>
								</div>
							</article>
						))
					)}
				</section>

				<div className="text-center text-sm text-gray-400 mt-6">
					No more orders
				</div>
			</main>
		</div>
	);
}