import Link from "next/link"

const Home = () => {
    return (
        <div>
            <h1>Movies Home</h1>
            <Link href="/movies/popular-movies">
                <a>Popular Movies</a>
            </Link>
        </div>
    )
}

export default Home
