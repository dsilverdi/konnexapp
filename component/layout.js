import SideBar from "./sidebar"
import styles from '../styles/Comp.module.css'
import Header from "./header"

export default function Layout({children}) {
    // const {getToken} = useUserAuth();
    // const router = useRouter();

    // useEffect(()=>{
    //     const token = getToken();
    //     if (!token) router.push('/login')
    // },[])
    
    return (
        <div className={styles.layout}>
            <SideBar/>
            <div className={styles.container}>
                <Header/>
                {children}
            </div>
        </div>
    )
}