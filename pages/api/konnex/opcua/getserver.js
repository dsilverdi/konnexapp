export default async function getServer(req, res) {    
    try{
        const response = await fetch(`http://localhost:9000/uaserver?id=${req.query.id}`, {
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