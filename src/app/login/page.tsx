'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-8">
            <div className="max-w-md mx-auto">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-8">
                    <FaArrowLeft /> Back
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
                    <p className="text-gray-500">Sign in to continue ordering</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl mb-6">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full bg-white dark:bg-gray-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full bg-white dark:bg-gray-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link href="/forgot-password" className="text-[var(--primary)] text-sm font-medium">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--primary)] text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[var(--primary)] font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Decorative Element */}
                <div className="mt-12 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[var(--primary)] rounded-full opacity-20 blur-2xl"></div>
                </div>
            </div>
        </div>
    );
}
