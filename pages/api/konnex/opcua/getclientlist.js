
export default async function getClientConfig(req, res) {
    try{
        const response = await fetch(`http://localhost:8000/client`, {
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