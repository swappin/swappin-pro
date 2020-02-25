<script>
import firebase from 'firebase';


export default {
    name: 'Notification',

    data: () => (
      {
      notificationClasses: null,
      userName: ''
      
      }
      ),
 

created () {
firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.userName = doc.data().name



 firebase.firestore().collection("stores").doc(this.userName).collection('orders').where('status', '==', '1').get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
 
   this.notificationClasses = 'vue-notification success'
        this.$notify({
          group: 'foo',
          title: doc.data().user + 'Fez um pedido de um ' + doc.data().productName,
          text: doc.data().note 
        });
          });
           });
       });
});

   }
}
</script>