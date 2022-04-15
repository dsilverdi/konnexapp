export default async function addMqttVariable(req, res) {   
    try{
        const response = await fetch(`http://localhost:9000/uaserver/variable?type=mqtt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`   
            },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(200).json(data);
    }catch(err){
        console.log(err)
    }
    
};