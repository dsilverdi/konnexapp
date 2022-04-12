import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../component/layout";
import styles from "../../styles/App.module.css"

export default function CreateServer(){
    const router = useRouter();

    const handleCreate = async (e) =>{
        e.preventDefault()
        const { name, serverport } = e.target.elements;
        
        const payload = {
            name: name.value,
            port: parseInt(serverport.value)
        }

        const url = "/api/konnex/opcua/createserver"
        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await res.json();

            console.log(data)

            if (data.message == "Error"){
                alert("gagal membuat server", data.data)
            }else{
                alert("Sukses Membuat Server")
                router.push('/opcua-server')
            }
        }catch(err){
            alert(err)  
        }
    }

    return (
        <Layout>
             <div className={styles.container}>
                <Link href="/opcua-server"><h3>&#8636;	Back</h3></Link>
                <h1>Create New OPC UA Server</h1>
                <form onSubmit={handleCreate}>
                    <label>Nama OPCUA Server</label>
                    <input name="name" type="name" placeholder="Nama Server" />
                    
                    <label>Server Port</label>
                    <input name="serverport" type="number" placeholder="Server Uri" />
                    <br/>

                    <button type="submit">Create New Server</button>
                </form>
            </div>
        </Layout>
    )
}