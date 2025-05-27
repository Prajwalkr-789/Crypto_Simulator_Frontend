'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type NewsItem = {
    id: string;
    title: string;
    body: string;
    url: string;
    imageurl: string;
    source: string;
    published_on: number;
};

const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
                setNews(response.data.Data.slice(0, 9));
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="p-6 sm:p-8 bg-black text-white min-h-screen">
            <h1 className="text-center text-4xl font-semibold mb-8 mt-14 bg-clip-text text-transparent bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-300">
                Crypto News
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {news.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className="rounded-lg overflow-hidden shadow-lg bg-zinc-900 border border-gray-700 transition-transform transform hover:scale-[1.03] duration-300"
                    >
                        <img
                            src={item.imageurl}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-100">
                                {item.title.length > 60 ? `${item.title.substring(0, 60)}...` : item.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 flex-grow">
                                {item.body.length > 100 ? `${item.body.substring(0, 100)}...` : item.body}
                            </p>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-green-400 hover:text-green-300 font-semibold transition duration-200 self-start"
                            >
                                Read More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
