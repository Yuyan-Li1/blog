import Link from "next/link";
import {useEffect, useState} from "react";
import {marked} from "marked";

export default function Post({post}) {
    const [time, setTime] = useState(post.frontmatter.date)
    useEffect(() => {
        setTime(new Date(post.frontmatter.date).toLocaleTimeString() + ", " + new Date(post.frontmatter.date).toLocaleDateString())
    }, [post.frontmatter.date])
    return (
        <div class='card'>
            <Link href={`/blog/${post.slug}`}>
                <a>
                    <h2>{post.frontmatter.title}</h2>
                </a>
            </Link>
            <div className='post-time'>
                Posted at {time}
            </div>
            <div className='post-body'>
                <div dangerouslySetInnerHTML={{__html: marked(post.content)}}/>
            </div>
        </div>

    )
}