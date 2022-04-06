import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Comp.module.css'

export default function SideBar() {
    const router = useRouter()
    const activeLink = (url, pathname) => pathname === url ? styles.activeLink : "";
    // const {logout} = useUserAuth();

    // const handleLogout = async ()=>{
    //     try {
    //         logout()
    //         router.push('/login')
    //     }catch (error) {
    //         alert(error)
    //     }
        
    // }

    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <Link href="/">
                        <a className={activeLink("/", router.pathname)}>
                            Getting Started
                        </a>
                    </Link>
                </li>

                <li>
                    <Link href="/opcua-client">
                        <a className={activeLink("/opcua-client", router.pathname)}>
                            OPC UA Client
                        </a>
                    </Link>
                </li>

                <li>
                    <Link href="/opcua-server">
                        <a className={activeLink("/opcua-server", router.pathname)}>
                            OPC UA Server
                        </a>
                    </Link>
                </li>


                {/* <li>
                    <button onClick={handleLogout}>Log Out</button>
                </li> */}

            </ul>

            
        </div>
    )
}