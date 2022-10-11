const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const {marked} = require('marked');

const getAllPosts = () => {
    // Read the posts directory and get blog posts' filenames
    const filenames = fs.readdirSync(path.join('posts'));

    // Go through all filenames
    const posts = filenames.map((filename) => {
        const slug = filename.replace('.md', '')
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        const {data: frontmatter, content} = matter(markdownWithMeta)
        if ('link' in frontmatter) {
            return {
                title: frontmatter.title,
                date: frontmatter.date,
                content: marked(content),
                link: frontmatter.link
            }
        } else {
            return {
                title: frontmatter.title,
                date: frontmatter.date,
                content: marked(content),
                link: 'https://blog.yuyanli.dev/' + slug,
            }
        }
        ;
    });
    // Sort the blogposts by date
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getXmlItems = (blogPosts) => {
    return blogPosts
        .map((post) => {
            return `<item>
            <title>${post.title}</title>
            <link>${post.link}</link>
            <guid>${post.link}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description>${post.title}</description>
            <content type="html" xml:lang="en"><![CDATA[${post.content}]]></content>
            <dc:creator>Yuyan Li</dc:creator>
        </item>
        `;
        })
        .join(''); // Join the array of items into a single long string
};

const getRssXml = (xmlItems, latestPostDate) => {
    return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title>Yuyan Li's blog</title>
        <link>https://yuyanli.dev</link>
        <description>I'm Yuyan Li, a university student and a web developer in Sydney, NSW.</description>
        <language>en</language>
        <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
        ${xmlItems}
    </channel>
  </rss>`;
};

const postData = getAllPosts();
const xmlItems = getXmlItems(postData);
const rssXml = getRssXml(xmlItems, postData[0].date);

fs.writeFile(path.join('public', 'rss.xml'), rssXml, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('RSS feed written successfully');
    }
});