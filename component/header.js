import Image from 'next/image';
import { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import styles from '../styles/Comp.module.css'

export default function Header(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);
    
    return (
        <div className={styles.header}>
                <p>{user?user.name:"Personal"}</p>
                <div className={styles.useravatar}>
                    <Image src="/user-avatar.png" alt="User Avatar" width={25} height={25}/>
                </div>
        </div>
    )
}