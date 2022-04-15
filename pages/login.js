import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Auth.module.css'
import { userService } from '../services/user.service';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault()
        const { username, password } = e.target.elements;
        
        const payload = {
            username: username.value,
            password: password.value
        }

        try{
            await userService.login(payload)
            alert("sukses login akun")
            router.push('/')
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        if (userService.userValue) {
            router.push('/');
        }
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="Konnex Logo" width="150px" height="45px" />
                </div>

                <form onSubmit={handleLogin}>
                    <p>Masuk Akun Konnex untuk Memulai Menggunakan Platform IoT</p>

                    <label>Username</label>
                    <input name="username" type="name" placeholder="Username" />
                    
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" />
                    <br/>

                    <button type="submit">Masuk</button>
                </form>
                <p className={styles.bottom}>Belum Punya Akun ? <span><Link href="/signup">Daftar</Link></span></p>
            </div>
        </div>
    )
}