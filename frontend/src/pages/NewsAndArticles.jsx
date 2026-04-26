import React, { useState } from 'react';
import { Calendar, Clock, User, Mail } from 'lucide-react';

export default function NewsAndArticles() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'research', name: 'Research' },
    { id: 'tips', name: 'Tips & Guides' },
    { id: 'global', name: 'Global Impact' },
    { id: 'technology', name: 'Technology' }
  ];

  const articles = [
    {
      id: 1,
      title: "The Hidden Water Footprint of Everyday Products",
      category: "research",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Discover how much water goes into producing the items we use daily, from smartphones to clothing.",
      author: "Dr. Sarah Johnson",
      url: "https://waterfootprint.org/en/resources/interactive-tools/product-water-footprint/" // Water Footprint Network resource
    },
    {
      id: 2,
      title: "10 Simple Ways to Reduce Your Water Footprint",
      category: "tips",
      date: "March 12, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Practical tips and strategies to minimize your water consumption at home and in daily life.",
      author: "Water Conservation Expert",
      url: "https://www.nationalgeographic.com/environment/article/ways-to-save-water-at-home" // National Geographic tips
    },
    {
      id: 3,
      title: "Global Water Crisis: A Call to Action",
      category: "global",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "An in-depth look at the worldwide water scarcity challenges and potential solutions.",
      author: "Environmental Journalist",
      url: "https://www.unwater.org/water-facts/scarcity/" // UN Water overview
    },
    {
      id: 4,
      title: "Smart Water Management Technologies",
      category: "technology",
      date: "March 8, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Exploring innovative technologies that are revolutionizing water conservation and management.",
      author: "Tech Innovation Writer",
      url: "https://www.weforum.org/agenda/2021/03/water-technology-innovation/" // WEF piece on water tech
    }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    // placeholder: integrate with your subscription API
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Water Footprint — News & Articles</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Stay informed about water conservation, sustainability, and actionable tips to reduce your footprint.
          </p>
        </header>

        <section className="mb-6">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white shadow'
                    : 'bg-white text-gray-700 border border-gray-200 hover:shadow-sm'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {filteredArticles.map(article => (
            <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.01] transition-transform flex flex-col">
              <div className="relative h-48 sm:h-56 shrink-0">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-y-2 gap-x-3 mb-3">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-gray-400"><User className="w-3.5 h-3.5" />{article.author}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{article.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors"
                  >
                    Read More →
                  </a>
                  <button className="text-xs font-medium bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">Stay Updated</h2>
              <p className="text-sm text-gray-600 mt-1">Subscribe to our newsletter for the latest articles, tips and research.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  aria-label="Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="mt-3 md:mt-0 text-sm text-emerald-700">Thanks — check your inbox.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
