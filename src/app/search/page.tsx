"use client";

import { useState } from "react";

export default function SearchPage() {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            console.log("Response:", res);

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Lỗi tìm kiếm");
            }

            setResult(data);
        } catch (err: any) {
            console.error("Search Error:", err);
            setError(err.message || "Đã xảy ra lỗi khi tìm kiếm");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Tìm kiếm User</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label className="block text-black font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black bg-white"
                            placeholder="Nhập email cần tìm..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
                    </button>
                </form>

                {result && (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-black">Kết quả:</h3>
                        <div className="bg-gray-50 p-4 rounded mt-2 text-black border border-gray-200">
                            <div className="space-y-2">
                                <p className="text-black"><span className="font-medium">ID:</span> {result.id}</p>
                                <p className="text-black"><span className="font-medium">Email:</span> {result.email}</p>
                                <p className="text-black"><span className="font-medium">Password:</span> {result.password}</p>
                                <p className="text-black"><span className="font-medium">Role:</span> {result.role}</p>
                                <p className="text-black">
                                    <span className="font-medium">Ngày tạo:</span>{' '}
                                    {new Date(result.created_at).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        timeZone: 'Asia/Ho_Chi_Minh'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}