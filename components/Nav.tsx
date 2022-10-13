import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useState } from "react"

const Nav = (props: {id: string[]}) => {
    const [selected, setSelected] = useState("svjedocanstva")
    const router = useRouter()
    
    return (
        <nav className="fixed w-full left-0 bottom-0 h-16 bg-white">
            <div className="flex px-8 items-end h-full">
                <NavItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
                    <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0" />
                </svg>}
                onClick={() => selected==="svjedocanstva"?
                    router.push(`/?id=${props.id}`)
                    :setSelected("svjedocanstva")}
                active={selected === "svjedocanstva"} />
                <NavItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <polyline points="16 3 12 7 8 3" />
                </svg>}
                onClick={() => setSelected("uzivo")}
                active={selected === "uzivo"} />
                <NavItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />
                    <line x1="8" y1="9" x2="16" y2="9" />
                    <line x1="8" y1="13" x2="14" y2="13" />
                </svg>}
                onClick={() => setSelected("chat")}
                active={selected === "chat"} />
            </div>
        </nav>
    )
}

interface NavItemProps {
    icon: JSX.Element,
    active: boolean,
    onClick?: () => void
}

const NavItem = ({icon, active, onClick}: NavItemProps) => {
    return (
        <div onClick={onClick} className="flex-1 h-full flex justify-center items-center flex-col">
            {icon}
            <motion.div 
            animate={{
                height: active ? "4px" : "0px",
                marginTop: active ? "8px" : "0px",
                opacity: active ? 1 : -0.2
            }}
            className="w-6 h-1 bg-orange-500"></motion.div>
        </div>
    )
}

export default Nav