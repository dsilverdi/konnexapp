import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useState } from "react";
  
export default function TreeStructure(props){
    const [childNodes, setChildNodes] = useState();
    const [expanded, setExpanded] = useState([]);
    const urlid = props.urlid
    const nodeId = props.id

    async function fetchChildNodes(id) {
        try{
            const res = await fetch(`http://localhost:8000/client/browse?id=${urlid}&node=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',   
                },
            });

            const data = await res.json()        
            const result = data.data
            
            setChildNodes(result.map(node => 
                <TreeStructure 
                    key={node.node_id}
                    id={node.node_id} 
                    name={node.browse_name} 
                    urlid={urlid}
                    setNode={props.setNode}
                />))

        }catch(err){
            console.log(err)
        }
    }

    async function fetchNodeInfo(id) {
        try{
            const res = await fetch(`http://localhost:8000/client/read?id=${urlid}&node=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',   
                },
            });

            const data = await res.json()        
            const result = data.data
            
            const payload = {
                node_id: id,
                browse_name: props.name,
                value: result.value,
                status_code: result.statusCode,
                timestamp: result.serverTimestamp
            }

            props.setNode(payload)

        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (event, nodes) => {
        const expandingNodes = nodes.filter(x => !expanded.includes(x));
        setExpanded(nodes);
        if (expandingNodes[0]) {
          const childId = expandingNodes[0];
          fetchChildNodes(childId)
        //   fetchNodeInfo(childId)
        }
    };

    const handleClick = (event, nodes) => {
        fetchNodeInfo(nodes)        
    };

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            expanded={expanded}
            onNodeToggle={handleChange}
            onNodeFocus={handleClick}
        >
            <TreeItem nodeId={props.id} label={props.name}>
                {childNodes || [<div key="stub" />]}
            </TreeItem>
        </TreeView>
    )

}