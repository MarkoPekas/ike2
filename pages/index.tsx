import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import graphql from '../components/graphql'
import Card from '../components/Card'

export const getStaticProps = async () => {
  const menu = await graphql(`{
    kategorije {
      data {
        attributes {
          json
        }
      }
    }
  }`)
  return {
    props: {
      menu: menu.data.data.kategorije.data.attributes.json
    },
    revalidate: 60 * 60 * 24
  }
}

const fetchPosts = async (from: number) => {
  return await graphql(`{
    posts (pagination: {
      start: ${from},
      limit: 50
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

const Home: NextPage = (props: any) => {
  const router = useRouter()
  const routerProps = router.query.id
  const [posts, setPosts] = useState<any>([])
  useEffect(() => {
    fetchPosts(0).then(res => {
      setPosts(res.data.data.posts.data)
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (Math.round((window.innerHeight + document.documentElement.scrollTop) / 10) !== Math.round((document.documentElement.offsetHeight) / 10)) return;
      fetchPosts(posts.length).then((data) => {
        setPosts([...posts, ...data?.data?.data?.posts?.data]);
      })
    }
    // create an event listener to check if bottom of page was reached
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posts])


  return (
    <div>
      <div className=' text-gray-900 p-4 flex h-[80vh] justify-center flex-col items-center'>
        <p className='text-2xl font-semibold'>eDuhovnost</p>
        <div className='h-px w-full max-w-lg bg-gray-900 mt-4 mb-8'></div>
        <div className='space-y-6 w-full max-w-xs'>
          {/* <MenuItem title='Svjedocanstva' icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 8a3 3 0 0 1 0 6" />
              <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
              <path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
            </svg>} href='/svjedocanstva' /> */}
          <MenuLoop initial data={{
            subcategories: props.menu
          }} />
          {/* <div className='space-y-4'>
              <MenuItem 
              active={routerProps=='duhovne-obnove'}
              title='Duhovne Obnove' icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 21h4v-9h5v-4h-5v-5h-4v5h-5v4h5z" />
              </svg>} href='/duhovne-obnove' />
              <MenuItem 
              active={routerProps=='duhovne-obnove,marijanski-zavjet-za-domovinu'}
              child title='Marijanski Zavjet Za Domovinu' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>} href='/duhovne-obnove/marijanski-zavjet-za-domovinu' />
            </div>
            <div className='space-y-4'>
              <MenuItem 
              active={routerProps=='duhovni-tecajevi'}
              title='Duhovni Tecajevi' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-lighthouse" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 3l2 3l2 15h-8l2 -15z" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <path d="M3 11l2 -2l-2 -2" />
                <path d="M21 11l-2 -2l2 -2" />
              </svg>} href='/duhovni-tecajevi' />
              <MenuItem
              active={routerProps=='duhovni-tecajevi,lectio-divina'}
              child title='Lectio divina' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-flare" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="2" />
                <path d="M3 12h4m5 -9v4m5 5h4m-9 5v4m-4.5 -13.5l1 1m8 -1l-1 1m0 7l1 1m-8 -1l-1 1" />
              </svg>} href='/duhovni-tecajevi/lectio-divina' />
              <MenuItem
              active={routerProps=='duhovni-tecajevi,duhovne-vjezbe'}
              child title='Duhovne vježbe' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brightness-half" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 9a3 3 0 0 0 0 6v-6z" />
                <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z" />
              </svg>} href='/duhovni-tecajevi/duhovne-vjezbe' />
            </div>
            <div className='space-y-4'>
              <MenuItem 
              active={routerProps=='poboznosti'}
              title='Poboznosti' icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="5" r="1" />
                <path d="M7 20h8l-4 -4v-7l4 3l2 -2" />
              </svg>} href='/poboznosti' />
              <MenuItem 
              active={routerProps=='poboznosti,komentar-dnevnog-evandelja'}
              child title='Komentar dnevnog evanđelja' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-notebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                <line x1="13" y1="8" x2="15" y2="8" />
                <line x1="13" y1="12" x2="15" y2="12" />
              </svg>} href='/poboznosti/komentar-dnevnog-evandelja' />
              <MenuItem 
              active={routerProps=='poboznosti,krizni-put'}
              child title='Križni put' icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-route" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
              </svg>} href='/poboznosti/krizni-put' />
            </div> */}
        </div>
      </div>
      <div className='p-4'>
        <h1 className='text-xl font-medium'>Najnovije</h1>
        {
          posts.map((item: any, i: number) => {
            return (
              <Card key={i + item.attributes.Naslov} youtubeUrl={item.attributes.youtubeUrl} category={item.attributes.podkategorija} title={item.attributes.Naslov} description={item.attributes.opis} />
            )
          })
        }
      </div>
    </div>
  )
}


interface MenuItemProps {
  title: string
  href: string
  icon: JSX.Element
  child?: boolean
  active?: boolean
}

const MenuItem = ({ title, icon, href, child, active }: MenuItemProps) => {
  const [hover, setHover] = useState(active)
  return (
    <Link href={href}>
      <motion.a
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex cursor-pointer items-center transition-all ${hover ? 'text-gray-500' : 'text-gray-400'} ${child && 'ml-4'}`}>
        <div className={`h-6 mr-4 ${hover ? 'w-1 bg-orange-500' : 'w-0 bg-none'} transition-all`}></div>
        {icon}
        <p className='ml-2 font-medium'>{title}</p>
      </motion.a>
    </Link>
  )
}

const MenuLoop = ({ data, ...props }: any) => {
  const [open, setOpen] = useState(false)
  const initial = (props.initial) ? {} : {
    maxHeight: 24,
  }
  return (
    <motion.a
      onClick={(e) => {
        e.stopPropagation()
        setOpen(!open)
      }}
      initial={initial}
      href={!data.subcategories ? `/category/${data.id}` : undefined}
      animate={
        props.initial ? initial :
          (open) ? { maxHeight: 100 } : initial}
      className='pl-4 overflow-hidden block'>
      <div className='flex justify-between'>
        {data.name}
        {(!props.initial && data.subcategories) && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>}
      </div>
      {data.subcategories?.map((item: any, i: number) => (
        <MenuLoop data={item} key={i} />
      ))}
    </motion.a>
  )
}

export default Home
