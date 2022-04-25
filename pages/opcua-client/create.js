import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../component/layout";
import { userService } from "../../services/user.service";
import styles from "../../styles/App.module.css"

export default function CreateClient(){
    const router = useRouter();

    const handleCreate = async (e) =>{
        e.preventDefault()
        const { name, serveruri } = e.target.elements;
        
        const payload = {
            name: name.value,
            url: serveruri.value
        }

        const user = userService.userValue
        try{
            const response = await fetch(`http://localhost:8000/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`   
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            alert("Sukses Koneksi Client")
            router.push('/opcua-client')
        }catch(err){
            alert(err)  
        }
    }

    return (
        <Layout>
             <div className={styles.container}>
                <Link href="/opcua-client"><h3>&#8636;	Back</h3></Link>
                <h1>Create New Client Connection</h1>
                <form onSubmit={handleCreate}>
                    <label>Nama OPCUA Server</label>
                    <input name="name" type="channel" placeholder="Nama Channel" />
                    
                    {/* <label>Konektivitas</label>

                    <select name="type">
                        <option value="opcua">opcua</option>
                    </select> */}

                    <label>Server Uri</label>
                    <input name="serveruri" type="url" placeholder="Server Uri" />
                    <br/>

                    <button type="submit">Koneksikan</button>
                </form>
            </div>
        </Layout>
    )
}