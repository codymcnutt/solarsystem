var THREEx	= THREEx	|| {}


THREEx.Linkify	= function(domEvents, mesh, url, withBoundingBox){
	withBoundingBox	= withBoundingBox !== undefined ? withBoundingBox : true
	// compute geometry size
	var geometry	= mesh.geometry
	geometry.computeBoundingBox();
	var size	= new THREE.Vector3();
	size.x	= (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
	size.y	= (geometry.boundingBox.max.y - geometry.boundingBox.min.y)
	size.z	= (geometry.boundingBox.max.z - geometry.boundingBox.min.z)
	
	// create the boundingBox if needed
	if( withBoundingBox ){
		var boundingBox	= new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshBasicMaterial({
			wireframe	: true
		}))
		boundingBox.visible	= false
		boundingBox.scale.copy(size)
		mesh.add(boundingBox)	
	}

	// build the underline
	var underlineH	= size.y / 10;
	var deltaY	= size.y / 20;
	var underline	= new THREE.Mesh(new THREE.CubeGeometry(size.x, underlineH, size.z), new THREE.MeshNormalMaterial())
	underline.position.y	+= -size.y/2 - deltaY - underlineH/2
	this.underline	= underline

	// make it invisible by default
	underline.visible	= false;

	// add it to the mesh
	mesh.add(underline)

	// bind the click
	var eventTarget	= withBoundingBox ? boundingBox : mesh 
	this.eventTarget= eventTarget
	domEvents.bind(eventTarget, 'click', function(event){
		window.open(url, '_blank');
	})

	// bind 'mouseover'
	domEvents.bind(eventTarget, 'mouseover', function(event){
		underline.visible	= true;
		document.body.style.cursor	= 'pointer';
	}, false)
		
	// bind 'mouseout'
	domEvents.bind(eventTarget, 'mouseout', function(event){
		underline.visible	= false;		
		document.body.style.cursor	= 'default';
	}, false)
	
	this.destroy	= function(){
		console.log('not yet implemented')
	}


 var scene, camera, renderer;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 800 );
        camera.position.z = 800;

        geometry = new THREE.BoxGeometry( 300, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0990, wireframe: true} );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

        mesh.rotation.x += 0.009;
        mesh.rotation.y += 0.002;
        mesh.on("click", function(){
        	mesh.rotation.x  *=2;
        });
   
        renderer.render( scene, camera );

    }


}






