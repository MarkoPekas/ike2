import { useEffect, useState } from "react";
import Card from "../../components/Card";
import graphql from "../../components/graphql";
import Nav from "../../components/Nav";

const Category = () => {
    const [posts, setPosts] = useState<any>([]);
    const fetchPosts = async (from: number) => {
        return await graphql(`{
          posts (pagination: {
            start: ${from},
            limit: 100
          }) {
            data {
              attributes {
                Naslov
                youtubeUrl
                opis
                podkategorija
              }
            }
          }
        }`)
      }
    useEffect(() => {
        fetchPosts(0).then((data) => {
            setPosts(data?.data?.data?.posts?.data);
        })
    }, [])

    // if scrolled to bottom, fetch more posts
    useEffect(() => {
        const handleScroll = () => {
            if (Math.round((window.innerHeight + document.documentElement.scrollTop)/10) !== Math.round((document.documentElement.offsetHeight)/10)) return;
            fetchPosts(posts.length).then((data) => {
                setPosts([...posts, ...data?.data?.data?.posts?.data]);
            })
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posts])

    return (
        <div>
            <div className="mx-auto max-w-md w-full p-4 pb-20">
                {posts.map((item: any, i: number) => (<Card key={i} youtubeUrl={item.attributes.youtubeUrl} category={item.attributes.podkategorija} title={item.attributes.Naslov} description={item.attributes.opis} />))}
            </div>
            <Nav />
        </div>
    )
}

export default Category