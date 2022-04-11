import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../component/layout";
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

        const url = "/api/konnex/opcua/addclient"
        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await res.json();

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