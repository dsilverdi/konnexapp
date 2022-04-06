import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import TreeStructure from "../../component/treestruct";
import styles from "../../styles/App.module.css"

export default function Client(){
    const [loading, setLoading] = useState(true);
    const [node, setNode] = useState({})
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
    // useEffect(()=>{
    //     BrowseNode(id, "RootFolder")
    // },[router.isReady])

    return (
        <Layout>
            <div className={styles.container}>
                <Link href="/opcua-client"><h3>&#8636;	Back</h3></Link>

                <div className={styles.contentwrapper}>
                    <div className={styles.canvastree}>
                        <TreeStructure id="RootFolder" name="RootFolder" urlid={id} setNode={setNode}/>
                    </div>
                    <div className={styles.canvasread}>
                    {node ? RenderInfo() : null}
                    </div>
                </div>
                
                
                {/* {loading ? <div className={styles.norender}>No Data Provided</div> : renderData()} */}
            </div>      
        </Layout>    
    )
}