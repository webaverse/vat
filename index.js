import * as THREE from 'three';
import metaversefile from 'metaversefile';


const {useApp, useFrame, useLoaders, usePhysics, useCleanup, useLocalPlayer, useActivate} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1'); 


export default () => {  

    const app = useApp();
    let vat = null;
    const physics = usePhysics();
    const physicsIds = [];
    (async () => {
        const u = `${baseUrl}/vat2.glb`;
        vat = await new Promise((accept, reject) => {
            const {gltfLoader} = useLoaders();
            gltfLoader.load(u, accept, function onprogress() {}, reject);
            
        });
        
        vat.scene.scale.set(0.7,0.7,0.7);
        app.add(vat.scene);
        let physicsId;
        physicsId = physics.addGeometry(vat.scene);
        physicsIds.push(physicsId)
        app.updateMatrixWorld();


    })();
    (async () => {
        const u = `${baseUrl}/ocean.glb`;
        const ocean = await new Promise((accept, reject) => {
            const {gltfLoader} = useLoaders();
            gltfLoader.load(u, accept, function onprogress() {}, reject);
            
        });
        ocean.scene.scale.set(0.7,0.7,0.7);
        app.add(ocean.scene);
        app.updateMatrixWorld();


    })();

    
    

    // useFrame(( { timeStamp } ) => {
      
    //   app.updateMatrixWorld();
    // });

    
    useCleanup(() => {
      for (const physicsId of physicsIds) {
        physics.removeGeometry(physicsId);
      }
    });

    return app;
}
