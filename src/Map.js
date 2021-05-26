import { useEffect } from "react";

function Map(){
    var myHeader = new Headers();
    myHeader.set('X-Found-Cluster','f4628e7a9a474da3b41c0b82aff9bc07');

    useEffect(()=>{
        fetch("https://i-o-optimized-deployment-68fb8b.kb.us-west1.gcp.cloud.es.io:9243/app/dashboards#/view/8bb9c0f0-bc0f-11eb-ac88-5fa17037be89?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Covid%20',viewMode:view)")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
        })
    },[])

    return (
        <div className = "map">
            <iframe src="https://i-o-optimized-deployment-68fb8b.kb.us-west1.gcp.cloud.es.io:9243/goto/08ecf580f1421c0e110667640008cf00" height="600" width="800"></iframe>
        </div>
    )
}

export default Map;