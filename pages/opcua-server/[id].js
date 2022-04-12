import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import styles from "../../styles/App.module.css"

export default function Server(){
    const [server, setServer] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {id} = router.query

    const GetServer = async () => {
        const url = `/api/konnex/opcua/getserver?id=${id}`
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

    const renderServer = (server) =>{
        return (
            <div>
                <div className={styles.canvas}>
                    <div className={styles.title}>
                        <h1>{server.server_name}</h1>
                        <p>{server.server_id}</p>
                    </div>
                
                    <h3><span>{server.endpoint}</span></h3>
                    <p>Connect Device to OPC UA Server</p>

                    <Link href={`/opcua-server/${id}/device`}>
                        <button className={styles.primary}> Add New Device</button>
                    </Link>
                </div>
                

                <div className={styles.grid}>
                    {
                        server.device.map((device,index)=>{
                            if (device.type == "mqtt") {
                                return (
                                    <div key={index} className={styles.card}>
                                        <h2>{device.device_name}</h2>
                                        <p><span>mqtt</span></p>
                                        <p>HOST: {device.host} <br/>
                                        PORT: {device.port} <br/>
                                        TOPIC: {device.topic}</p>
                                    </div>
                                )
                            }
                    
                        })
                    } 
                </div>                
            </div>
        )
    }

    useEffect(()=>{
        GetServer()
    },[router.isReady])
    
    return (
        <Layout>
            <div className={styles.container}>
                <Link href="/opcua-server"><h3>&#8636;	Back</h3></Link>

                {loading?<div className={styles.norender}>Fetching Data ...Loading</div>:null}
                {server != null ?  renderServer(server):
                
                <div className={styles.norender}>No Data Provided</div>}      
            </div>
        </Layout>
    )
}