THREE.Bg=function(manager){this.manager=void 0!==manager?manager:THREE.DefaultLoadingManager},THREE.Bg.prototype={constructor:THREE.Bg,load:function(url,mtlurl,onLoad,onProgress,onError){var scope=this,bg=new THREE.MTLLoader(url.substr(0,url.lastIndexOf("/")+1));bg.crossOrigin=scope.crossOrigin,bg.load(mtlurl,function(materials){var materialsCreator=materials;materialsCreator.preload();var loader=new THREE.XHRLoader(scope.manager);loader.setCrossOrigin(scope.crossOrigin),loader.load(url,function(text){var object=scope.parse(text);object.traverse(function(object){if(object instanceof THREE.Mesh&&object.material.name){var material=materialsCreator.create(object.material.name);material&&(object.material=material)}}),onLoad(scope,object)},onProgress,onError)},onProgress,onError)},parse:function(data,mtllibCallback){function vector(x,y,z){return new THREE.Vector3(x,y,z)}function uv(u,v){return new THREE.Vector2(u,v)}function face3(a,b,c,normals){return new THREE.Face3(a,b,c,normals)}function meshN(meshName,materialName){vertices.length>0&&(geometry.vertices=vertices,geometry.mergeVertices(),geometry.computeFaceNormals(),geometry.computeBoundingSphere(),object.add(mesh),geometry=new THREE.Geometry,mesh=new THREE.Mesh(geometry,material)),void 0!==meshName&&(mesh.name=meshName),void 0!==materialName&&(material=new THREE.MeshLambertMaterial,material.name=materialName,mesh.material=material)}function add_face(a,b,c,normals_inds){void 0===normals_inds?geometry.faces.push(face3(parseInt(a)-(face_offset+1),parseInt(b)-(face_offset+1),parseInt(c)-(face_offset+1))):geometry.faces.push(face3(parseInt(a)-(face_offset+1),parseInt(b)-(face_offset+1),parseInt(c)-(face_offset+1),[normals[parseInt(normals_inds[0])-1].clone(),normals[parseInt(normals_inds[1])-1].clone(),normals[parseInt(normals_inds[2])-1].clone()]))}function add_uvs(a,b,c){geometry.faceVertexUvs[0].push([uvs[parseInt(a)-1].clone(),uvs[parseInt(b)-1].clone(),uvs[parseInt(c)-1].clone()])}function handle_face_line(faces,uvs,normals_inds){void 0===faces[3]?(add_face(faces[0],faces[1],faces[2],normals_inds),void 0!==uvs&&uvs.length>0&&add_uvs(uvs[0],uvs[1],uvs[2])):(void 0!==normals_inds&&normals_inds.length>0?(add_face(faces[0],faces[1],faces[3],[normals_inds[0],normals_inds[1],normals_inds[3]]),add_face(faces[1],faces[2],faces[3],[normals_inds[1],normals_inds[2],normals_inds[3]])):(add_face(faces[0],faces[1],faces[3]),add_face(faces[1],faces[2],faces[3])),void 0!==uvs&&uvs.length>0&&(add_uvs(uvs[0],uvs[1],uvs[3]),add_uvs(uvs[1],uvs[2],uvs[3])))}for(var face_offset=0,group=new THREE.Group,object=group,geometry=new THREE.Geometry,material=new THREE.MeshLambertMaterial,mesh=new THREE.Mesh(geometry,material),vertices=[],normals=[],uvs=[],vertex_pattern=/v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,normal_pattern=/vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,uv_pattern=/vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,face_pattern1=/f( +\d+)( +\d+)( +\d+)( +\d+)?/,face_pattern2=/f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/,face_pattern3=/f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/,face_pattern4=/f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/,lines=data.split("\n"),i=0;i<lines.length;i++){var line=lines[i];line=line.trim();var result;if(0!==line.length&&"#"!==line.charAt(0))if(null!==(result=vertex_pattern.exec(line)))vertices.push(vector(parseFloat(result[1]),parseFloat(result[2]),parseFloat(result[3])));else if(null!==(result=normal_pattern.exec(line)))normals.push(vector(parseFloat(result[1]),parseFloat(result[2]),parseFloat(result[3])));else if(null!==(result=uv_pattern.exec(line)))uvs.push(uv(parseFloat(result[1]),parseFloat(result[2])));else if(null!==(result=face_pattern1.exec(line)))handle_face_line([result[1],result[2],result[3],result[4]]);else if(null!==(result=face_pattern2.exec(line)))handle_face_line([result[2],result[5],result[8],result[11]],[result[3],result[6],result[9],result[12]]);else if(null!==(result=face_pattern3.exec(line)))handle_face_line([result[2],result[6],result[10],result[14]],[result[3],result[7],result[11],result[15]],[result[4],result[8],result[12],result[16]]);else if(null!==(result=face_pattern4.exec(line)))handle_face_line([result[2],result[5],result[8],result[11]],[],[result[3],result[6],result[9],result[12]]);else if(/^o /.test(line))meshN(),face_offset+=vertices.length,vertices=[],object=new THREE.Object3D,object.name=line.substring(2).trim(),group.add(object);else if(/^g /.test(line))meshN(line.substring(2).trim(),void 0);else if(/^usemtl /.test(line))meshN(void 0,line.substring(7).trim());else if(/^mtllib /.test(line)){if(mtllibCallback){var mtlfile=line.substring(7);mtlfile=mtlfile.trim(),mtllibCallback(mtlfile)}}else/^s /.test(line)||console.log("THREE.Bg: Unhandled line "+line)}return meshN(void 0,void 0),group}},THREE.EventDispatcher.prototype.apply(THREE.Bg.prototype);