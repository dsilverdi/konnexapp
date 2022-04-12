import {getAccessToken, getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
  
export default withApiAuthRequired(async function getClientConfig(req, res) {
    const {accessToken} = await getAccessToken(req,res)
    // const session = await getSession(req, res);
    // const accessToken = session?.idToken;

    try{
        const response = await fetch(`http://localhost:8000/client`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`   
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    }catch(err){
        console.log(err)
    }
    
});