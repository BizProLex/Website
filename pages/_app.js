import '@/styles/globals.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BizProLex Legal — UAE Legal Consultancy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BizProLex Legal — Specialised Legal Consultancy in the UAE" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 text-justify">{/* offset for fixed navbar */}
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}