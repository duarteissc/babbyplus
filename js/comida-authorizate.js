const menurestaurantes = document.querySelectorAll('.menu-restaurantes');
const menuplatillos = document.querySelectorAll('.menu-platillosid');
const menudetalleid = document.querySelectorAll('.menu-detalleid');
const buttondetalleid = document.getElementById('detallebuttonid');
const listadeplatillos = document.getElementById('listadeplatillos');
const listadedetallerestaurante = document.getElementById('listadedetallerestaurante');
const listaderestaurantes = document.getElementById('listaderestaurantes');
const RealizarPedido = document.getElementById('RealizarPedido');

const ingresarmodal = document.getElementById('ingresarModal');

db.collection('Restaurantes').onSnapshot(snapshot =>{
obtieneRestaurantes(snapshot.docs);}, err => { alert('Error de sistema'); });


auth.onAuthStateChanged(user =>{
  if(user){
    console.log('Usuario entró');
    email = user.email;
    uid = user.uid;
    console.log(name,email,photoUrl,emailVerified,uid); 
}
else{
    console.log('no entrox2xe3');
}

});


function backIndex() {
  location.href = "https://www.babbyplus.com";
 };

function backlistRestaurantes() {
  let html2 = ''
  const htmlbuttondetalle = `
  <button type="button" id="buttonid2" onclick="backIndex()"><i class="fa fa-arrow-left" aria-hidden="true"  style="color: #54E472;"></i></button>
  <button id="buttonid" onclick="backlistRestaurantes()"><div><H5>RESTAURANTES</H5></button>  
  <button id="buttonid">
  <h5>TOP</h5>
</button>`;
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

//Funcion Obtener Diferentes tipos de restaurantes
const obtieneRestaurantes = (data) =>{
  if (data.length){
      let html = '';
      data.forEach(doc =>{
        
          var dia = "Cerrado Temporalmente";
          var n = new Date();
          var d = n.getDay();

          let nono = dia;
          const platillo = doc.data();
          var Horario;

          if(d==0) Horario = platillo.Domingo
          if(d==1) Horario = platillo.Lunes
          if(d==2) Horario = platillo.Martes
          if(d==3) Horario = platillo.Miercoles
          if(d==4) Horario = platillo.Jueves
          if(d==5) Horario = platillo.Viernes
          if(d==6) Horario = platillo.Sabado
         
    
          let nono2 =  Horario
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
                font-family: "proxima-nova-soft", "Proxima Nova Soft", Helvetica, Arial, sans-serif; Color: #A8A8A8;">${nono2}</b>
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
  }
  else{listaderestaurantes.innerHTML='<p class="text-center"> No funciono</p>'}

};


