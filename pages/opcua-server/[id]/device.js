import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../component/layout";
import styles from "../../../styles/App.module.css"

export default function AddDevice(){
    const [deviceType, setDeviceType] = useState()

    const router = useRouter();
    const {id} = router.query

    const handleChange = (e) =>{
        const value = e.target.value

        if (value == 'mqtt'){
            setDeviceType('mqtt')
        }else if (value == 'modbus'){
            setDeviceType('modbus')
        }else{
            setDeviceType('')
        }
    }

    const handleCreateMQTT = async (e) =>{
        e.preventDefault()

        const {deviceName, browseName, dataType, host, port, topic} = e.target.elements;

        const payload = {
            server_id: id,
            device_name : deviceName.value,
            browse_name : browseName.value,
            data_type : dataType.value,
            host : host.value,
            port : port.value,
            topic : topic.value
        }

        console.log(payload)

        const url = "/api/konnex/opcua/addmqtt"
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
                router.push(`/opcua-server/${id}`)
            }

        }catch(err){
            alert(err)  
        }
    }

    const handleCreateModbus = () => {

    }

    const renderForm = () => {
        if (deviceType == 'mqtt'){
           return  (
            <form onSubmit={handleCreateMQTT}>
                <h2>Connect to Mqtt Device</h2>

                <label>Nama Device</label>
                <input name="deviceName" type="name" placeholder="Ex - HumiditySensor" />
           
                <label>Browse Name</label>
                <input name="browseName" placeholder="Ex - HumidityValue" />
                
                <label>Data Type</label>
                <input name="dataType" placeholder="Tipe Data" />    
                
                <label>Host</label>
                <input name="host" placeholder="Host MQTT" />

                <label>Port</label>
                <input name="port" placeholder="Port MQTT" />

                <label>Topic</label>
                <input name="topic" placeholder="Message Topic" />    
                <br/>

                <button type="submit">Create New Server</button>
            </form>
           )
        }else if (deviceType == 'modbus') {
           return  (
            <form onSubmit={handleCreateModbus}>
                <label>Nama OPCUA Server</label>
                <input name="deviceName" type="name" placeholder="Nama Server" />
           
                <label>Browse Name</label>
                <input name="browseName" type="number" placeholder="Server Uri" />
                
                <label>Data Type</label>
                <input name="dataType" type="number" placeholder="Server Uri" />    
{/*                 
                <label>Host</label>
                <input name="host" type="number" placeholder="Server Uri" />

                <label>Port</label>
                <input name="port" type="number" placeholder="Server Uri" />

                <label>Topic</label>
                <input name="topic" type="name" placeholder="Server Uri" />    
                <br/> */}

                <button type="submit">Create New Server</button>
            </form>
           )
        }
    }
    return (
        <Layout>
             <div className={styles.container}>
                <Link href={`/opcua-server/${id}`}><h3>&#8636;	Back</h3></Link>
                <h1>Add New Device</h1>
                <select name="type" onChange={(e)=>handleChange(e)}>
                        <option value="">Pilih Konektivitas</option>
                        <option value="mqtt">mqtt</option>
                        <option value="modbus">modbus</option>
                </select>
                {   
                    renderForm()
                }
            </div>
        </Layout>
    )
}