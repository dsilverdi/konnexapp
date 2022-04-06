import Image from 'next/image';
import { useState } from 'react'
import styles from '../styles/Comp.module.css'

export default function Header(){
    const sess = null

    return (
        <div className={styles.header}>
            <h2>Konnex IoT</h2>
            <div className={styles.userdisplay}>
                <p>Personal Account</p>
                <div className={styles.useravatar}>
                    <Image src="/user-avatar.png" alt="User Avatar" width={32} height={32} />
                </div>
            </div>           
        </div>
    )
}