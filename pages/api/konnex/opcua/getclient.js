export default async function getClient(req, res) {
    const id = req.query.id
    try{
        const response = await fetch(`http://localhost:8000/client?id=${id}`, {
            method: 'GET',
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