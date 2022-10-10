import fs from 'fs'
import path from 'path'
import matter from "gray-matter";
import {marked} from "marked";
import {useEffect, useState} from "react";

export default function PostPage({
                                     frontmatter: {title, date},
                                     slug,
                                     content
                                 }) {
    const [time, setTime] = useState(date)
    useEffect(() => {
        setTime(new Date(date).toLocaleTimeString() + ", " + new Date(date).toLocaleDateString())
    }, [date])

    return (
        <div>
            {/*<Link href='/'>*/}
            {/*    <a className='btn btn-back'>Go Back</a>*/}
            {/*</Link>*/}
            <h1 className='post-title'>{title}</h1>
            <div className='post-time'>Posted at {time}</div>
            <div className='post-body'>
                <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))
    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({params: {slug}}) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
    const {data: frontmatter, content} = matter(markdownWithMeta)
    return {
        props: {
            frontmatter,
            slug,
            content
        },
    }
}
