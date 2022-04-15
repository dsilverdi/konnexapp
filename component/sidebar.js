import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userService } from '../services/user.service';
import styles from '../styles/Comp.module.css'

export default function SideBar() {
    const router = useRouter()
    const activeLink = (url, pathname) => pathname === url ? styles.activeLink : "";
   
    function logout() {
        if (confirm('Logout Akun?')){
            userService.logout();
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src="/logo.png" alt="Konnex Logo" width="150px" height="45px" />
            </div>
            
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

                <li>
                    <a onClick={logout}>Logout</a>
                </li>
                

            </ul>

            
        </div>
    )
}