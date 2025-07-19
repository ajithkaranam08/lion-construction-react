import Head from 'next/head';
import { useSelector } from 'react-redux';

const SEOHead = ({ 
  page = null, 
  title = null, 
  description = null, 
  keywords = null,
  ogImage = null,
  canonicalUrl = null,
  structuredData = null 
}) => {
  const { seoData } = useSelector((state) => state.seo);
  
  // Get page-specific SEO data or fallback to global
  const pageData = page && seoData.pages ? seoData.pages[page] : null;
  const globalData = seoData.global || {};
  
  // Use props first, then page data, then global data as fallback
  const seoTitle = title || pageData?.title || globalData.defaultTitle || 'Lion Construction';
  const seoDescription = description || pageData?.description || globalData.defaultDescription || '';
  const seoKeywords = keywords || pageData?.keywords || globalData.defaultKeywords || '';
  const seoOgImage = ogImage || pageData?.ogImage || globalData.defaultOgImage || '/img/logo.png';
  const seoCanonicalUrl = canonicalUrl || pageData?.canonicalUrl || '';
  const seoStructuredData = structuredData || pageData?.structuredData || null;
  
  const siteName = globalData.siteName || 'Lion Construction';
  const twitterHandle = globalData.twitterHandle || '@lionconstruction';
  const language = globalData.language || 'en';
  const region = globalData.region || 'IN';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content={language} />
      <meta name="geo.region" content={region} />
      
      {/* Canonical URL */}
      {seoCanonicalUrl && (
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || ''}${seoCanonicalUrl}`} />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageData?.ogTitle || seoTitle} />
      <meta property="og:description" content={pageData?.ogDescription || seoDescription} />
      <meta property="og:image" content={seoOgImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : `${language}_${region}`} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={pageData?.ogTitle || seoTitle} />
      <meta name="twitter:description" content={pageData?.ogDescription || seoDescription} />
      <meta name="twitter:image" content={seoOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/img/logo.png" />
      
      {/* Structured Data */}
      {seoStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoStructuredData)
          }}
        />
      )}
    </Head>
  );
};

export default SEOHead;