import axios from "axios";

export default async function graphql(query: string) {
    return axios.post('https://sveto.themeal.me/graphql', {
        query,
    },{
        headers: {
            "authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
        },
    })
}