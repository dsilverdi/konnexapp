import SideBar from "./sidebar"
import styles from '../styles/Comp.module.css'
import { useRouter } from "next/router"
import Header from "./header"
import { useEffect } from "react";

export default function Layout({children}) {
    // const {getToken} = useUserAuth();
    // const router = useRouter();

    // useEffect(()=>{
    //     const token = getToken();
    //     if (!token) router.push('/login')
    // },[])
    
    return (
        <div>
            <Header/>
            <div className={styles.layout}>
                <SideBar/>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
            
        </div>
    )
}