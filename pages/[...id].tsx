import { useRouter } from "next/router"
import { useState } from "react"
import Card from "../components/Card"
import graphql from "../components/graphql"
import Nav from "../components/Nav"

export const getServerSideProps = async (
  context: { params: { id: string[] } }
) => {
    const { id } = context.params

    // remove - and add capital letter after it
    const mainCategory = `${id[0].replace(/-([a-z])/g, (g) => g[1].toUpperCase())}s`
    const data = await graphql(`{
      duhovneObnoves (pagination: {pageSize: 100}) {
        data {
          attributes {
            podkategorija
            Naslov
            video {
              data {
                attributes {
                  url
                }
              }
            }
            youtubeUrl
            opis
          }
        }
      }
      duhovniTecajevis (pagination: {pageSize: 100}) {
        data {
          attributes {
            podkategorija
            Naslov
            video {
              data {
                attributes {
                  url
                }
              }
            }
            youtubeUrl
            opis
          }
        }
      }
      poboznostis (pagination: {pageSize: 100}) {
        data {
          attributes {
            podkategorija
            Naslov
            video {
              data {
                attributes {
                  url
                }
              }
            }
            youtubeUrl
            opis
          }
        }
      }
    }`)
    return {
        props: {
            data: data.data.data[mainCategory].data,
            id: id,
            mainCategory: mainCategory,
            subcategory: id[1]?.replaceAll('-', '_')||null
        }
    }
}


const Svjedocanstva = (props: any) => {
    const [data, setData] = useState(
      props.subcategory?
      props.data.filter((item: any) => item.attributes.podkategorija.toLowerCase() === props.subcategory.toLowerCase()):
      props.data
      )
    const router = useRouter()
    
    return (
        <div>
            <div className="mx-auto max-w-md w-full p-4 pb-20">
                {data.map((item: any, i: number) => (<Card key={i} youtubeUrl={item.attributes.youtubeUrl} category={item.attributes.podkategorija} title={item.attributes.Naslov} description={item.attributes.opis} />))}
            </div>
            <Nav id={props.id} />
        </div>
    )
}

export default Svjedocanstva