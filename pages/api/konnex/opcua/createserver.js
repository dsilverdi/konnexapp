import {getAccessToken, getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
  
export default withApiAuthRequired(async function createServer(req, res) {
    const {accessToken} = await getAccessToken(req,res)
    // const session = await getSession(req, res);
    // const accessToken = session?.idToken;
    
    try{
        const response = await fetch(`http://localhost:9000/uaserver`, {
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
    
});