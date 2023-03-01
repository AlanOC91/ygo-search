const siteUrl = 'https://ygosearch.io';

export default function SEO({
    title = 'YGOSearch - Instant Yu-Gi-Oh! Card Search',
    description = 'An instant Yu-Gi-Oh! Card Search App from YGOPRODeck!',
    ogImgUrl = 'https://www.ygosearch.io/ygoprodeck.png',
    ogUrl = siteUrl,
    }) {
    return (
        <>
            <title key="title">{title}</title>
            <meta key="description" name="description" content={description} />
            <meta key="og:type" property="og:type" content="website"  />
            <meta key="og:title" property="og:title" content={title} />
            <meta key="og:description" property="og:description" content={description} />
            <meta key="og:image" property="og:image" content={ogImgUrl} />
            <meta key="og:url" property="og:url" content={ogUrl} />
            <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
            <meta key="twitter:site" property="twitter:site" content="@YGOPRODeck" />
        </>
    );
}