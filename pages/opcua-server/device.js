import Layout from "../../component/layout";
import styles from "../../styles/App.module.css"

export default function AddDevice(){
    const handleCreate = () =>{

    }

    return (
        <Layout>
             <div className={styles.container}>
                <Link href="/opcua-server"><h3>&#8636;	Back</h3></Link>
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

                    <button type="submit">Add Device</button>
                </form>
            </div>
        </Layout>
    )
}