import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../component/layout";
import { userService } from "../services/user.service";
import styles from "../styles/App.module.css"

export default function OpcuaClient(){
    const [client, setClient] = useState([])
    const [loading, setLoading] = useState(false) 
    const router = useRouter()

    const renderClients = (client) => {
        const handlePush = (id) =>{
            router.push('/opcua-client/'+id)
        }

        return (
                client.map((client,index)=>(
                    <div key={index} className={styles.card} onClick={e => {handlePush(client.id)}}>
                        <h2>{client.name}</h2>
                        <p><span>opcua-client</span></p>
                        <p>{client.url}</p>
                    </div>
                )) 
        )
    }

    const GetClient = async () => {
        const user = userService.userValue
        
        try{
            setLoading(true)
            const response = await fetch(`http://localhost:8000/client`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${user.token}`  
            },
            });
            const data = await response.json();
            
            setClient(data.data)
            setLoading(false)
        }catch(err){
            alert(err)  
        }
    }

    useEffect(()=>{
        // const token = getToken();
        GetClient();              
    }, [])

    return (
        <Layout>
            <div className={styles.container}>
                <h1>OPC UA Client</h1>
                <p>Browse, Read, And Monitor your OPC UA Server</p>

                <Link href='/opcua-client/create'>
                    <button className={styles.primary}> Create New Client</button>
                </Link>

                <div className={styles.grid}>
                    {loading?<div className={styles.norender}>Fetching Data ...Loading</div>:null}
                    {client != null ?  renderClients(client):
                    
                    <div className={styles.norender}>No Data Provided</div>}      
                </div>
            </div>            
        </Layout>
    )
}
