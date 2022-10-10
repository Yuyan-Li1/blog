import fs from "fs";
import {Feed} from "feed";
import matter from "gray-matter";
import {sortByDate} from "./index";
import path from "path";

export default function generateRSSFeed() {
    const posts = getAllPosts();
    const siteURL = 'https://yuyanli.dev';
    const date = new Date();
    const author = {
        name: 'Yuyan Li',
        email: 'blog@yuyanli.dev',
        link: 'https://yuyanli.dev'
    }
    const feed = new Feed({
        title: 'Yuyan Li\'s blog',
        description: 'Yuyan Li\'s blog',
        id: siteURL,
        link: siteURL,
        image: 'https://yuyanli.dev/favicon.ico',
        favicon: 'https://yuyanli.dev/favicon.ico',
        copyright: `All rights reserved ${date.getFullYear()}, Yuyan Li`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/feed.xml`,  // xml format
            json: `${siteURL}/rss/feed.json`,// json fromat
        },
        author,
    });
    posts.forEach((post) => {
        const url = `${siteURL}/blog/${post.slug}`;
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            content: post.content,
            author: [author],
            contributor: [author],
            date: new Date(post.frontmatter.date),
        });
    });

    fs.mkdirSync("./public/rss", {recursive: true});
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());

}

function getAllPosts() {
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '')
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        const {data: frontmatter, content} = matter(markdownWithMeta)
        return {
            slug,
            frontmatter,
            content
        }
    })
    return posts.sort(sortByDate)
}