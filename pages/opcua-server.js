import Link from "next/link";
import Layout from "../component/layout";
import styles from "../styles/App.module.css"

export default function OpcuaServer(){
    return (
        <Layout>
            <div className={styles.container}>
                <h1>OPC UA Server</h1>
                <p>Create OPC UA Server, Connect Your Device, Expose it to the Internet with OPC UA Protocol</p>

                <Link href='/opcua-server/create'>
                    <button className={styles.primary}> Create New Client</button>
                </Link>
            </div>
        </Layout>
    )
}