var name, email, photoUrl, uid, emailVerified;
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('Usuario entró');
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        uid = user.uid;
        console.log(name,email,photoUrl,emailVerified,uid); 
    }
    else{
        console.log('no entro');
    }
});

const datosdelacuenta = document.querySelector('.datosdelacuenta');

entrarFacebook= () => {
  
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            console.log(user);
            db.collection('juan').doc(uid).set({
                correo: email,
                nombre: name,
                photoURL: photoUrl
        
        
            });
            const html3 = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html3;

            $('#ingresarmodal').modal('hide');
            formaingresar.reset();
            formaingresar.querySelector('.error').innerHTML = '';


        // ...
        }).catch(function(error) {
            console.log(error);
    });
}

