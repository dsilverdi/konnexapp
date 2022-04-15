export default async function deleteClient(req, res) {
    const {accessToken} = await getAccessToken(req,res)
 
    const id = req.query.id
    try{
        const response = await fetch(`http://localhost:8000/client?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    }catch(err){
        console.log(err)
    }
    
};