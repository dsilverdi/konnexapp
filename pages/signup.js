import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userService } from '../services/user.service';
import styles from '../styles/Auth.module.css'

export default function Register() {
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, password, password2 } = e.target.elements;

        if (password2.value !== password.value) {
            alert("Passwords do not match")
            return
        }

        const payload = {
            username: username.value,
            password: password.value
        }

        try{
           await userService.register(payload)
           alert("Sukses Daftar Akun")
           router.push('/login')
        }catch (err) {
            alert(err)
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
                <form onSubmit={handleRegister}>
                    <p>Daftarkan Akun Konnex untuk Memulai Menggunakan Platform IoT</p>
                    
                    <label>Username</label>
                    <input name="username" type="name" placeholder="Username" />
                    
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" />
                    <br/>

                    <label>Konfirmasi Password</label>
                    <input name="password2" type="password" placeholder="Password" />
                    <br/>

                    <button type="submit">Daftar</button>
                </form>
                <p className={styles.bottom}>Sudah Punya Akun ? <span><Link href="/login">Masuk</Link></span></p>
            </div>
        </div>
    )
}