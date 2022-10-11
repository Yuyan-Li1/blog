import Link from "next/link";
import {useEffect, useState} from "react";
import {marked} from "marked";

export default function Post({post}) {
    const [time, setTime] = useState(post.frontmatter.date)
    useEffect(() => {
        setTime(new Date(post.frontmatter.date).toLocaleTimeString() + ", " + new Date(post.frontmatter.date).toLocaleDateString())
    }, [post.frontmatter.date])
    if ('link' in post.frontmatter) {
        return (
            <div className='card'>
                <Link href={`${post.frontmatter.link}`}>
                    <a>
                        <h2 className='post-title'>{post.frontmatter.title}</h2>
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
    } else {
        return (
            <div className='card'>
                <Link href={`/blog/${post.slug}`}>
                    <a>
                        <h2 className='post-title'>{post.frontmatter.title}</h2>
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

}