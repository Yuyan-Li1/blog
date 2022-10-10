import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className='container'>
                <Link href="/" passHref>
                    <a><h1 className='site-name'>Yuyan Li&apos;s blog</h1></a>
                </Link>
                <nav className='nav'>
                    <ul>
                        <Link href="/"><a>
                            <li>Home</li>
                        </a></Link>
                        <Link href="/about"><a>
                            <li>About</li>
                        </a></Link>
                        <Link href="/rss.xml"><a>
                            <li>RSS</li>
                        </a></Link>
                    </ul>
                </nav>
            </div>

        </header>
    )
}