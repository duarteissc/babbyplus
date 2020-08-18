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
        console.log('no entrox2 JS');
    }
});


function entrarFacebook() {
  
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            console.log(user);
            db.collection('Usuarios').doc(uid).set({
                correo: email,
                nombre: name,
                photoURL: photoUrl
            });

            $('#ingresarmodal').modal('hide');
            console.log("EXITO");
        // ...
        }).catch(function(error) {
            console.log(error);
    });
}

