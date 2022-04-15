import { style } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../component/layout";
import TreeStructure from "../../component/treestruct";
import styles from "../../styles/App.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { w3cwebsocket as W3CWebSocket } from "websocket";


export default function Client(){
    // const [loading, setLoading] = useState(true);
    const [node, setNode] = useState({})
    const [logging, setLogging] = useState([])
    const [loading, setLoading] = useState(true)
    const [client, setClient] = useState()
    const [MySocket, setMySocket] = useState()
    const router = useRouter()
    const {id} = router.query

    const RenderInfo = () =>{
        if (node) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th key="1">Parameter</th>
                            <th key="2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key = "1">
                            <td><strong>NodeID</strong></td>
                            <td>{node.node_id}</td>
                        </tr>
                        
                        <tr key = "2">
                            <td><strong>BrowseName</strong></td>
                            <td>{node.browse_name}</td>
                        </tr>
                        
                        <tr key = "3">
                            <td><strong>Value</strong></td>
                            <td><pre>{JSON.stringify(node.value,null,2)}</pre></td>
                        </tr>
                        
                        <tr key = "4">
                            <td><strong>Status Code</strong></td>
                            <td><pre>{JSON.stringify(node.status_code,null,2)}</pre></td>
                        </tr>

                        <tr key = "5">
                            <td><strong>Timestamp</strong></td>
                            <td>{node.timestamp ? node.timestamp.substring(0, 10) : null}</td>
                        </tr>
                        

                    </tbody>
                </table>
            )
        }
    }

    const handleMonitor = () =>{
        if (MySocket != null) {
            setLogging([...logging, `Disconnecting Socket`])
            MySocket.close();
        }
        setLogging([...logging, `Monitoring ${node.browse_name}`])
        const client = new W3CWebSocket(`ws://localhost:8000/client/monitor?id=${id}&node=${node.node_id}`);

        setMySocket(client);

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        
        client.onmessage = (message) => {
            console.log(message);
            const dataval = message.data;
            const timestamp = message.timeStamp;
            setLogging((prevMessages) => [...prevMessages, `Data: ${dataval} | timestamp: ${timestamp}`])
        };
    }

    const handleDelete = async () => {
        if (confirm('Yakin ingin menghapus channel ini?')){
            const url = `/api/konnex/opcua/deleteclient?id=${id}`
            try{
                const res = await fetch(url);
                const data = await res.json();
                console.log(data)
                router.push('/opcua-client')
            }catch(err){
                alert(err)  
            }
        }        
    }

    const getClientInfo = async () =>{
        const url = `/api/konnex/opcua/getclient?id=${id}`
       
        try{
            setLoading(true)
            const res = await fetch(url);
            const data = await res.json();
            // setClient(data.data)
            setClient(data.data)
            setLoading(false)
        }catch(err){
            alert(err)  
        }
    }
    
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    useEffect(()=>{
        setLogging(["Monitor OPC-UA node"])

        if (id) {
            getClientInfo()    
        }
        
    },[router.isReady])

    return (
        <Layout>
            <div className={styles.container}>
                <Link href="/opcua-client"><h3>&#8636;	Back</h3></Link>
                {loading?null:(
                    <>
                        <h1>{client.name}</h1>
                        <p><span>{client.url}</span></p>
                    </>
                )}                

                <button className={styles.warn} onClick={handleDelete}>
                    <DeleteIcon/>
                    <p>Delete Client</p>
                </button>

                <div className={styles.contentwrapper}>
                    <div className={styles.canvastree}>
                        <TreeStructure id="RootFolder" name="RootFolder" urlid={id} setNode={setNode}/>
                    </div>
                    <div className={styles.canvasread}>
                    {node ? RenderInfo() : null}
                    </div>
                </div>
                
                <button className={styles.primary} onClick={handleMonitor}>Monitor {node ? node.browse_name : null}</button>
                <div className={styles.canvasmonitor}>                    
                    <div className={styles.monitor}>
                        <ul>
                            {
                                logging.map((l, index)=>{
                                    const date = new Date()
                                    return (
                                        <li key={index}><span>[KONNEX OPCUA {date.toDateString()}]</span> {l}</li>
                                    )                                    
                                })
                            }
                            <AlwaysScrollToBottom/>
                        </ul>                        
                    </div>
                </div>
                
                {/* {loading ? <div className={styles.norender}>No Data Provided</div> : renderData()} */}
            </div>      
        </Layout>    
    )
}