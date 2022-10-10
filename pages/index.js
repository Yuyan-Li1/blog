import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from "../components/Post";
import {sortByDate} from "../utils";

export default function Home({posts}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Yuyan Li&apos;s blog</title>

            </Head>
            <div className="posts">
                {posts.map((post, index) => (
                    <Post key={index} post={post}/>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
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
    console.log(posts)
    return {
        props: {
            posts: posts.sort(sortByDate)
        },
    }
}