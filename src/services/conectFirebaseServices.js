import { firebaseDb } from 'boot/firebase'
import { uid } from 'quasar'
import Vue from 'vue'
//import mixinUtils from '../../mixins/mixin-utils'
const documentDespesas = "despesas_categoria_user";

export default {


  addDespesaUserCategoria (payload) {
    let despesa_id = uid()
    // let userId = uid()
    //let userId = firebaseAuth.currentUser.uid

    let userId = {
      "id": "UID2",
      "nome": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }

    payload.id = despesa_id
    payload.user = userId


    firebaseDb.collection(documentDespesas)
      .add(payload)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
  },

  updateDespesaUserCategoria (payload) {
    console.log(payload)

    firebaseDb.collection(documentDespesas)
      .doc(payload.id)
      .update(payload)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });


  },

  deleteDespesaUserCategoria (despesa_id) {
    // let userId = firebaseAuth.currentUser.uid

    firebaseDb.collection(documentDespesas)
      .doc(despesa_id)
      .delete()
      .then(resposta => {
        console.log(resposta);

      }).catch((error) => {
        console.error("Error removing document: ", error);
      });

  },


  addEventoAgenda (payload) {
    let despesa_id = uid()
    // let userId = uid()
    //let userId = firebaseAuth.currentUser.uid

    let userId = {
      "id": "UID2",
      "nome": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }

    payload.id = despesa_id
    payload.user = userId


    firebaseDb.collection("eventos")
      .add(payload)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
  },
}