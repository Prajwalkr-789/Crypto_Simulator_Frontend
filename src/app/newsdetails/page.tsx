"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const NewsDetails = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "No Title";
    const image = searchParams.get("image") || "";
    const body = searchParams.get("body") || "No content available.";
    const url = searchParams.get("url") || "#";
    const source = searchParams.get("source") || "Unknown";

    return (
        <div className="p-6 bg-zinc-900 text-white min-h-screen">
            <Link href="/news" className="text-green-400 hover:text-green-300 font-semibold mb-4 inline-block">
                ← Back to News
            </Link>

            <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
                <img src={image} alt={title} className="w-full h-60 object-cover rounded-lg mb-4" />

                <h1 className="text-3xl font-bold mb-4">{title}</h1>

                <p className="text-gray-400 text-sm mb-4">Source: {source}</p>

                <p className="text-lg text-gray-300">{body}</p>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-green-400 hover:text-green-300 font-semibold transition duration-200"
                >
                    Read Full Article →
                </a>
            </div>
        </div>
    );
};

export default NewsDetails;
