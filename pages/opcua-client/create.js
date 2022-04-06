import Link from "next/link";
import Layout from "../../component/layout";
import styles from "../../styles/App.module.css"

export default function CreateClient(){
    const handleCreate = async () =>{
        // e.preventDefault()
        // const { name, type, serveruri } = e.target.elements;
        
        // const payload = {
        //     name: name.value,
        //     type: type.value,
        //     metadata: {
        //         "server-uri":serveruri.value
        //     }
        // }

        // console.log(payload)

        // try{
        //     const res = await fetch(`http://localhost:443/channel/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token,   
        //         },
        //         body: JSON.stringify(payload),
        //     });

        //     const data = await res.json()
            
        //     console.log(data);
        //     alert("Berhasil Buat Channel Baru");

        //     router.push('/iot')
        // }catch (err){
        //     console.log(err)
        // }
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