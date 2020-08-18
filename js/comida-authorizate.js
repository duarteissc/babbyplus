const menurestaurantes = document.querySelectorAll('.menu-restaurantes');
const menuplatillos = document.querySelectorAll('.menu-platillosid');
const menudetalleid = document.querySelectorAll('.menu-detalleid');
const menucategorias = document.querySelectorAll('.menu-categorias');

const buttondetalleid = document.getElementById('detallebuttonid');
const listadeplatillos = document.getElementById('listadeplatillos');
const listadedetallerestaurante = document.getElementById('listadedetallerestaurante');
const listaderestaurantes = document.getElementById('listaderestaurantes');
const RealizarPedido = document.getElementById('RealizarPedido');
const listadecategoriasrestaurantes = document.getElementById('listadecategoriasrestaurantes');

const ingresarmodal = document.getElementById('ingresarModal');




auth.onAuthStateChanged(user =>{
  if(user){
    console.log('Usuario entró');
    email = user.email;
    uid = user.uid;
    console.log(name,email,photoUrl,emailVerified,uid); 
}
else{
    console.log('no entrox2');
}

});
window.onload = obtenerrestaurantesInicio;

function backIndex() {
  location.href = "https://www.babbyplus.com";
 };

function backlistRestaurantes() {
  let html2 = ''
  const htmlbuttondetalle = `
  <button type="button" id="buttonid2" onclick="backcategoriasRestaurantes()"><i class="fa fa-arrow-left" aria-hidden="true" style="color: #FFFFFF;"></i></button>
  <button id="buttonid" onclick="obtenerrestaurantesInicio()"><h5>Inicio</H5></button>
      <button id="buttonid" onclick="backcategoriasRestaurantes()"><div><h5>Categorias</H5></button>`;
html2 +=  htmlbuttondetalle;
buttondetalleid .innerHTML = html2;

    menurestaurantes.forEach( item => item.style.display = 'block');
    menuplatillos.forEach( item => item.style.display = 'none');
    menudetalleid.forEach(item => item.style.display ='none');
    
 };

  function backlistMenu() {
    menurestaurantes.forEach( item => item.style.display = 'none');
    menuplatillos.forEach( item => item.style.display = 'block');
    menudetalleid.forEach(item => item.style.display ='none');
    
 };

  function copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
 };

 function iniciaMapa(){

  var coordenadas = {
  lat: 20.917259,
  lng: -101.742785
}
var map = new google.maps.Map(document.getElementById("map"),{center: { lat: coordenadas.lat,lng: coordenadas.lng},zoom:20});

var informacion = new google.maps.InfoWindow;
  
  //function success(pos) {
    //  var pos = {
      //    lat: position.coords.latitude, 
       //   lng: position.coords.longitude
      //};
      ///Actuakes del navegador
      //informacion.setPosition(pos);
      ///Estaticas
      informacion.setPosition(coordenadas);
      informacion.setContent(" <img src='imagenes/iconApp/foot2.svg' alt='Error al cargar la ubicación' width='20' height='20'>");
      informacion.open(map);
      map.setCenter(coordenadas);
  //};
  //function error(err){
    //alert('Habilite los permisos para conocer la ubicación');
  //};
  //navigator.geolocation.getCurrentPosition(success, error);
 }


//Funciones Firebase Datos !

//Funcion Obtener Menú Del Restaurante
function RestauranteId(rId) {
    const iddetallerestaurante = rId;
    let html2 = ''
    const htmlbuttondetalle = `
    <button type="button" id="buttonid2" onclick="backlistRestaurantes()"><i class="fa fa-arrow-left" aria-hidden="true" style="color: #FFFFFF;"></i></button>
    <button id="buttonid" onclick="backlistMenu()"><h5>Menú</h5></button>  
    <button id="buttonid" onclick="backlistDetalle('${iddetallerestaurante}');">
    <h5>Detalle</h5>
  </button>`;
  html2 +=  htmlbuttondetalle;
  buttondetalleid .innerHTML = html2;


    db.collection("Restaurantes").doc(rId).collection("Platillos").get()
.then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
        const menuplatillo = doc.data();
        const menucolumna = `
       
        <div class=" col-sm-3 col-6" style="padding-top: 20px;">
        <div class="card promoting-card">
        <div class="d-flex flex-row">
          <div>      
            <h4 class="card-title font-weight-bold mb-2"><b>${menuplatillo.nombre}</b></h4>
            
          </div> 
        </div>
        <p style="color: red; 
        margin-bottom: 0px; "><b>${menuplatillo.estatus}</b></p> 
        <!-- Card image -->
        <div class="view overlay">
          <img class="card-img-top rounded-0" src="./imagenes/restaurantes/1001/imgplatillos/${menuplatillo.img}" alt="Card image cap">
          <a href="#!">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>
        <!-- Card content -->
        <div class="card-body">
            <!-- Text -->
            <p class="card-text" >${menuplatillo.descripcion}</p>
            <p class="card-text"><strong>Ingredientes: </strong>${menuplatillo.ingredientes}</p>
            <!-- Button -->

           
          </div>
          <div class="btn" style="text-align:center;color: #A3A3A3; letter-spacing: 0.1em; background-color:#EEEEEE"><b>Precio: ${menuplatillo.precio}$</b></div>
        </div>
      </div>
      </div>
        `;
        html += menucolumna;
        });
        listadeplatillos.innerHTML = html;
        menurestaurantes.forEach( item => item.style.display = 'none');
        menudetalleid.forEach(item => item.style.display ='none');
        menuplatillos.forEach( item => item.style.display = 'block');

    });
 

};
//Funcion Obtener Detalle  del Restaurante
function backlistDetalle(detalleidrest){
    var docRef = db.collection("Restaurantes").doc(detalleidrest);
    let html = ''
docRef.get().then(function(doc) {
    if (doc.exists) {
        const detallemenu = doc.data();

        var Horario;
        var Dia = "";
        var n = new Date();
       var d = n.getDay();


        if(d==0) Horario = detallemenu.Domingo
        if(d==1) Horario = detallemenu.Lunes
        if(d==2) Horario = detallemenu.Martes
        if(d==3) Horario = detallemenu.Miercoles
        if(d==4) Horario = detallemenu.Jueves
        if(d==5) Horario = detallemenu.Viernes
        if(d==6) Horario = detallemenu.Sabado
       
  
        let nono2 =  Horario

        const detallecolumna = `
        
        
        <div class="container">
        
        
        <div class="row">
          <div class="col-sm-1">
          </div>
                  
          <div class="col-sm-10">
          <div class="container" style="    max-width: 100%;
          background: #fff;
          box-shadow: 0 6px 10px 0 #e8e7e7;
          border-radius: 22px;
          overflow-x: hidden;
          margin-top: 30px;">
          <div class="row">
          <div class="col-sm-5">
          <img src="./imagenes/restaurantesPortadas/${detallemenu.imagenPortada}"  style="float:left; margin-top: 10px" class="img-thumbnail" alt="Cinque Terre" width="100%" height="100%"> 
          </div>
          <div class="col-sm-7">
          <h2 ><b > ${detallemenu.nombre} <font size="6"><i class="fa fa-star"  style="float: center; color: #FFDD21;">${detallemenu.recomendacion}</i> </font></b></h2>
          <div><b >${detallemenu.nombreC} </b><a id="pedidosId">${detallemenu.pedidosId}</a> <i class="fa fa-exclamation-circle" color></i></div> 
          <div><b >Dirección: </b>${detallemenu.direccion}</div>
          <div><b >Entrega Domicilio: </b><b style=" color: red;" >$ ${detallemenu.entregacosto}.00</b></div>
          <div><b >Horario: </b> <b style=" color: red;" >${nono2}</b> </div>
          <div><b >Tiempo de proceso: </b>${detallemenu.tiempo}</div>
          </div>
          </div>
          </div>
          </div>
          <div class="col-sm-1">
          </div>
          <br>
          </div>
        <br>

        <div class="row">
        <div class="col-sm-1">
        </div>
        <div class="col-sm-10 ">
        <button onclick="Ordenar(${detallemenu.numero1})" data-toggle="modal" data-target="#micuentaModal" class="btn " style="background-image: linear-gradient(130deg,#ff9259 0,#ff2426 70%);
         border-radius: 8px;font-family: Poppins-Regular,Helvetica,Arial,sans-serif;
        color: #fff;padding: 8.5px 14px;text-align: center;
        cursor: pointer; width: 100%;height: 50px; margin-bottom: 20px;" id="idtelefono">Llamar</button>
        </div>
        <div class="col-sm-1">
        </div>
        </div>
        </div>
`;



        html += detallecolumna;
        listadedetallerestaurante.innerHTML = html;
        iniciaMapa();
        menudetalleid.forEach(item => item.style.display ='block');
        menurestaurantes.forEach( item => item.style.display = 'none');
        menuplatillos.forEach( item => item.style.display = 'none');
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        
};



function Ordenar(numero){
  auth.onAuthStateChanged(user =>{
   if(user){
    let idtelefono = document.getElementById('idtelefono');
   idtelefono.innerHTML = `${numero}`;
   }
   else{
     $('#ingresarModal').modal('show')
   }
 });
 }

 //Obtener Categorias Restaurantes
function backcategoriasRestaurantes(){
  let html = ''
let barrranavegadora = `
<button type="button" id="buttonid2" onclick="backIndex()"><i class="fa fa-arrow-left" aria-hidden="true" style="color: #FFFFFF;"></i></button>
      <button id="buttonid" onclick="obtenerrestaurantesInicio()"><h5>Inicio</H5></button>
      <button id="buttonid" onclick="backcategoriasRestaurantes()"><div><h5>Categorias</H5></button> `;
html +=  barrranavegadora;
buttondetalleid.innerHTML =  html;

  db.collection("CategoriasRestaurante").get()
  .then(querySnapshot => {
      let html = '' 
      querySnapshot.forEach(doc => {
      const categoria = doc.data();
      const columna = `       
      <div class="col-sm-3 col-6" style="background-color: #FFF; margin-bottom: 15px;
     ">
      <p>${categoria.categoria}</p>
      <img src="./imagenes/restaurantescategorias/${categoria.imagen}" class="img-responsive" style="width:100%" alt="Image" onclick="BuscarrestaurantesporCategoria('${categoria.categoria}')";>
    </div>
      `;
      html +=  columna;   
  });
  listadecategoriasrestaurantes.innerHTML =  html ;
  menucategorias.forEach( item => item.style.display = 'block');
  menurestaurantes.forEach( item => item.style.display = 'none');
  menuplatillos.forEach( item => item.style.display = 'none');
  menudetalleid.forEach(item => item.style.display ='none');

});
 

};



function BuscarrestaurantesporCategoria(categoria) {

let html = ''
let barrranavegadora = `
<button type="button" id="buttonid2" onclick="backcategoriasRestaurantes()"><i class="fa fa-arrow-left" aria-hidden="true" style="color: #FFFFFF;"></i></button>
      <button id="buttonid" onclick="obtenerrestaurantesInicio()"><h5>Inicio</H5></button>
      <button id="buttonid" onclick="backcategoriasRestaurantes()"><div><h5>Categorias</H5></button> `;
html +=  barrranavegadora;
buttondetalleid.innerHTML =  html;
  db.collection("Restaurantes").where("nombreC", "==", categoria)
  .get()
.then(querySnapshot => {
  let html = ''
  querySnapshot.forEach(doc => {
        var n = new Date();
        var d = n.getDay();
        const platillo = doc.data();

        var Horario;
        if(d==0) Horario = platillo.Domingo
        if(d==1) Horario = platillo.Lunes
        if(d==2) Horario = platillo.Martes
        if(d==3) Horario = platillo.Miercoles
        if(d==4) Horario = platillo.Jueves
        if(d==5) Horario = platillo.Viernes
        if(d==6) Horario = platillo.Sabado
        let HorariodelDia = Horario

        const columna = `       
            <div class="col-md-4">
            <div class="container style="    max-width: 100%;
            background: #fff;
            box-shadow: 0 6px 10px 0 #e8e7e7;
            border-radius: 22px;
            overflow-x: hidden;
            margin-top: 30px;>
              <div id="poderoza" >
                <div class="wrapper btn" href="#" onclick="RestauranteId('${doc.id}')";>   
                  <div class="card radius shadowDepth1">
                    <div class="card__image">
                      <img src="./imagenes/restaurantesPortadas/${platillo.imagenPortada}" alt="image">
                    </div>
                    <div class="card__content card__padding">         
                    <div class="card__action"><h4><div href="#"><b>${platillo.nombre}</b></div></h4></div>
                    </div>   
                    <div class="container" style="text-align:center">
                    <div class="card__meta"> 
                    <a href="#" style="float: left; color: #AFAFAF; font-family:Times;">${platillo.nombreC}</a>
                    <a style="display:inline-block; color: #AFAFAF; font-family:Times;"><font size="4">${platillo.tiempo}</font></a>
                    <i class="fa fa-star"  style="float: right; color: #AFAFAF;"><font size="3">${platillo.recomendacion}</font></i> 
                    </div>
                    </div>
              
                  </div>
                  <div class="container btn" style="text-align:center; background: #FFF;  box-shadow: 0 6px 10px 0 #e8e7e7;
                  border-radius: 22px;
                  overflow-x: hidden;
                  margin-top: 6px; Color: #A8A8A8;">
                  <b style="display:inline-block;  text-transform: uppercase;
                  font-size: 24px;
                  font-size: 0.875rem;
                  font-family: "proxima-nova-soft", "Proxima Nova Soft", Helvetica, Arial, sans-serif; Color: #A8A8A8;">${HorariodelDia}</b>
                  </div>  
                  </div>
                </div>
                </div>
              </div>
            `;
        html += columna;
      });
      listaderestaurantes.innerHTML = html;
      menurestaurantes.forEach( item => item.style.display = 'block');
      menuplatillos.forEach( item => item.style.display = 'none');
      menudetalleid.forEach(item => item.style.display ='none');
      menucategorias.forEach(item => item.style.display ='none');

  });


};

function obtenerrestaurantesInicio() {
  db.collection("Restaurantes").where("menuInicio", "==", "si")
  .get()
.then(querySnapshot => {
  let html = ''
  querySnapshot.forEach(doc => {
        var n = new Date();
        var d = n.getDay();
        const platillo = doc.data();

        var Horario;
        if(d==0) Horario = platillo.Domingo
        if(d==1) Horario = platillo.Lunes
        if(d==2) Horario = platillo.Martes
        if(d==3) Horario = platillo.Miercoles
        if(d==4) Horario = platillo.Jueves
        if(d==5) Horario = platillo.Viernes
        if(d==6) Horario = platillo.Sabado
        let HorariodelDia = Horario

        const columna = `       
        <div class="col-md-4">
        <div class="container style="    max-width: 100%;
        background: #fff;
        box-shadow: 0 6px 10px 0 #e8e7e7;
        border-radius: 22px;
        overflow-x: hidden;
        margin-top: 30px;>
          <div id="poderoza" >
            <div class="wrapper btn" href="#" onclick="RestauranteId('${doc.id}')";>   
              <div class="card radius shadowDepth1">
                <div class="card__image">
                  <img src="./imagenes/restaurantesPortadas/${platillo.imagenPortada}" alt="image">
                </div>
                <div class="card__content card__padding">         
                <div class="card__action"><h4><div href="#"><b>${platillo.nombre}</b></div></h4></div>
                </div>   
                <div class="container" style="text-align:center">
                <div class="card__meta"> 
                <a href="#" style="float: left; color: #AFAFAF; font-family:Times;">${platillo.nombreC}</a>
                <a style="display:inline-block; color: #AFAFAF; font-family:Times;"><font size="4">${platillo.tiempo}</font></a>
                <i class="fa fa-star"  style="float: right; color: #AFAFAF;"><font size="3">${platillo.recomendacion}</font></i> 
                </div>
                </div>
          
              </div>
              <div class="container btn" style="text-align:center; background: #FFF;  box-shadow: 0 6px 10px 0 #e8e7e7;
              border-radius: 22px;
              overflow-x: hidden;
              margin-top: 6px; Color: #A8A8A8;">
              <b style="display:inline-block;  text-transform: uppercase;
              font-size: 24px;
              font-size: 0.875rem;
              font-family: "proxima-nova-soft", "Proxima Nova Soft", Helvetica, Arial, sans-serif; Color: #A8A8A8;">${HorariodelDia}</b>
              </div>  
              </div>
            </div>
            </div>
          </div>
            `;
        html += columna;
      });
      listaderestaurantes.innerHTML = html;
      menurestaurantes.forEach( item => item.style.display = 'block');
      menuplatillos.forEach( item => item.style.display = 'none');
      menudetalleid.forEach(item => item.style.display ='none');
      menucategorias.forEach(item => item.style.display ='none');

  }
  );


};