export default async function getServerList(req, res) {
    try{
        const response = await fetch(`http://localhost:9000/uaserver`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`   
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    }catch(err){
        console.log(err)
    }
    
};