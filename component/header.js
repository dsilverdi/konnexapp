import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import styles from '../styles/Comp.module.css'

export default function Header(){
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div className={styles.header}>
                <p>{user.name}</p>
                <div className={styles.useravatar}>
                    <img src={user.picture} alt="User Avatar"/>
                </div>
        </div>
    )
}