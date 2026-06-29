import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types'; // Assuming Post type is defined in src/types/index.ts

// This function simulates fetching the latest blog posts.
// In a real production environment, this would fetch data from your API routes
// (e.g., /api/posts) or directly from the database using Prisma in a Server Component.
async function getLatestPosts(): Promise<Post[]> {
  // Example of fetching from an API route (uncomment and adjust if needed):
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
  //   next: { revalidate: 3600 } // Revalidate data every hour
  // });
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch posts');
  // }
  // return res.json();

  // For now, returning mock data based on the DB schema for Post
  return [
    {
      id: 1,
      title: 'Our New Summer Specials Are Here!',
      slug: 'summer-specials',
      content: 'Dive into our refreshing new menu items perfect for the summer heat! From iced lattes to light salads, we have something for everyone.',
      authorId: 1,
    },
    {
      id: 2,
      title: 'Ayaan Cafe Celebrates 5 Years of Community!',
      slug: '5-years-celebration',
      content: 'Join us in celebrating five wonderful years of serving our beloved community. Special discounts and events all month long!',
      authorId: 1,
    },
  ];
}

export default async function HomePage() {
  const latestPosts = await getLatestPosts(); // Data fetching happens on the server

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-8 max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold mb-4 leading-tight">Welcome to Ayaan Cafe</h1>
          <p className="text-2xl mb-8 font-light">Experience the finest coffee, delicious meals, and a cozy atmosphere that feels like home.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/menu" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-lg">
              View Our Menu
            </Link>
            <Link href="/order" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-lg">
              Order Online
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-5xl font-bold mb-8 text-primary-800">Our Story</h2>
        <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-700 leading-relaxed">
          Ayaan Cafe was born from a simple dream: to create a haven where exceptional coffee meets wholesome, delicious food. We pride ourselves on sourcing the finest ingredients and crafting every dish and drink with passion. More than just a cafe, we are a community hub, a place for connection, relaxation, and memorable moments.
        </p>
        <Link href="/about" className="text-primary-600 hover:text-primary-800 hover:underline font-semibold text-lg transition duration-300">
          Read More About Us &rarr;
        </Link>
      </section>

      {/* Featured Menu Items */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-primary-800">Our Specialties</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <Image src="/images/coffee-icon.png" alt="Coffee Icon" width={80} height={80} className="mx-auto mb-5" />
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">Espresso Delights</h3>
              <p className="text-gray-700 mb-6">Hand-crafted coffee beverages made with ethically sourced, premium beans. From classic lattes to unique seasonal blends.</p>
              <Link href="/menu#coffee" className="mt-4 inline-block text-secondary-600 hover:text-secondary-800 hover:underline font-semibold">
                Explore Coffee
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <Image src="/images/sandwich-icon.png" alt="Sandwich Icon" width={80} height={80} className="mx-auto mb-5" />
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">Gourmet Sandwiches</h3>
              <p className="text-gray-700 mb-6">Freshly baked artisan bread filled with premium, locally sourced ingredients for a perfect lunch or light dinner.</p>
              <Link href="/menu#food" className="mt-4 inline-block text-secondary-600 hover:text-secondary-800 hover:underline font-semibold">
                Explore Food
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <Image src="/images/dessert-icon.png" alt="Dessert Icon" width={80} height={80} className="mx-auto mb-5" />
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">Sweet Treats</h3>
              <p className="text-gray-700 mb-6">Indulge in our exquisite selection of pastries, cakes, and desserts, baked fresh daily to satisfy your sweet cravings.</p>
              <Link href="/menu#desserts" className="mt-4 inline-block text-secondary-600 hover:text-secondary-800 hover:underline font-semibold">
                Explore Desserts
              </Link>
            </div>
          </div>
          <Link href="/menu" className="mt-16 inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Call to Action: Order & Reserve */}
      <section className="py-20 px-4 bg-primary-700 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">Ready to Indulge?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto font-light">
            Whether you're craving a quick bite or planning a special gathering, Ayaan Cafe has you covered. Order online for convenience or reserve a table for a delightful dine-in experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Link href="/order" className="bg-white text-primary-700 hover:bg-gray-200 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl">
              Order Online
            </Link>
            <Link href="/reserve" className="bg-white text-primary-700 hover:bg-gray-200 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog/News */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-primary-800">Latest News & Blog</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">{post.title}</h3>
              <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{post.content}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary-600 hover:text-primary-800 hover:underline font-semibold text-lg transition duration-300">
                Read More &rarr;
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/blog" className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl">
            View All Blog Posts
          </Link>
        </div>
      </section>

      {/* Contact & Location Snippet */}
      <section className="bg-gray-100 py-20 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8 text-primary-800">Visit Us</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-700 leading-relaxed">
            Find Ayaan Cafe nestled in the vibrant heart of the city. We're open daily, ready to serve you fresh coffee, delicious meals, and a warm smile. Check our contact page for detailed directions and opening hours.
          </p>
          <Link href="/contact" className="text-primary-600 hover:text-primary-800 hover:underline font-semibold text-lg transition duration-300">
            Get Directions & Contact Info &rarr;
          </Link>
        </div>
      </section>

      {/* Note: A global Footer component would typically be rendered via a layout.tsx */}
    </div>
  );
}
