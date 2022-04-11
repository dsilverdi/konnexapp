import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../component/layout";
import styles from "../styles/App.module.css"

export default function OpcuaServer(){
    const [server, setServer] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const GetServer = async () => {
        const url = "api/konnex/opcua/getserverlist"
        try{
            setLoading(true)
            const res = await fetch(url);
            const data = await res.json();
            setServer(data.data)
            setLoading(false)
        }catch(err){
            alert(err)  
        }
    }

    const renderServer = (servers) => {
        const handlePush = (id) =>{
            router.push('/opcua-server/'+id)
        }

        return (
                servers.map((server,index)=>(
                    <div key={index} className={styles.card} onClick={e => {handlePush(server.server_id)}}>
                        <h2>{server.server_name}</h2>
                        <p><span>opcua-server</span></p>
                        <p>{server.endpoint}</p>
                    </div>
                )) 
        )
    }


    useEffect(()=>{
        // const token = getToken();
        GetServer();              
    }, [])

    return (
        <Layout>
            <div className={styles.container}>
                <h1>OPC UA Server</h1>
                <p>Create OPC UA Server, Connect Your Device, Expose it to the Internet with OPC UA Protocol</p>

                <Link href='/opcua-server/create'>
                    <button className={styles.primary}> Create New Server</button>
                </Link>

                <div className={styles.grid}>
                    {loading?<div className={styles.norender}>Fetching Data ...Loading</div>:null}
                    {server != null ?  renderServer(server):
                    
                    <div className={styles.norender}>No Data Provided</div>}      
                </div>
            </div>
        </Layout>
    )
}